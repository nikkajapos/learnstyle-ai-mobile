// screens/DashboardScreen.js
import { ScrollView, StyleSheet, Text } from 'react-native';
import DashboardCard from '../components/DashboardCard';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <DashboardCard
        title="Overview"
        items={[
          "Total Assessments: 10",
          "Users: 5",
          "Average Confidence: 80%"
        ]}
      />

      <DashboardCard
        title="Students"
        items={[
          "User1 - Visual",
          "User2 - Auditory"
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});