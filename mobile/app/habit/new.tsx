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
    const [duration, setDuration] = useState("15min");
    const [customFreqUnit, setCustomFreqUnit] = useState("DAYS");
    const [customFreqValue, setCustomFreqValue] = useState("3");
    const [space, setSpace] = useState("");
    const [color, setColor] = useState("#a78bfa");
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);

    const colors = useTheme();

    const frequencyOptions = [
        {label: "Täglich", value: "DAILY"},
        {label: "Wöchentlich", value: "WEEKLY"},
        {label: "Monatlich", value: "MONTHLY"},
        {label: "Halbjährlich", value: "SEMESTERLY"},
        {label: "Jährlich", value: "YEARLY"},
        {label: "Benutzerdefiniert", value: "CUSTOM"},
    ];

    const frequencyLabels: Record<string, string> = {
        DAILY: "Tag",
        WEEKLY: "Woche",
        MONTHLY: "Monat",
        SEMESTERLY: "Halbjahr",
        YEARLY: "Jahr",
        CUSTOM: "Zeitraum",
    };

    const colorOptions = ["#a78bfa", "#f472b6", "#60a5fa", "#34d399", "#fcd34d"];

    const customFreqUnitOptions = [
        {label: "Tage", value: "DAYS"},
        {label: "Wochen", value: "WEEKS"},
        {label: "Monate", value: "MONTHS"},
    ];

    const handleCreateHabit = async () => {
        if (!title || !space) {
            alert("Bitte Titel und Space ausfüllen");
            return;
        }

        const habit = {
            title,
            deadline: undefined, // TODO: entfernen?
            isCompleted: false,
            rewardXP: 10, // TODO: KI
            rewardCoins: 5, // TODO: KI
            frequency,
            times: frequency !== "CUSTOM" ? parseInt(times) : null,
            duration: frequency !== "CUSTOM" ? duration : null,
            custom: frequency === "CUSTOM" ? {unit: customFreqUnit, value: customFreqValue} : null,
            spaceId: space,
            color,
        };

        try {
            await createTask(habit);
            router.replace("/");
        } catch (error) {
            console.error("Fehler beim Erstellen:", error);
            alert("Fehler beim Erstellen der Gewohnheit");
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

                <NormalText style={styles.label}>Frequenz</NormalText>
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

                {frequency !== "CUSTOM" && (
                    <View style={styles.row}>
                        <View style={{flex: 1}}>
                            <NormalText style={styles.label}>Wie oft
                                pro {frequencyLabels[frequency] ?? "Zeitraum"}?</NormalText>
                            <InputField
                                value={times}
                                onChangeText={setTimes}
                                placeholder={"3"}
                                keyboardType={"numeric"}
                            />
                        </View>

                        <View style={{flex: 1}}>
                            <NormalText style={styles.label}>Wie lange?</NormalText>
                            <InputField
                                value={duration}
                                onChangeText={setDuration}
                                placeholder={"30 min."}
                            />
                        </View>
                    </View>
                )}

                {frequency === "CUSTOM" && (
                    <>
                        <NormalText style={styles.label}>Benutzerdefiniert</NormalText>
                        <View style={styles.row}>
                            <InputField
                                value={customFreqValue}
                                onChangeText={setCustomFreqValue}
                                placeholder="3"
                                keyboardType="numeric"
                                style={{flex: 1}}
                            />
                            <TouchableOpacity
                                style={[styles.optionButton, {flex: 1}]}
                                onPress={() => setShowUnitDropdown(true)}
                            >
                                <NormalText>
                                    {customFreqUnitOptions.find((u) => u.value === customFreqUnit)?.label || "Einheit"}
                                </NormalText>
                            </TouchableOpacity>
                        </View>

                        <Modal
                            visible={showUnitDropdown}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setShowUnitDropdown(false)}
                        >
                            <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowUnitDropdown(false)}>
                                <View style={styles.modalContent}>
                                    {customFreqUnitOptions.map((opt) => (
                                        <Pressable
                                            key={opt.value}
                                            onPress={() => {
                                                setCustomFreqUnit(opt.value);
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
                    </>
                )}

                <View style={styles.row}>
                    {colorOptions.map((c) => (
                        <TouchableOpacity
                            key={c}
                            style={[styles.colorCircle, {backgroundColor: c, borderWidth: color === c ? 2 : 0}]}
                            onPress={() => setColor(c)}
                        />
                    ))}
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
    optionButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8
    },
    colorCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
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