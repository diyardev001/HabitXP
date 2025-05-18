import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface HabitCardProps {
  name: string;
  bg: string;
}
const HabitCard = ({ name, bg }: HabitCardProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: bg,
      padding: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>{name}</Text>
      {/* Edit Icon */}
    </View>
  );
};

export default HabitCard;
