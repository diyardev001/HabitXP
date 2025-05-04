import {ReactNode} from "react";
import {SafeAreaView, StyleSheet, View, ViewStyle} from "react-native";
import useTheme from "@/hooks/useTheme";

type Props = {
    children: ReactNode;
    style?: ViewStyle;
};

export default function Container({children, style}: Readonly<Props>) {
    const colors = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: colors.background}]}>
            <View style={[styles.inner, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    inner: {
        flex: 1,
        marginHorizontal: 20,
    },
});