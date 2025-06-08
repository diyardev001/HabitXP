import {Ionicons} from '@expo/vector-icons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {completeTask, getTaskStatus} from "@/services/taskService";
import ConfettiCannon from "react-native-confetti-cannon";

interface CardProps {
    id: string;
    title: string;
    durationValue: string;
    durationUnit: "MINUTES" | "HOURS"
    times: number;
    frequency: string;
    done: boolean;
    bgcolor: string;
    accent: string;
    colorCompleted: string;
}

const frequencyMap: Record<string, string> = {
    DAILY: "täglich",
    WEEKLY: "wöchentlich",
    MONTHLY: "monatlich",
};

export default function Card({
                                 id,
                                 title,
                                 durationValue,
                                 durationUnit,
                                 times,
                                 frequency,
                                 done,
                                 bgcolor,
                                 accent,
                                 colorCompleted,
                             }: Readonly<CardProps>) {
    const [isCompleted, setIsCompleted] = useState(done);
    const [backgroundColor, setBackgroundColor] = useState(done ? colorCompleted : bgcolor);
    const [remaining, setRemaining] = useState(times);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        async function fetchStatus() {
            try {
                const status = await getTaskStatus(id);
                setIsCompleted(status.isCompleted);
                setRemaining(status.remaining);
            } catch (error) {
                console.error("Fehler beim Laden des Status:", error);
            }
        }

        fetchStatus();
    }, [id]);

    const handleComplete = async () => {
        try {
            const response = await completeTask(id);
            setIsCompleted(response.isCompleted);
            setRemaining(response.remaining);
            setBackgroundColor(colorCompleted);

            if (response.isCompleted) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
            }
        } catch (error) {
            console.error("Fehler beim Abschließen des Tasks:", error);
        }
    };

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <View>
                <View style={styles.top}>
                    {/* Badge */}
                    <View style={[styles.timeBadge, {backgroundColor: accent}]}>
                        <Text style={styles.duration}>
                            {durationValue} {durationUnit === "HOURS"
                            ? (durationValue === "1" ? "Stunde" : "Stunden")
                            : (durationValue === "1" ? "Minute" : "Minuten")}
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.editButton, {backgroundColor: accent}]}>
                        <Ionicons name="ellipsis-vertical" size={16} color="white"/>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                >
                    <Image
                        style={[{padding: 12, marginRight: 4}]}
                        source={require('@/assets/images/icons/habit/timer.png')}
                    />

                    <Text style={styles.label}>{title}</Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Text style={styles.deadline}>
                    {frequency !== "NONE" ? `${times}x ${frequencyMap[frequency]} (${times - remaining}/${times})` : ""}
                </Text>

                <TouchableOpacity onPress={handleComplete}>
                    <Image
                        source={require('@/assets/images/icons/home/check.png')}
                        style={{width: 50, height: 50, marginRight: 10}}
                    />
                </TouchableOpacity>
            </View>

            {showConfetti && (
                <ConfettiCannon count={150} origin={{x: 200, y: 200}} fadeOut={true}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 70,
        padding: 8,
        borderRadius: 20,
        marginBottom: 18,
        marginHorizontal: 2,
    },
    editButton: {
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },

    duration: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '800',
        padding: 2,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    deadline: {
        alignSelf: 'flex-end',
        paddingLeft: 16,
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    timeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 50,
        opacity: 0.8,
    },
});