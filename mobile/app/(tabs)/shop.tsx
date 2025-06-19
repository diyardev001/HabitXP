import { StyleSheet, Text, View, Pressable, Dimensions, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Container from '@/components/Container';
import useTheme from '@/hooks/useTheme';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { fetchBonuses } from "@/services/shopService";
import { buyBonus } from "@/services/shopService";
import { useUserData } from "@/hooks/useUserData";
import { Bonus } from "@/types/bonus";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

const coinIcon = require('../../assets/images/icons/gamification/coin.png');

const ShopTab = ({
  items,
  colors,
  userData,
  mutation,
}: {
  items: Bonus[];
  colors: any;
  userData: any;
  mutation: any;
}) => (
    <View style={styles.tabContainer}>
      {items.map((offer) => (
        <Pressable
          key={offer.id}
          style={[styles.offerCard, { backgroundColor: colors.card }]}
          onPress={() => {
            if (!userData) return;
            if (userData.coins < offer.cost) {
              Alert.alert("Nicht genug Coins", "Du hast nicht genügend Coins für diesen Bonus.");
              return;
            }
            mutation.mutate(offer);
          }}
        >
          <Text style={[styles.offerTitle, { color: colors.title }]}>{offer.name}</Text>
          <Image source={coinIcon} style={styles.coinIcon} />
          <Text style={styles.offerPrice}>{offer.cost}</Text>
        </Pressable>
      ))}
    </View>
);

const Shop = () => {
  const colors = useTheme();
  const layout = Dimensions.get('window');
  const { data: userData } = useUserData();
  const queryClient = useQueryClient();

const { data: allBonuses = [], isLoading } = useQuery({
  queryKey: ["bonuses"],
  queryFn: fetchBonuses,
});

const xpBonuses = allBonuses.filter(b => b.type === "XP_BOOST");
const healthBonuses = allBonuses.filter(b => b.type === "HEALTH");
const streakBonuses = allBonuses.filter(b => b.type === "StreakFreeze");


  const mutation = useMutation({x
    mutationFn: (bonus: Bonus) => {
      if (!userData) throw new Error("User nicht geladen");
      return buyBonus(bonus.id, userData.id);
    },
    onSuccess: (message) => {
      Alert.alert("Erfolg", message);
      queryClient.invalidateQueries({ queryKey: ["userData", userData?.id] });
    },
    onError: (err: any) => {
      Alert.alert("Fehlgeschlagen", err.message || "Unbekannter Fehler beim Kauf.");
    },
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'xp', title: 'XP Boosts' },
    { key: 'skip', title: 'Skip Days' },
    { key: 'health', title: 'Health' },
  ]);

const renderScene = SceneMap({
      xp: () => <ShopTab items={xpBonuses} colors={colors} />,
      skip: () => <ShopTab items={streakBonuses} colors={colors} />,
      health: () => <ShopTab items={healthBonuses} colors={colors} />,
});

  return (
    <Container>
      <Text style={[styles.title, { color: colors.title }]}>Shop</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.title }}
            style={{ backgroundColor: colors.background }}
            activeColor={colors.title}
            inactiveColor={colors.subtitle}
            labelStyle={{ fontWeight: 'bold' }}
          />
        )}
      />
    </Container>
  );
};

export default Shop;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  tabContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: 20,
  },
  offerCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  offerTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  offerPrice: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
});
