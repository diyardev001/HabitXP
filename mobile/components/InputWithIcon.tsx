import {StyleSheet, Text, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

type Props = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
};

export default function InputWithIcon({
                                          label,
                                          icon,
                                          value,
                                          onChangeText,
                                          placeholder,
                                          secureTextEntry,
                                      }: Readonly<Props>) {
    const colors = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.label, {color: colors.title}]}>{label}</Text>
            <View style={[styles.inputWrapper, {backgroundColor: colors.input}]}>
                <Ionicons name={icon} size={20} color={colors.subtitle} style={styles.icon}/>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    style={[styles.input, {color: colors.title}]}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {marginBottom: 16},
    label: {fontSize: 14, marginBottom: 6},
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 10,
    },
    icon: {marginRight: 10},
    input: {flex: 1, fontSize: 16},
});
