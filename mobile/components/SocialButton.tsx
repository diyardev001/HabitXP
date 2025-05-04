import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import {ComponentProps} from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

type SocialButtonProps = {
    iconName: IconName;
    text: string
};

export default function SocialButton({iconName, text}: Readonly<SocialButtonProps>) {
    const colors = useTheme();
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: colors.input}]}>
            <Ionicons name={iconName} size={20} color={colors.title}/>
            <Text style={[styles.text, {color: colors.title}]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    text: {
        marginLeft: 10,
    },
});
