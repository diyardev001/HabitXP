import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Card from '../habit/Card';
import {getHabits} from "@/services/habitService";
import {Habit} from "@/types/habit";

const isHabitToday = (frequency: string) => {
    if (frequency === 'DAILY') return true;

    const daysMap: { [key: string]: number } = {
        Mo: 1,
        Di: 2,
        Mi: 3,
        Do: 4,
        Fr: 5,
        Sa: 6,
        So: 0,
    };

    const today = new Date().getDay();
    const habitDays = frequency.split(', ');

    return habitDays.some(day => daysMap[day] === today);
};

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export default function List() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const options = ['Heute', 'Woche', 'Alle'];

    useEffect(() => {
        getHabits()
            .then(setHabits)
            .catch((error) => {
                console.error("Fehler beim Laden der Habits:", error);
            });
    }, []);

    const filteredData = useMemo(() => {
        let filtered = [...habits];

        filtered.sort((a, b) => {
            const aTime = a.deadline?.time || "00:00";
            const bTime = b.deadline?.time || "00:00";
            return timeToMinutes(aTime) - timeToMinutes(bTime);
        });

        switch (selectedIndex) {
            case 0:
                return filtered.filter(
                    item => item.frequency === 'DAILY' || isHabitToday(item.frequency),
                );
            case 1:
                return filtered.filter(item => item.frequency !== 'DAILY');
            default:
                return filtered;
        }
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
                renderItem={({item}) => (
                    <Card
                        title={item.title}
                        deadline={{
                            time: item.deadline?.time ?? "00:00",
                            duration: item.deadline?.duration ?? "0",
                        }} // TODO
                        frequency={item.frequency}
                        done={item.isCompleted}
                        bgcolor={item.color}
                        accent={item.accent ?? "#999"} // TODO
                    />
                )}
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
