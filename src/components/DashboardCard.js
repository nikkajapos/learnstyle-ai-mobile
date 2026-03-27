import { StyleSheet, Text, View } from 'react-native';

export default function DashboardCard({ title, items }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {items.map((item, index) => (
        <Text key={index} style={styles.item}>• {item}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 15,
    borderRadius: 15,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#1e3a8a'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#1e3a8a'
  },

  item: {
    fontSize: 14,
    marginBottom: 3
  }
});