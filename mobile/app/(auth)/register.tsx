import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {router} from "expo-router";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Link from "@/components/Link";
import NormalText from "@/components/NormalText";
import PrimaryButton from "@/components/PrimaryButton";
import {ROUTES} from "@/routes";
import InputField from "@/components/InputField";
import useTheme from "@/hooks/useTheme";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen() {
    const {register} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const colors = useTheme();

    const isPasswordSecure = (password: string) => {
        const regex = /^(?=.*[A-Z]).{8,}$/;
        return regex.test(password);
    };

    const handleRegister = async () => {
        if (!email || !password) {
            setError("Bitte fülle alle Felder aus");
            return;
        }
        if (password !== repeatPassword) {
            setError("Passwörter stimmen nicht überein");
            return;
        }
        if (!isPasswordSecure(password)) {
            setError("Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben enthalten.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            await register({email, password, username, firstName, lastName});
        } catch (e: any) {
            const message = e?.response?.data?.message ?? e?.response?.data?.error;
            if (message) {
                setError(message);
            } else {
                setError("Etwas ist schiefgelaufen – versuche es erneut");
            }
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
                    <Title>Registrierung</Title>

                    <View style={styles.row}>
                        <InputField
                            label={"Vorname"}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder={"Vorname"}
                            style={{flex: 1}}
                        />
                        <InputField
                            label={"Nachname"}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder={"Nachname"}
                            style={{flex: 1}}
                        />
                    </View>

                    <InputField
                        label={"Email"}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={"Email"}
                    />
                    <InputField
                        label={"Benutzername"}
                        value={username}
                        onChangeText={setUsername}
                        placeholder={"Benutzername"}
                    />
                    <InputField
                        label={"Passwort"}
                        value={password}
                        onChangeText={setPassword}
                        placeholder={"Passwort"}
                        secureTextEntry={true}
                    />
                    <InputField
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        placeholder={"Passwort wiederholen"}
                        secureTextEntry={true}
                    />

                    {error ? <NormalText style={styles.error}>{error}</NormalText> : null}

                    <PrimaryButton title={"Registrieren"} loading={loading} onPress={handleRegister}/>

                    <TouchableOpacity onPress={() => router.replace(ROUTES.LOGIN)}>
                        <NormalText style={styles.signInLink}>
                            Du hast bereits einen Account? <Link>Anmelden</Link>
                        </NormalText>
                    </TouchableOpacity>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {padding: 20, justifyContent: "center"},
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16
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
    signInLink: {textAlign: "center", marginTop: 24},
});