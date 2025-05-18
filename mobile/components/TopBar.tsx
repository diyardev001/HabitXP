import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TopBarProps {
  onPressAdd?: () => void;
}

const TopBar = ({ onPressAdd }: TopBarProps) => {
  const handlePress = () => {
    if (onPressAdd) {
      onPressAdd();
    }
  };

  return (
    <View style={styles.top}>
      <Text style={styles.name}>Jonas</Text>
      <TouchableOpacity 
        style={styles.editBtn} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
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
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
