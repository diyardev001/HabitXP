import List from '@/components/habit/HabitList';
import GamificationCard from '@/components/gamification/GamificationCard';
import Container from '@/components/Container';
import TopBar from '@/components/TopBar';

export default function HomeScreen() {
  return (
    <Container>
      <TopBar />
      <GamificationCard hp={65} xp={25} maxXp={50} lvl={1} />
      <List />
    </Container>
  );
}
