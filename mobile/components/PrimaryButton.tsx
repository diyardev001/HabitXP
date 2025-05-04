import {ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity} from "react-native";
import useTheme from "@/hooks/useTheme";

type PrimaryButtonProps = {
    title: string;
    loading?: boolean;
    onPress: (event: GestureResponderEvent) => void;
};

export default function PrimaryButton({title, loading = false, onPress}: Readonly<PrimaryButtonProps>) {
    const colors = useTheme();

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]} onPress={onPress}>
            {loading ? (
                <ActivityIndicator color={colors.title}/>
            ) : (
                <Text style={[styles.text, {color: colors.title}]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 16,
    },
    text: {
        fontWeight: "600",
    },
});
