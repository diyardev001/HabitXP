import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EvilIcons } from '@expo/vector-icons';

interface CardProps {
  description: string;
  deadline: {
    duration: string;
    time: string;
  };
  frequency: string;
  done: boolean;
  bgcolor: string;
}

export default function Card({
  description,
  deadline,
  frequency,
  done,
  bgcolor,
}: CardProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: 20,
      borderRadius: 6,
      elevation: 5,
      marginBottom: 10,
      width: '100%',
      backgroundColor: bgcolor,
    },
    label: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.label}>{deadline.duration} MIN</Text>
          {/* <EditIcon */}
          <EvilIcons
            name="check"
            size={24}
            color={done ? 'white' : 'white'}
            style={{ marginRight: 2 }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {/* <HabitIcon */}
          <EvilIcons
            name="check"
            size={24}
            color={done ? 'white' : 'white'}
            style={{ marginRight: 2 }}
          />
          <Text style={styles.label}>{description}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.label}>
          {frequency}: {deadline.time}
        </Text>
        {/* <CheckIcon?? */}
        <EvilIcons
          name="check"
          size={24}
          color={done ? 'white' : 'white'}
          style={{ marginRight: 2 }}
        />
      </View>
    </View>
  );
}
