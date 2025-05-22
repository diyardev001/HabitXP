import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Container from '@/components/Container';
import useTheme from '@/hooks/useTheme';

const Shop = () => {
  const colors = useTheme();

  return (
    <Container>
      <Text style={[styles.title, { color: colors.title }]}>Shop</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.offerCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.offerTitle, { color: colors.title }]}> Doppelte XP (24h)</Text>
          <Text style={styles.offerPrice}>💰 100</Text>
        </View>

        {/* Platzhalter */}
        <View style={[styles.offerCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.offerTitle, { color: colors.title }]}> Angebot 2</Text>
          <Text style={styles.offerPrice}>💰 ???</Text>
        </View>
      </ScrollView>
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
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  offerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  offerTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  offerPrice: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});