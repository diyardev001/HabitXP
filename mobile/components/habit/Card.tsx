import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface CardProps {
  description: string;
  deadline: {
    duration: string;
    time: string;
  };
  frequency: string;
  done: boolean;
  bgcolor: string;
  accent: string;
}

export default function Card({
  description,
  deadline,
  frequency,
  done,
  bgcolor,
  accent,
}: CardProps) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 70,
      padding: 8,
      borderRadius: 20,
      marginBottom: 18,
      marginHorizontal: 2,
      backgroundColor: bgcolor,
    },
    editButton: {
      backgroundColor: accent,
      padding: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.8,
    },

    duration: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '800',
      padding: 2,
    },
    label: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
    deadline: {
      alignSelf: 'flex-end',
      paddingLeft: 16,
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    top: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    timeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 50,
      backgroundColor: accent,
      opacity: 0.8,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.top}>
          {/* Badge */}
          <View style={styles.timeBadge}>
            <Text style={styles.duration}>{deadline.duration} MIN</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="ellipsis-vertical" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
        >
          <Image
            style={[{ padding: 12, marginRight: 4 }]}
            source={require('@/assets/images/icons/habit/timer.png')}
          />

          <Text style={styles.label}>{description}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.deadline}>
          {frequency}: {deadline.time}
        </Text>
        <TouchableOpacity>
          <Image
            source={require('@/assets/images/icons/home/check.png')}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
