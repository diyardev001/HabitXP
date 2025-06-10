import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import {Colors} from "@/constants/Colors";
import {useEffect} from "react";

const {width, height} = Dimensions.get("window");

interface RewardItem {
    label: string;
    value: number | string;
}

interface RewardModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    rewards?: RewardItem[];
}

export default function RewardModal({
                                        visible,
                                        onClose,
                                        title,
                                        description = 'Du hast folgendes erhalten:',
                                        rewards = [],
                                    }: Readonly<RewardModalProps>) {
    const theme = Colors["dark"];

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 4000); // Modal wird nach 4 Sekunden geschlossen
        }

        return () => clearTimeout(timer);
    }, [visible, onClose]);

    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <View style={styles.modalBackground}>


                <View style={[styles.modalContent, {backgroundColor: theme.background}]}>
                    <Text style={[styles.modalTitle, {color: theme.title}]}>{title}</Text>
                    <Text style={[styles.modalText, {color: theme.subtitle}]}>{description}</Text>

                    {rewards.map((reward, index) => (
                        <Text key={index} style={[styles.rewardText, {color: theme.title}]}>
                            {reward.label}: {reward.value}
                        </Text>
                    ))}

                    <TouchableOpacity style={[styles.closeButton, {backgroundColor: theme.primary}]}
                                      onPress={onClose}>
                        <Text style={styles.closeButtonText}>Schließen</Text>
                    </TouchableOpacity>
                </View>

                <ConfettiCannon
                    count={150}
                    origin={{x: width / 2, y: height}}
                    explosionSpeed={400}
                    fallSpeed={3000}
                    fadeOut
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 12,
    },
    rewardText: {
        fontSize: 18,
        marginBottom: 6,
        fontWeight: '600',
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});