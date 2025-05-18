import { Colors } from '@/constants/Colors';
import React, { useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Card from '../habit/Card';

const testData = [
  {
    description: 'Yoga',
    deadline: { duration: '30', time: '07:30' },
    frequency: 'Mo, Mi, Fr',
    done: false,
    bgcolor: Colors.habit.blue.bg,
    accent: Colors.habit.blue.ac,
  },
  {
    description: 'Lesen',
    deadline: { duration: '15', time: '20:00' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.yellow.bg,
    accent: Colors.habit.yellow.ac,
  },
  {
    description: 'Fitness',
    deadline: { duration: '45', time: '06:00' },
    frequency: 'Mo, Mi, Fr',
    done: false,
    bgcolor: Colors.habit.green.bg,
    accent: Colors.habit.green.ac,
  },
  {
    description: 'Wasser trinken',
    deadline: { duration: '1', time: '7:30' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.cyan.bg,
    accent: Colors.habit.cyan.ac,
  },
  {
    description: 'Wasser trinken',
    deadline: { duration: '1', time: '11:30' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.cyan.bg,
    accent: Colors.habit.cyan.ac,
  },
  {
    description: 'Wasser trinken',
    deadline: { duration: '1', time: '17:30' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.cyan.bg,
    accent: Colors.habit.cyan.ac,
  },
  {
    description: 'Wasser trinken',
    deadline: { duration: '1', time: '20:30' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.cyan.bg,
    accent: Colors.habit.cyan.ac,
  },
  {
    description: 'Backen',
    deadline: { duration: '60', time: '15:00' },
    frequency: 'Sa, So',
    done: false,
    bgcolor: Colors.habit.coral.bg,
    accent: Colors.habit.coral.ac,
  },
  {
    description: 'Meditation',
    deadline: { duration: '10', time: '22:00' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.pink.bg,
    accent: Colors.habit.pink.ac,
  },
  {
    description: 'Schwimmen',
    deadline: { duration: '40', time: '17:00' },
    frequency: 'Mi, Fr',
    done: false,
    bgcolor: Colors.habit.indigo.bg,
    accent: Colors.habit.indigo.ac,
  },
];

const isHabitToday = (frequency: string) => {
  if (frequency === 'Täglich') return true;

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ['Heute', 'Woche', 'Alle'];

  const filteredData = useMemo(() => {
    let filtered = [...testData];

    filtered.sort((a, b) => {
      return timeToMinutes(a.deadline.time) - timeToMinutes(b.deadline.time);
    });

    switch (selectedIndex) {
      case 0:
        return filtered.filter(
          item => item.frequency === 'Täglich' || isHabitToday(item.frequency),
        );
      case 1:
        return filtered.filter(item => item.frequency !== 'Täglich');
      default:
        return filtered;
    }
  }, [selectedIndex]);

  return (
    <View style={{ flex: 1 }}>
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
        renderItem={({ item }) => (
          <Card
            description={item.description}
            deadline={item.deadline}
            frequency={item.frequency}
            done={item.done}
            bgcolor={item.bgcolor}
            accent={item.accent}
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
