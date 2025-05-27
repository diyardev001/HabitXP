import {useState} from "react";
import {Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import Container from "@/components/Container";
import Title from "@/components/Title";
import {Ionicons} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import InputField from "@/components/InputField";
import NormalText from "@/components/NormalText";
import PrimaryButton from "@/components/PrimaryButton";
import {router} from "expo-router";
import {createTask} from "@/services/taskService";

export default function CreateHabitScreen() {
    const [title, setTitle] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [times, setTimes] = useState("1");
    const [durationValue, setDurationValue] = useState("15");
    const [durationUnit, setDurationUnit] = useState<"MINUTES" | "HOURS">("MINUTES");
    const [space, setSpace] = useState("");
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);

    const colors = useTheme();

    const frequencyOptions = [
        {label: "Täglich", value: "DAILY"},
        {label: "Wöchentlich", value: "WEEKLY"},
        {label: "Monatlich", value: "MONTHLY"},
        {label: "Keine", value: "NONE"},
    ];

    const frequencyLabels: Record<string, string> = {
        DAILY: "Tag",
        WEEKLY: "Woche",
        MONTHLY: "Monat"
    };

    const getDurationLabel = (unit: "MINUTES" | "HOURS", value: string) =>
        unit === "HOURS"
            ? value === "1" ? "Stunde" : "Stunden"
            : value === "1" ? "Minute" : "Minuten";

    const durationOptions = [
        {label: getDurationLabel("MINUTES", durationValue), value: "MINUTES"},
        {label: getDurationLabel("HOURS", durationValue), value: "HOURS"},
    ];

    const handleCreateHabit = async () => {
        if (!title || !space) {
            alert("Bitte Titel und Space ausfüllen");
            return;
        }

        //const spaceData = await getSpaceById(space);
        const habit = {
            title,
            duration: `${durationValue}${durationUnit === "HOURS" ? "h" : "min"}`,
            isCompleted: false,
            rewardXP: 10, // TODO: KI
            rewardCoins: 5, // TODO: KI
            frequency,
            times: frequency !== "NONE" ? parseInt(times) : 0,
            spaceId: space,
            color: "#a78bfa",//spaceData.color, TODO Space Color
        };

        try {
            await createTask(habit);
            router.replace("/");
        } catch (error) {
            console.error("Fehler beim Erstellen:", error);
            alert("Fehler beim Erstellen des Habits");
        }

        console.log("Habit wird erstellt:", habit);
    };

    return (
        <Container>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name={"arrow-back"} size={24} color={colors.title}/>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Ionicons name={"calendar"} size={24} color={colors.primary} style={styles.headerIcon}/>
                    <Title>Gewohnheit erstellen</Title>
                </View>

                <InputField
                    value={title}
                    onChangeText={setTitle}
                    placeholder={"Gewohnheit"}
                />

                <NormalText style={styles.label}>Space</NormalText>
                <InputField
                    value={space}
                    onChangeText={setSpace}
                    placeholder={"z.B. Gesundheit"}
                />

                <NormalText style={styles.label}>Zeitintervall</NormalText>
                <View style={styles.row}>
                    {frequencyOptions.map((opt) => (
                        <TouchableOpacity
                            key={opt.value}
                            style={[
                                styles.optionButton,
                                {backgroundColor: frequency === opt.value ? colors.primary : colors.input},
                            ]}
                            onPress={() => setFrequency(opt.value)}
                        >
                            <NormalText>{opt.label}</NormalText>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.timeRow}>
                    {frequency !== "NONE" && (
                        <View style={styles.timeCol}>
                            <NormalText style={styles.label}>Wie oft
                                pro {frequencyLabels[frequency]}?</NormalText>
                            <InputField
                                value={times}
                                onChangeText={setTimes}
                                placeholder={"1"}
                                keyboardType={"numeric"}
                            />
                        </View>
                    )}

                    <View style={styles.timeCol}>
                        <NormalText style={styles.label}>Wie lange?</NormalText>
                        <View style={styles.durationRow}>
                            <InputField
                                value={durationValue}
                                onChangeText={setDurationValue}
                                placeholder={"15"}
                                keyboardType={"numeric"}
                                style={[
                                    frequency === "NONE"
                                        ? {width: 80, marginRight: 8}
                                        : {flex: 1, marginRight: 8}
                                ]}
                            />
                            <TouchableOpacity
                                style={[styles.unitSelector, {backgroundColor: colors.input}]}
                                onPress={() => setShowUnitDropdown(true)}
                            >
                                <NormalText style={styles.unitLabel}>
                                    {durationOptions.find(opt => opt.value === durationUnit)?.label}
                                </NormalText>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal
                        visible={showUnitDropdown}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setShowUnitDropdown(false)}
                    >
                        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowUnitDropdown(false)}>
                            <View style={styles.modalContent}>
                                {durationOptions.map((opt) => (
                                    <Pressable
                                        key={opt.value}
                                        onPress={() => {
                                            setDurationUnit(opt.value as "MINUTES" | "HOURS");
                                            setShowUnitDropdown(false);
                                        }}
                                        style={styles.modalItem}
                                    >
                                        <NormalText>{opt.label}</NormalText>
                                    </Pressable>
                                ))}
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>

                <PrimaryButton title={"Speichern"} onPress={handleCreateHabit}/>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 65,
        zIndex: 10
    },
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        paddingBottom: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
    },
    headerIcon: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 16
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center"
    },
    timeRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16
    },
    timeCol: {
        flex: 1
    },
    durationRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    unitSelector: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14
    },
    unitLabel: {
        fontWeight: "600",
        width: 60,
    },
    optionButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        borderRadius: 8,
        padding: 16,
        width: "80%",
        backgroundColor: "#000"
    },
    modalItem: {
        paddingVertical: 10,
    },
})