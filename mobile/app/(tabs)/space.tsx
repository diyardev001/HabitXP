import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Container from '@/components/Container';
import SpaceList from './../../components/space/SpaceList';
import TopBar from './../../components/TopBar';

const Space = () => {
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const handleAddPress = () => {
    setShouldShowModal(true);
    // Reset the state after a short delay to allow for future triggers
    setTimeout(() => {
      setShouldShowModal(false);
    }, 100);
  };

  return (
    <Container>
      <TopBar onPressAdd={handleAddPress} tab="space" />
      <SpaceList shouldShowModal={shouldShowModal} />
    </Container>
  );
};

export default Space;
