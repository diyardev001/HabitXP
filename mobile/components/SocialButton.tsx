import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";
import {ComponentProps} from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

type SocialButtonProps = {
    iconName: IconName;
    text?: string;
};

export default function SocialButton({iconName, text}: Readonly<SocialButtonProps>) {
    const colors = useTheme();
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.input}]}>
            <Ionicons name={iconName} size={24} color={colors.title}/>
            {text && <Text style={[styles.text, {color: colors.title}]}>{text}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        marginHorizontal: 6,
    },
    text: {
        marginLeft: 10,
        fontSize: 16
    },
});
