import useTheme from "@/hooks/useTheme";
import {StyleSheet, TextInput, TextInputProps} from "react-native";

type Props = TextInputProps & {
    secureTextEntry?: boolean;
};

export default function Input(props: Props) {
    const colors = useTheme();

    return (
        <TextInput
            {...props}
            placeholderTextColor={"#999"}
            style={[styles.input, {backgroundColor: colors.input, color: colors.title}]}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 14,
        borderRadius: 10,
        marginBottom: 14
    },
});