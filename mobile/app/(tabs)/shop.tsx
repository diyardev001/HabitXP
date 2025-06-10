import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import Container from '@/components/Container';
import useTheme from '@/hooks/useTheme';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const coinIcon = require('../../assets/images/icons/gamification/coin.png');

const offers = {
  xp: [
    { title: '1h XP Boost  ', price: 100 },
    { title: '3h XP Boost  ', price: 250 },
    { title: '12h XP Boost  ', price: 600 },
    { title: '24h XP Boost  ', price: 1000 },
  ],
  skip: [
    { title: '1x Skip Day  ', price: 150 },
    { title: '3x Skip Days  ', price: 400 },
    { title: '5x Skip Days  ', price: 600 },
    { title: '10x Skip Days  ', price: 1000 },
  ],
  health: [
    { title: '+5 Health  ', price: 100 },
    { title: '+20 Health  ', price: 350 },
    { title: '+35 Health  ', price: 600 },
    { title: '+50 Health  ', price: 850 },
  ],
};

const ShopTab = ({ items, colors }: { items: typeof offers.xp, colors: any }) => (
  <View style={styles.tabContainer}>
    {items.map((offer, index) => (
      <Pressable key={index} style={[styles.offerCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.offerTitle, { color: colors.title }]}>{offer.title}</Text>
        <Image source={coinIcon} style={styles.coinIcon}/>
        <Text style={styles.offerPrice}>{offer.price}</Text>
      </Pressable>
    ))}
  </View>
);

const Shop = () => {
  const colors = useTheme();
  const layout = Dimensions.get('window');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'xp', title: 'XP Boosts' },
    { key: 'skip', title: 'Skip Days' },
    { key: 'health', title: 'Health' },
  ]);

  const renderScene = SceneMap({
    xp: () => <ShopTab items={offers.xp} colors={colors} />,
    skip: () => <ShopTab items={offers.skip} colors={colors} />,
    health: () => <ShopTab items={offers.health} colors={colors} />,
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
         //height: '10000'
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
