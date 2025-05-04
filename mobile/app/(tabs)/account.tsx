import {useAuth} from "@/context/AuthContext";
import {Pressable, StyleSheet, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Container from "@/components/Container";

export default function AccountScreen() {
    const {logout, user} = useAuth();

    return (
        <Container style={styles.container}>
            <Pressable style={styles.logoutContainer} onPress={logout}>
                <Ionicons name={"log-out-outline"} size={24} color={"#e63946"}/>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "flex-start",
    },
    logoutContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        marginTop: 32,
    },
    logoutText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#e63946",
        fontWeight: "bold"
    },
});