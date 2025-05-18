import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import HabitCard from './HabitCard';
import { Ionicons } from '@expo/vector-icons';

interface SpaceProps {
  name: string;
  xp: number;
  xpMax: number;
  coins: number;
  data: { name: string; bg: string; ac: string }[];
}

const SpaceCard = ({ name, xp, xpMax, coins, data }: SpaceProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderHabitRows = () => {
    const rows = [];
    for (let i = 0; i < data.length; i += 2) {
      const row = (
        <View key={i} style={styles.habitRow}>
          <HabitCard name={data[i].name} bg={data[i].bg} ac={data[i].ac} />
          {i + 1 < data.length && (
            <HabitCard
              name={data[i + 1].name}
              bg={data[i + 1].bg}
              ac={data[i + 1].ac}
            />
          )}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.xpContainer}>
              <Ionicons name="star" size={16} color="#fabb28" />
              <Text style={styles.stats}>
                {xp}/{xpMax}
              </Text>
            </View>
            <View style={styles.coinContainer}>
              {/* Coin Icon */}
              <Text style={styles.stats}>{coins}</Text>
            </View>
          </View>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.habitContainer}>{renderHabitRows()}</View>
      )}
    </View>
  );
};

export default SpaceCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stats: {
    color: 'white',
    fontSize: 14,
  },
  coinIcon: {
    fontSize: 16,
  },
  habitContainer: {
    marginTop: 10,
    gap: 10,
  },
  habitRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
});
