import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface HabitCardProps {
  name: string;
  bg: string;
  ac: string;
}

const HabitCard = ({ name, bg, ac }: HabitCardProps) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bg }]}>
      <Text style={styles.text}>{name}</Text>
      <View style={[styles.editButton, { backgroundColor: ac }]}>
        <Ionicons name="ellipsis-horizontal" size={16} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default HabitCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    minWidth: '48%',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
