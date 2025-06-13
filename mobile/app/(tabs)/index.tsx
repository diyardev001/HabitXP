import List from '@/components/habit/HabitList';
import GamificationCard from '@/components/Gamification/GamificationCard';
import Container from '@/components/Container';
import TopBar from '@/components/TopBar';
import {useEffect, useState} from "react";
import {UserData} from "@/types/user";
import {fetchUserData} from "@/services/userService";
import {Text} from "react-native";

export default function HomeScreen() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchUserData()
            .then(data => {
                setUserData(data);
            })
            .catch(err => {
                console.error("Fehler beim Fetch:", err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Fehler beim Laden der Daten</Text>;
    if (!userData) return <Text>Keine Daten</Text>;

    return (
        <Container>
            <TopBar tab="home"/>
            <GamificationCard userData={userData}/>
            <List/>
        </Container>
    );
}
