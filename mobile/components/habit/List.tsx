import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
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

export default function List() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = ['Heute', 'Woche', 'Alle'];

  const filteredData =
    selectedIndex === 0
      ? testData
          .filter(item => item.frequency === 'Täglich')
          .sort((a, b) => {
            const timeA = a.deadline.time.split(':').map(Number);
            const timeB = b.deadline.time.split(':').map(Number);
            return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
          })
      : selectedIndex === 1
      ? testData
          .filter(item => item.frequency !== 'Täglich')
          .sort((a, b) => {
            const timeA = a.deadline.time.split(':').map(Number);
            const timeB = b.deadline.time.split(':').map(Number);
            return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
          })
      : testData.sort((a, b) => {
          const timeA = a.deadline.time.split(':').map(Number);
          const timeB = b.deadline.time.split(':').map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });
  return (
    <View style={{flex:1}}>
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
    fontWeight:"600"
  },
  optionTextSelected: {
    color: 'white',
  },
});
