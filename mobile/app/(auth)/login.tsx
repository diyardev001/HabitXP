import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Subtitle from "@/components/Subtitle";
import NormalText from "@/components/NormalText";
import {router} from "expo-router";
import Link from "@/components/Link";
import SocialButton from "@/components/SocialButton";
import PrimaryButton from "@/components/PrimaryButton";
import {ROUTES} from "@/routes";
import InputWithIcon from "@/components/InputWithIcon";
import Checkbox from "expo-checkbox";
import useTheme from "@/hooks/useTheme";
import {Colors} from "@/constants/Colors";

export default function Login() {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1, backgroundColor: colors.background}}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={{backgroundColor: colors.background}}
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps={"handled"}
                >
                    <Container style={styles.container}>
                        <Title>Willkommen zurück!</Title>
                        <Subtitle>
                            Melde dich an und behalte deine Gewohnheiten im Blick
                        </Subtitle>

                        <InputWithIcon
                            label={"Email"}
                            icon={"mail-outline"}
                            value={email}
                            onChangeText={setEmail}
                            placeholder={"Email"}
                        />
                        <InputWithIcon
                            label={"Passwort"}
                            icon={"lock-closed-outline"}
                            value={password}
                            onChangeText={setPassword}
                            placeholder={"Passwort"}
                            secureTextEntry={true}
                        />

                        <View style={styles.rowBetween}>
                            <View style={styles.checkboxRow}>
                                <Checkbox color={Colors.dark.primary} style={styles.checkbox} value={remember}
                                          onValueChange={setRemember}/>
                                <Text style={styles.checkboxText}>Merken</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Passwort vergessen?</Text>
                            </TouchableOpacity>
                        </View>

                        {error ? <NormalText style={styles.error}>{error}</NormalText> : null}

                        <View style={styles.orContainer}>
                            <View style={styles.line}/>
                            <Text style={styles.orText}>ODER</Text>
                            <View style={styles.line}/>
                        </View>

                        <SocialButton iconName={"logo-google"} text={"Mit Google fortfahren"}/>
                        <SocialButton iconName={"logo-apple"} text={"Mit Apple fortfahren"}/>

                        <PrimaryButton title={"Einloggen"} onPress={handleLogin} loading={loading}/>

                        <TouchableOpacity onPress={() => router.replace(ROUTES.REGISTER)}>
                            <NormalText style={styles.signUpLink}>
                                Noch keinen Account? <Link>Registrieren</Link>
                            </NormalText>
                        </TouchableOpacity>
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 20,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 10
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        borderColor: Colors.dark.primary,
        borderWidth: 2,
        width: 20,
        height: 20,
        borderRadius: 4,
    },
    checkboxText: {
        marginLeft: 8,
        color: "#aaa",
    },
    forgotPassword: {color: "#aaa"},
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
    orText: {
        marginHorizontal: 10,
        color: "#aaa",
    },
    signUpLink: {textAlign: "center", marginTop: 24},
});