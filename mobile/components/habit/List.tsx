import { Colors } from '@/constants/Colors';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../habit/Card';

const testData = [
  {
    description: 'Yoga',
    deadline: { duration: '30', time: '07:30' },
    frequency: 'Mo, Mi, Fr',
    done: false,
    bgcolor: Colors.habit.purple,
  },
  {
    description: 'Lesen',
    deadline: { duration: '15', time: '20:00' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.yellow,
  },
  {
    description: 'Fitness',
    deadline: { duration: '45', time: '06:00' },
    frequency: 'Mo, Mi, Fr',
    done: false,
    bgcolor: Colors.habit.green,
  },
  {
    description: 'Wasser trinken',
    deadline: { duration: '1', time: '7:30' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.blue,
  },
  {
    description: 'Backen',
    deadline: { duration: '60', time: '15:00' },
    frequency: 'Sa, So',
    done: false,
    bgcolor: Colors.habit.coral,
  },
  {
    description: 'Meditation',
    deadline: { duration: '10', time: '22:00' },
    frequency: 'Täglich',
    done: true,
    bgcolor: Colors.habit.turquoise,
  },
  {
    description: 'Schwimmen',
    deadline: { duration: '40', time: '17:00' },
    frequency: 'Mi, Fr',
    done: false,
    bgcolor: Colors.habit.red,
  }
];

export default function List() {
  return (
    <FlatList
      style={{ flex: 1, paddingLeft:10, paddingRight:10, width: '100%' }}
      data={testData}
      renderItem={({ item }) => (
        <Card
          description={item.description}
          deadline={item.deadline}
          frequency={item.frequency}
          done={item.done}
          bgcolor={item.bgcolor}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    elevation: 5,
  },
});