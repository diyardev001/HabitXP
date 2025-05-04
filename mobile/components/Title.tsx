import {StyleSheet, Text} from "react-native";
import useTheme from "@/hooks/useTheme";
import {ReactNode} from "react";

type TitleProps = {
    children: ReactNode;
};

export default function Title({children}: TitleProps) {
    const colors = useTheme();
    return <Text style={[styles.text, {color: colors.title}]}>{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 16,
    },
});
