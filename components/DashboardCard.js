// components/DashboardCard.js
import { StyleSheet, Text, View } from 'react-native';

export default function DashboardCard({ title, items }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {items.map((item, index) => (
        <Text key={index}>• {item}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    elevation: 3
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});