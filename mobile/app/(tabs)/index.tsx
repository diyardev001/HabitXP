import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import List from '@/components/habit/List';
import GamificationCard from '@/components/Gamification/GamificationCard';
import Container from '@/components/Container';

export default function HomeScreen() {
  return (
    <Container>
      <View style={styles.top}>
        <Text style={styles.name}>Jonas</Text>
        <View style={styles.editBtn}></View>
      </View>
      <GamificationCard hp={65} xp={25} maxXp={50} lvl={1} />
      <List />
    </Container>
  );
}
const styles = StyleSheet.create({
  top: {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
  },
  editBtn: {
    backgroundColor: 'white',
    padding: 18,
  },
});
