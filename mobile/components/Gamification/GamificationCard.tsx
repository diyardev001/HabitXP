import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';

const GAMIFICATION_ICONS = {
  diamond:
    require('@/assets/images/icons/gamification/diamand.svg') as ImageSourcePropType,
  xpSmall:
    require('@/assets/images/icons/gamification/xp_small.svg') as ImageSourcePropType,
  health:
    require('@/assets/images/icons/gamification/health.svg') as ImageSourcePropType,
  coinSmall:
    require('@/assets/images/icons/gamification/coin-small.svg') as ImageSourcePropType,
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

interface StatRowProps {
  value: number;
  maxValue: number;
  label: string;
  icon: ImageSourcePropType;
  color: string;
}

const StatRow: React.FC<StatRowProps> = ({
  value,
  maxValue,
  label,
  icon,
  color,
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <View style={styles.statRow}>
      <ProgressBar percentage={percentage} color={color} />
      <View style={styles.statInfo}>
        <View style={styles.statValue}>
          <Image source={icon} style={styles.smallIcon} />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.label}>
              {value} / {maxValue}
            </Text>
            <Text style={styles.label}>{label}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.lvlIcon}>
          <Image
            source={GAMIFICATION_ICONS.diamond}
            style={styles.diamondIcon}
          />
        </View>
        <Text style={[styles.label, { marginLeft: 5 }]}>Lvl {lvl}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.statsContainer}>
          <StatRow
            value={hp}
            maxValue={100}
            label="LP"
            icon={GAMIFICATION_ICONS.health}
            color="#fd5f68"
          />
          <StatRow
            value={xp}
            maxValue={maxXp}
            label="EP"
            icon={GAMIFICATION_ICONS.xpSmall}
            color="#fabb28"
          />
        </View>

        <View style={[styles.coinsContainer, { alignSelf: 'flex-end' }]}>
          <Image
            source={GAMIFICATION_ICONS.coinSmall}
            style={styles.coinIcon}
          />
          <Text style={[styles.label]}>{coins}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(97, 51, 180, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 6,
  },
  rightSection: {
    flex: 1.5,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  lvlIcon: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(97, 51, 180, 0.25)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diamondIcon: {
    width: 40,
    height: 40,
  },
  statsContainer: {
    gap: 12,
  },
  statRow: {
    width: '100%',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  statInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  smallIcon: {
    width: 16,
    height: 16,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coinIcon: {
    width: 20,
    height: 20,
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: '200',
  },
  progressLabelContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default GamificationCard;
