import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Card from '../habit/Card';
import {getTasks} from "@/services/taskService";
import {Task} from "@/types/task";
import useTheme from "@/hooks/useTheme";

export default function List() {
    const colors = useTheme();
    const [habits, setHabits] = useState<Task[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const options = ['Heute', 'Woche', 'Monat', 'Alle'];
    let hasShownCompletedDivider = false;

    const frequencyFilters: { [key: number]: ((task: Task) => boolean) | undefined } = {
        0: (task: Task) => task.frequency === 'DAILY',
        1: (task: Task) => task.frequency === 'WEEKLY',
        2: (task: Task) => task.frequency === 'MONTHLY',
        3: undefined,
    };

    useEffect(() => {
        getTasks()
            .then((data) => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setHabits(data);
            })
            .catch((error) => {
                console.error("Fehler beim Laden der Habits:", error);
            });
    }, []);

    const filteredData = useMemo(() => {
        const filterByFrequency = frequencyFilters[selectedIndex];
        const filtered = filterByFrequency ? habits.filter(filterByFrequency) : habits;

        return [...filtered].sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            const titleComparison = a.title.localeCompare(b.title);
            if (titleComparison !== 0) {
                return titleComparison;
            }

            const getMinutes = (duration: string) => {
                const match = duration.match(/^(\d+)(min|h)$/);
                if (!match) return 0;
                const value = parseInt(match[1], 10);
                return match[2] === 'h' ? value * 60 : value;
            };
            return getMinutes(a.duration) - getMinutes(b.duration);
        });
    }, [selectedIndex, habits]);

    const handleHabitComplete = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHabits((prev) =>
            prev.map((h) => (h.id === id ? {...h, completed: true} : h))
        );
    };

    return (
        <View style={{flex: 1}}>
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {options.map((label, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionContainer,
                                selectedIndex === index && {backgroundColor: colors.primary},
                            ]}
                            onPress={() => setSelectedIndex(index)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selectedIndex === index && styles.optionTextSelected,
                                ]}
                            >
                                {label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => {
                    const match = item.duration?.match(/^(\d+)(min|h)$/);
                    const durationValue = match?.[1] || "0";
                    const durationUnit = match?.[2] === "h" ? "HOURS" : "MINUTES";

                    let showCompletedDivider = false;
                    if (item.completed && !hasShownCompletedDivider) {
                        showCompletedDivider = true;
                        hasShownCompletedDivider = true;
                    }

                    return (
                        <>
                            {showCompletedDivider && (
                                <View style={styles.dividerContainer}>
                                    <View style={styles.line}/>
                                    <Text style={styles.dividerText}>Abgeschlossen</Text>
                                    <View style={styles.line}/>
                                </View>
                            )}

                            <Card
                                id={item.id}
                                title={item.title}
                                durationValue={durationValue}
                                durationUnit={durationUnit}
                                times={item.times}
                                frequency={item.frequency}
                                done={item.completed}
                                colorKey={item.colorKey}
                                onComplete={() => handleHabitComplete(item.id)}
                            />
                        </>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        paddingBottom: 16
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 24,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    optionContainerSelected: {
        backgroundColor: '#ffa29c',
    },
    optionText: {
        color: '#909396',
        fontSize: 16,
        fontWeight: '600',
    },
    optionTextSelected: {
        color: 'white',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        marginHorizontal: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#909396',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

});
