import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HabitCard from './HabitCard';

interface SpaceProps {
  name: string;
  xp: number;
  xpMax: number;
  coins: number;
}
const SpaceCardTop = ({ name, xp, xpMax, coins }: SpaceProps) => {
  return (
    <View>
      <Text style={styles.label}>{name}</Text>
      <Text style={styles.label}>
        {xp} / {xpMax} XP
      </Text>
      <Text style={styles.label}>🪙 {coins}</Text>
      {/* Toggle Icon */}
    </View>
  );
};
const SpaceCard = ({ name, xp, xpMax, coins }: SpaceProps) => {
  return (
    <View>
      <SpaceCardTop name={name} xp={xp} xpMax={xpMax} coins={coins} />
      <HabitCard name="test" bg="#2eae62" />
    </View>
  );
};

export default SpaceCard;

const styles = StyleSheet.create({
  label: {
    color: 'white',
  },
});
