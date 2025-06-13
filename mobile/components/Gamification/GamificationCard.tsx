import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import ProgressBar from "@/components/Gamification/ProgressBar";
import StatIndicator from "@/components/Gamification/StatIndicator";
import RewardModal from "@/components/RewardModal";

const STREAK_MILESTONES = [5, 10, 25, 50, 100];

const GAMIFICATION_ICONS = {
    diamond: require('@/assets/images/icons/gamification/diamand.png'),
    xp: require('@/assets/images/icons/gamification/xp.png'),
    health: require('@/assets/images/icons/gamification/health.png'),
    coin: require('@/assets/images/icons/gamification/coin.png'),
};

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
    const [showStreakModal, setShowStreakModal] = useState(false);
    const [alreadyShown, setAlreadyShown] = useState(false);

    useEffect(() => {
        if (STREAK_MILESTONES.includes(streak) && !alreadyShown) {
            setShowStreakModal(true);
            setAlreadyShown(true);
        }
    }, [streak, alreadyShown]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {/* Icon & Level */}
                <View style={styles.iconLevelBox}>
                    <Image source={GAMIFICATION_ICONS.diamond} style={styles.diamond}/>
                </View>
                    </View>

                    {/* Bars & Stats */}
                    <View style={styles.barsBox}>
                        {/* HP Bar */}
                        <ProgressBar current={health} max={maxHealth} color={"#e74c3c"} label={"Health"}
                                     icon={<Ionicons name={"heart"} size={24} color={"#e74c3c"}/>}
                        />
                        {/* XP Bar */}
                        <ProgressBar
                            current={currentXP}
                            max={xpGoal}
                            color={"#f1c40f"}
                            label={"Experience"}
                            icon={<Ionicons name="star" size={24} color="#f1c40f"/>}
                        />
                    </View>
                </View>

                {/* Coin + Level */}
                <View style={styles.coinlvlBox}>
                    <Text style={styles.lvlText}>Lvl {level}</Text>

                    <View style={styles.rightStatsBox}>
                        <StatIndicator
                            value={streak}
                            iconType={"icon"}
                            iconName={"flame"}
                            iconColor={"#ff5722"}
                        />

                        <StatIndicator
                            value={coins}
                            iconType={"image"}
                            iconSource={GAMIFICATION_ICONS.coin}
                        />
                    </View>
                </View>
            </View>

            <RewardModal
                visible={showStreakModal}
                onClose={() => setShowStreakModal(false)}
                title={`${streak} Tage Streak!`}
                description={'Starke Leistung!'}
                animationType="flame"
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 26,
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
    },
    progressWrapper: {
        marginBottom: 20,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        alignItems: "center",
        width: 30,
        marginRight: 10
    },
    progressBarBackground: {
        flex: 1,
        height: 18,
        backgroundColor: '#23272F',
        borderRadius: 9,
        overflow: "hidden"
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 9,
    },
    progressInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 2,
        marginLeft: 35,
        paddingHorizontal: 4,
    },
    progressText: {
        color: "white",
        fontSize: 14
    },
    progressLabel: {
        color: 'white',
        fontSize: 14,
        textAlign: 'right',
    },
    coinlvlBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4,
    },
    },
    rightStatsBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
});

export default GamificationCard;
