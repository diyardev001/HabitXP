import {useState} from "react";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import Container from "@/components/Container";
import Title from "@/components/Title";
import {Ionicons} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import InputField from "@/components/InputField";
import NormalText from "@/components/NormalText";
import PrimaryButton from "@/components/PrimaryButton";
import {router} from "expo-router";
import {createTask} from "@/services/taskService";
import DropdownSelect from "@/components/DropdownSelect";
import {Colors} from "@/constants/Colors";
import {NewTask} from "@/types/task";
import {queryClient} from "@/lib/queryClient";

export default function CreateHabitScreen() {
    const [title, setTitle] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [times, setTimes] = useState("1");
    const [durationValue, setDurationValue] = useState("15");
    const [durationUnit, setDurationUnit] = useState<"MINUTES" | "HOURS">("MINUTES");
    const [space, setSpace] = useState("");
    const [selectedColorKey, setSelectedColorKey] = useState<keyof typeof Colors.habit>();

    const colors = useTheme();
    const colorOptions = Object.entries(Colors.habit);

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
        if (!selectedColorKey) {
            alert("Bitte eine Farbe auswählen");
            return;
        }

        //const spaceData = await getSpaceById(space);
        const habit: NewTask = {
            title,
            duration: `${durationValue}${durationUnit === "HOURS" ? "h" : "min"}`,
            frequency,
            times: frequency !== "NONE" ? parseInt(times) : 0,
            spaceId: space,
            colorKey: selectedColorKey,
        };

        try {
            await createTask(habit);
            await queryClient.invalidateQueries({queryKey: ['tasks']});
            router.replace("/");
        } catch (error) {
            console.error("Fehler beim Erstellen:", error);
            alert("Fehler beim Erstellen des Habits");
        }
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
                                {backgroundColor: frequency === opt.value ? colors.primary : colors.inputBackground},
                            ]}
                            onPress={() => setFrequency(opt.value)}
                        >
                            <NormalText>{opt.label}</NormalText>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.timeRow}>
                    {frequency !== "NONE" && (
                        <View>
                            <NormalText style={styles.label}>Wie oft
                                pro {frequencyLabels[frequency]}?</NormalText>
                            <InputField
                                value={times}
                                onChangeText={setTimes}
                                placeholder={"1"}
                                keyboardType={"numeric"}
                                style={styles.input}
                            />
                        </View>
                    )}

                    <View>
                        <NormalText style={styles.label}>Wie lange?</NormalText>
                        <View style={styles.durationRow}>
                            <InputField
                                value={durationValue}
                                onChangeText={setDurationValue}
                                placeholder={"15"}
                                keyboardType={"numeric"}
                                style={[styles.input, {marginRight: 8}]}
                            />
                            <DropdownSelect
                                value={durationUnit}
                                data={durationOptions}
                                onChange={(item) => setDurationUnit(item.value as "MINUTES" | "HOURS")}
                                style={styles.unitDropdown}
                            />
                        </View>

                    </View>
                </View>
                <View style={styles.row}>
                    {colorOptions.map(([key, colorSet]) => (
                        <TouchableOpacity
                            key={key}
                            style={[
                                styles.colorCircle,
                                {
                                    backgroundColor: colorSet.bg,
                                    borderWidth: selectedColorKey === key ? 3 : 0,
                                    borderColor: 'white',
                                },
                            ]}
                            onPress={() => setSelectedColorKey(key as keyof typeof Colors.habit)}
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
        top: 15,
        left: 16,
        zIndex: 10,
    },
    scroll: {
        flexGrow: 1,
        justifyContent: "flex-start",
        paddingTop: 60,
        paddingBottom: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    headerIcon: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 12
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center"
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 16
    },
    input: {
        width: 100
    },
    durationRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    unitDropdown: {
        width: 110,
        marginBottom: 14,
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
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 8,
    }
})