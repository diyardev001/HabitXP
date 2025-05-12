import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import Container from "@/components/Container";
import Title from "@/components/Title";
import NormalText from "@/components/NormalText";
import {router} from "expo-router";
import Link from "@/components/Link";
import SocialButton from "@/components/SocialButton";
import PrimaryButton from "@/components/PrimaryButton";
import {ROUTES} from "@/routes";
import InputField from "@/components/InputField";
import useTheme from "@/hooks/useTheme";

export default function Login() {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const colors = useTheme();

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");
            await login(email, password);
        } catch (err: any) {
            setError(err.response?.data?.message || "Login fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{backgroundColor: colors.background}}
            contentContainerStyle={{flexGrow: 1}}
            enableOnAndroid={true}
            keyboardShouldPersistTaps={"handled"}
            extraScrollHeight={20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container style={styles.container}>
                    <Title>Anmeldung</Title>

                    <InputField
                        label={"Email"}
                        icon={"mail-outline"}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={"Email"}
                    />
                    <InputField
                        label={"Passwort"}
                        icon={"lock-closed-outline"}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={"Passwort"}
                        secureTextEntry={true}
                    />

                    {error ? <NormalText style={styles.error}>{error}</NormalText> : null}

                    <PrimaryButton title={"Einloggen"} onPress={handleLogin} loading={loading}/>

                    <View style={styles.orContainer}>
                        <View style={styles.line}/>
                        <Text style={styles.orText}>ODER</Text>
                        <View style={styles.line}/>
                    </View>

                    <View style={styles.socialRow}>
                        <SocialButton iconName={"logo-google"}/>
                        <SocialButton iconName={"logo-apple"}/>
                    </View>

                    <TouchableOpacity onPress={() => router.replace(ROUTES.REGISTER)}>
                        <NormalText style={styles.signUpLink}>
                            Noch keinen Account? <Link>Registrieren</Link>
                        </NormalText>
                    </TouchableOpacity>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 20,
    },
    error: {color: "red", marginBottom: 12},
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#333",
    },
    socialRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    orText: {
        marginHorizontal: 10,
        color: "#aaa",
    },
    signUpLink: {textAlign: "center", marginTop: 24},
});