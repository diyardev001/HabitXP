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
import {router} from "expo-router";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Subtitle from "@/components/Subtitle";
import Link from "@/components/Link";
import NormalText from "@/components/NormalText";
import SocialButton from "@/components/SocialButton";
import PrimaryButton from "@/components/PrimaryButton";
import {ROUTES} from "@/routes";
import InputWithIcon from "@/components/InputWithIcon";
import useTheme from "@/hooks/useTheme";
import Checkbox from "expo-checkbox";
import {Colors} from "@/constants/Colors";

export default function RegisterScreen() {
    const {register} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const colors = useTheme();

    const handleRegister = async () => {
        if (!email || !password) {
            setError("Bitte fülle alle Felder aus");
            return;
        }
        if (!agree) {
            setError("Bitte stimme den Nutzungsbedingungen zu");
            return;
        }

        setError("");
        setLoading(true);
        try {
            await register("default", email, password);
        } catch {
            setError("Etwas ist schiefgelaufen – versuche es erneut");
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
                        <Title>Werde Teil von HabitXP!</Title>
                        <Subtitle>
                            Starte deine Reise zu besseren Gewohnheiten – einfach, schnell und kostenlos!
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
                                <Checkbox
                                    color={Colors.dark.primary}
                                    value={agree}
                                    onValueChange={setAgree}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.checkboxText}>
                                    Ich stimme den <Link>Nutzungsbedingungen</Link> zu.
                                </Text>
                            </View>
                        </View>

                        {error ? <NormalText style={styles.error}>{error}</NormalText> : null}

                        <View style={styles.orContainer}>
                            <View style={styles.line}/>
                            <NormalText>ODER</NormalText>
                            <View style={styles.line}/>
                        </View>

                        <SocialButton iconName={"logo-google"} text={"Mit Google fortfahren"}/>
                        <SocialButton iconName={"logo-apple"} text={"Mit Apple fortfahren"}/>

                        <PrimaryButton title={"Registrieren"} loading={loading} onPress={handleRegister}/>

                        <TouchableOpacity onPress={() => router.replace(ROUTES.LOGIN)}>
                            <NormalText style={styles.signInLink}>
                                Du hast bereits einen Account? <Link>Anmelden</Link>
                            </NormalText>
                        </TouchableOpacity>
                    </Container>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {padding: 20, justifyContent: "center"},
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
        marginRight: 8
    },
    checkboxText: {
        color: "#aaa",
        flexShrink: 1,
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
    orText: {
        marginHorizontal: 10,
        color: "#aaa",
    },
    signInLink: {textAlign: "center", marginTop: 16},
});