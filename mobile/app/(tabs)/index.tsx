import { View, Text } from 'react-native';
import List from '@/components/habit/List';
import GamificationCard from '@/components/Gamification/GamificationCard';
import Container from '@/components/Container';

export default function HomeScreen() {
  return (
    <Container
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <GamificationCard hp={65} xp={25} maxXp={50} lvl={1} />
      <List />
    </Container>
  );
}
