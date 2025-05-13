import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface GamificationCardProps {
  hp: number;
  xp: number;
  maxXp?: number;
  lvl: number;
  coins?: number;
}

const GamificationCard: React.FC<GamificationCardProps> = ({
  hp,
  xp,
  maxXp = 50,
  lvl,
  coins = 25,
}) => {
  const hpPercentage = (hp / 100) * 100;
  const xpPercentage = (xp / maxXp) * 100;

  return (
    <View>
      <View
        style={{ backgroundColor: '#fff', padding: 20}}
        >
        <Text> EP: {xp} / {maxXp} </Text>
        <Text>LP: {hp} / 100</Text>
        <Text>Lvl {lvl}</Text>
        <Text>{coins}</Text>
        <View>
          <Image source={require('../../assets/images/icons/gamification/coin.svg')} style={{ width: 30, height: 30 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default GamificationCard;
