import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import Container from "@/components/Container";
import Title from "@/components/Title";
import {Ionicons} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import InputField from "@/components/InputField";
import NormalText from "@/components/NormalText";
import PrimaryButton from "@/components/PrimaryButton";
import {router} from "expo-router";
import DropdownSelect from "@/components/DropdownSelect";
import {Colors} from "@/constants/Colors";
import {NewTask} from "@/types/task";
import {queryClient} from "@/lib/queryClient";
import {useUserData} from "@/hooks/useUserData";
import {createTask} from "@/services/taskService";
import {useHabitForm} from "@/hooks/useHabitForm";
import {useMemo} from "react";
import {frequencyLabels, frequencyOptions, getDurationLabel} from "@/utils/habitFormUtils";

interface HabitFormScreenProps {
    initialValues?: Partial<NewTask>;
    disabledFields?: string[];
    onSubmit?: (habit: NewTask) => Promise<void>;
}

export default function HabitFormScreen({
                                            initialValues = {},
                                            disabledFields = [],
                                            onSubmit,
                                        }: Readonly<HabitFormScreenProps>) {

    const colors = useTheme();
    const colorOptions = Object.entries(Colors.habit);
    const {data: userData} = useUserData();
    const {
        title, setTitle,
        frequency, setFrequency,
        times, setTimes,
        durationValue, setDurationValue,
        durationUnit, setDurationUnit,
        space, setSpace,
        selectedColorKey, setSelectedColorKey
    } = useHabitForm(initialValues);

    const durationOptions = useMemo(() => [
        {label: getDurationLabel("MINUTES", durationValue), value: "MINUTES"},
        {label: getDurationLabel("HOURS", durationValue), value: "HOURS"},
    ], [durationValue]);

    const handleSave = async () => {
        if (!title || !space) {
            alert("Bitte Titel und Space ausfüllen");
            return;
        }
        if (!selectedColorKey) {
            alert("Bitte eine Farbe auswählen");
            return;
        }

        const habit: NewTask = {
            userId: userData?.id!,
            title,
            duration: `${durationValue}${durationUnit === "HOURS" ? "h" : "min"}`,
            frequency,
            times: frequency !== "NONE" ? parseInt(times) : 1,
            spaceId: space,
            colorKey: selectedColorKey,
        };

        try {
            if (onSubmit) {
                await onSubmit(habit);
            } else {
                await createTask(habit);
            }
            await queryClient.invalidateQueries({queryKey: ['tasks']});
            await queryClient.invalidateQueries({queryKey: ['userData']});
            router.replace("/");
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            alert("Fehler beim Speichern des Habits");
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
                    <Title>{initialValues.title ? "Gewohnheit bearbeiten" : "Gewohnheit erstellen"}</Title>
                </View>

                <InputField
                    value={title}
                    onChangeText={setTitle}
                    placeholder={"Gewohnheit"}
                    editable={!disabledFields.includes("title")}
                />

                <NormalText style={styles.label}>Space</NormalText>
                <InputField
                    value={space}
                    onChangeText={setSpace}
                    placeholder={"z.B. Gesundheit"}
                    editable={!disabledFields.includes("space")}
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
                            <NormalText style={styles.label}>Wie oft pro {frequencyLabels[frequency]}?</NormalText>
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

                <PrimaryButton title={initialValues.title ? "Speichern" : "Erstellen"} onPress={handleSave}/>
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
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 8,
    }
});
