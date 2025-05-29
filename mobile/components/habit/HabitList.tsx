import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Card from '../habit/Card';
import {getTasks} from "@/services/taskService";
import {Task} from "@/types/task";

const durationToMinutes = (duration: string): number => {
    const match = duration?.match(/^(\d+)(min|h)$/);
    const value = parseInt(match?.[1] ?? "0");
    const unit = match?.[2];

    if (isNaN(value)) return 0;
    return unit === "h" ? value * 60 : value;
};

const frequencyFilters: { [key: number]: (task: Task) => boolean } = {
    0: (task: Task) => task.frequency === 'DAILY',
    1: (task: Task) => task.frequency === 'WEEKLY',
    2: (task: Task) => task.frequency === 'MONTHLY' || task.frequency === 'NONE',
};

export default function List() {
    const [habits, setHabits] = useState<Task[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const options = ['Heute', 'Woche', 'Alle']; // TODO add Monat

    useEffect(() => {
        getTasks()
            .then(setHabits)
            .catch((error) => {
                console.error("Fehler beim Laden der Habits:", error);
            });
    }, []);

    const filteredData = useMemo(() => {
        const sortedTasks = [...habits].sort(
            (a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration)
        );

        const filterByFrequency = frequencyFilters[selectedIndex];
        return filterByFrequency ? sortedTasks.filter(filterByFrequency) : sortedTasks;
    }, [selectedIndex, habits]);

    return (
        <View style={{flex: 1}}>
            <View style={styles.filterContainer}>
                {options.map((label, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionContainer,
                            selectedIndex === index && styles.optionContainerSelected,
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
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    const match = item.duration?.match(/^(\d+)(min|h)$/);
                    const durationValue = match?.[1] || "0";
                    const durationUnit = match?.[2] === "h" ? "HOURS" : "MINUTES";

                    return (
                        <Card
                            title={item.title}
                            durationValue={durationValue}
                            durationUnit={durationUnit}
                            times={item.times}
                            frequency={item.frequency}
                            done={item.isCompleted}
                            bgcolor={item.color}
                            accent={item.accent ?? "#999"}
                        />
                    );
                }}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: '30%',
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
});
