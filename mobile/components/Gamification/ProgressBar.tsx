import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ProgressBarProps {
    current: number;
    max: number;
    color: string;
    label: string;
    icon: React.ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({current, max, color, label, icon}) => {
    const percentage = (current / max) * 100;

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <View style={styles.iconWrapper}>{icon}</View>
                <View style={styles.barBackground}>
                    <View style={[styles.barFill, {width: `${percentage}%`, backgroundColor: color}]}/>
                </View>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.text}>{current}/{max}</Text>
                <Text style={styles.label}>{label}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        marginRight: 10,
    },
    barBackground: {
        flex: 1,
        height: 18,
        backgroundColor: '#23272F',
        borderRadius: 9,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 9,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        marginLeft: 30,
        paddingHorizontal: 4,
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
    label: {
        color: 'white',
        fontSize: 14,
    },
});

export default ProgressBar;
