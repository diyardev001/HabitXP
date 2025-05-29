import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import SpaceCard from './SpaceCard';
import { Colors } from '@/constants/Colors';
import CreateSpaceModal from './CreateSpaceModal';

interface SpaceListProps {
  shouldShowModal?: boolean;
}

const SpaceList = ({ shouldShowModal }: SpaceListProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sections, setSections] = useState([
    {
      name: 'Gesundheit',
      xp: 12,
      xpMax: 1000,
      coins: 20,
      data: [
        { name: 'Fitness', bg: Colors.habit.green.bg, ac: Colors.habit.green.ac },
        { name: 'Ernährung', bg: Colors.habit.indigo.bg, ac: Colors.habit.indigo.ac },
        { name: 'Yoga', bg: Colors.habit.pink.bg, ac: Colors.habit.pink.ac },
        {
          name: 'Wasser trinken',
          bg: Colors.habit.blue.bg,
          ac: Colors.habit.blue.ac,
        },
      ],
    },
    {
      name: 'Entspannung',
      xp: 52,
      xpMax: 500,
      coins: 10,
      data: [
        {
          name: 'Meditation',
          bg: Colors.habit.coral.bg,
          ac: Colors.habit.coral.ac,
        },
        {
          name: 'Schlafen',
          bg: Colors.habit.orange.bg,
          ac: Colors.habit.orange.ac,
        },
      ],
    },
    {
      name: 'Hobbys',
      xp: 552,
      xpMax: 1000,
      coins: 20,
      data: [
        { name: 'Lesen', bg: Colors.habit.yellow.bg, ac: Colors.habit.yellow.ac },
        { name: 'Kochen', bg: Colors.habit.cyan.bg, ac: Colors.habit.cyan.ac },
        {
          name: 'Klavier spielen',
          bg: Colors.habit.indigo.bg,
          ac: Colors.habit.indigo.ac,
        },
        {
          name: 'Programmieren',
          bg: Colors.habit.green.bg,
          ac: Colors.habit.green.ac,
        },
      ],
    },
  ]);

  // Update isModalVisible when shouldShowModal changes
  useEffect(() => {
    if (shouldShowModal) {
      setIsModalVisible(true);
    }
  }, [shouldShowModal]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddSpace = (name: string) => {
    if (name.trim()) {
      setSections(prevSections => [
        ...prevSections,
        {
          name,
          xp: 0,
          xpMax: 1000,
          coins: 0,
          data: [],
        }
      ]);
    }
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {sections.map((section, index) => (
          <SpaceCard
            key={index}
            name={section.name}
            xp={section.xp}
            xpMax={section.xpMax}
            coins={section.coins}
            data={section.data}
          />
        ))}
      </ScrollView>

      <CreateSpaceModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onDone={handleAddSpace}
      />
    </View>
  );
};

export default SpaceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
