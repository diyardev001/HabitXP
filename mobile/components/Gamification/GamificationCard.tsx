import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const GAMIFICATION_ICONS = {
  diamond: require('@/assets/images/icons/gamification/diamand.png'),
  xp: require('@/assets/images/icons/gamification/xp.png'),
  health: require('@/assets/images/icons/gamification/health.png'),
  coin: require('@/assets/images/icons/gamification/coin.png'),
};

interface ProgressBarProps {
  percentage: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color }) => (
  <View style={styles.progressBarContainer}>
    <View
      style={[
        styles.progressBar,
        { width: `${percentage}%`, backgroundColor: color },
      ]}
    />
  </View>
);

interface GamificationCardProps {
  hp: number;
  xp: number;
  maxHp?: number;
  maxXp?: number;
  lvl: number;
  coins?: number;
}

const GamificationCard: React.FC<GamificationCardProps> = ({
  hp = 29,
  maxHp = 50,
  xp = 12,
  maxXp = 25,
  lvl = 1,
  coins = 202,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Icon & Level */}
        <View style={styles.iconLevelBox}>
          <Image source={GAMIFICATION_ICONS.diamond} style={styles.diamond} />
        </View>
        {/* Bars & Stats */}
        <View style={styles.barsBox}>
          {/* HP Bar */}
          <View style={styles.barRow}>
            <Image source={GAMIFICATION_ICONS.health} style={styles.statIcon} />
            <View style={styles.barCol}>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${(hp / maxHp) * 100}%`,
                      backgroundColor: '#FF6B6B',
                    },
                  ]}
                />
              </View>
              <View style={styles.barLabelRow}>
                <Text style={[styles.barLabel, { marginRight: '75%' }]}>
                  {hp}/{maxHp}
                </Text>
                <Text style={styles.barLabelUnit}>LP</Text>
              </View>
            </View>
          </View>
          {/* XP Bar */}
          <View style={styles.barRow}>
            <Image source={GAMIFICATION_ICONS.xp} style={styles.statIcon} />
            <View style={styles.barCol}>
              <View style={[styles.progressBarContainer, { marginTop: 8 }]}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${(xp / maxXp) * 100}%`,
                      backgroundColor: '#FFD93D',
                    },
                  ]}
                />
              </View>
              <View style={styles.barLabelRow}>
                <Text style={[styles.barLabel, { marginRight: '75%' }]}>
                  {xp}/{maxXp}
                </Text>
                <Text style={styles.barLabelUnit}>EP</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Coin */}
      </View>
      <View style={styles.coinlvlBox}>
        <Text style={styles.lvlText}>Lvl {lvl}</Text>
        <View style={styles.coinBox}>
          <Image source={GAMIFICATION_ICONS.coin} style={styles.coinIcon} />
          <Text style={styles.coinsText}>{coins}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingBottom: 12,
  },
  iconLevelBox: {
    backgroundColor: '#221a3f',
    padding: 40,
    alignItems: 'center',
    marginRight: 30,
  },
  diamond: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  lvlText: {
    color: 'white',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
  barsBox: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 8,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
    marginBottom: 11,
  },
  barCol: {
    flex: 1,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#23272F',
    borderRadius: 5,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  barLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  barLabel: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'normal',
  },
  barLabelUnit: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'normal',
    marginLeft: 2,
  },
  coinlvlBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  coinBox: {
    flexDirection: 'row',
    gap: 10,
  },
  coinsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
  },
  coinIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

export default GamificationCard;
