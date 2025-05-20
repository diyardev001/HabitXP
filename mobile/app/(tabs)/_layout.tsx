import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import HabitDetail from '@/components/habit/HabitDetail';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8985e9',
        tabBarInactiveTintColor: '#99999b',
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          position: 'relative',
          backgroundColor: '#121720',
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={'index'}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={'space'}
        options={{
          title: 'Bereiche',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={'apps'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={'add'}
        options={{
          title: '',
          tabBarIcon: ({ size }) => (
            <View style={styles.addButton}>
              <Ionicons name={'add'} color={'white'} size={size + 10} />
            </View>
          ),
          
        }}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            <HabitDetail />;
          },
        })}
      />
      <Tabs.Screen
        name={'shop'}
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={'cart'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={'account'}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={'person'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#9c80d0',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45,
  },
});
