import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TopBar = () => {
  return (
    <View style={styles.top}>
      <Text style={styles.name}>Jonas</Text>
      <View style={styles.editBtn}></View>
    </View>
  );
};

export default TopBar;

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
