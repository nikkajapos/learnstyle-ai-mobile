import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StudentDashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Learning Style</Text>
        <Text style={styles.value}>Visual Learner 🎨</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Progress</Text>
        <Text>Completed Assessments: 3</Text>
        <Text>Confidence: 80%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e3a8a'
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 5
  },

  value: {
    color: '#1e3a8a',
    fontWeight: 'bold'
  }
});