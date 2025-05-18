import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SpaceCard from './SpaceCard';

const SpaceList = () => {
  return (
    <View>
      <SpaceCard name={'Gesundheit'} xp={12} xpMax={1000} coins={10} />
    </View>
  );
};

export default SpaceList;

const styles = StyleSheet.create({});
