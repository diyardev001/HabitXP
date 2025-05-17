import { StyleSheet, Text, View } from 'react-native';

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
    duration: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '700',
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
    },
    checkIconContainer: {
      backgroundColor: accent,
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
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
          <View style={[styles.checkIconContainer, { padding: 18 }]}></View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
        >
          {/* Optional: Icon für den Habit */}
          <View
            style={[styles.checkIconContainer, { padding: 14, marginRight: 4 }]}
          ></View>

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
        {/* Noch ein Check-Icon mit Accent (optional) */}
        <View
          style={[styles.checkIconContainer, { marginRight: 14, padding: 26 }]}
        ></View>
      </View>
    </View>
  );
}
