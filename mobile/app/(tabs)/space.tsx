import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '@/components/Container';
import SpaceList from './../../components/space/SpaceList';
import TopBar from './../../components/TopBar';

const space = () => {
  return (
    <Container>
      <TopBar />
      <SpaceList />
    </Container>
  );
};

export default space;
