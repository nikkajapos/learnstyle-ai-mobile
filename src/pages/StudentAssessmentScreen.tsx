import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StudentAssessmentScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* 🔷 APP HEADER */}
      <Text style={styles.logo}>LearnStyle AI</Text>

      {/* 👋 TITLE */}
      <Text style={styles.mainTitle}>Welcome Back</Text>

      {/* 📦 CARD */}
      <View style={styles.card}>

        <Text style={styles.subtitle}>
          Discover your learning style and improve your study habits using AI.
        </Text>

        {/* ✅ FEATURES */}
        <View style={styles.listItem}>
          <Text style={styles.check}>✔</Text>
          <Text style={styles.listText}>Identify your learning style</Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.check}>✔</Text>
          <Text style={styles.listText}>Get personalized recommendations</Text>
        </View>

        <View style={styles.listItem}>
          <Text style={styles.check}>✔</Text>
          <Text style={styles.listText}>Track your progress</Text>
        </View>

        {/* 🔘 BUTTONS */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => alert('Start Assessment')}
        >
          <Text style={styles.primaryText}>Start Assessment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/AdminDashboard')}
        >
          <Text style={styles.secondaryText}>Skip for now</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9fafb'
  },

  // 🔷 LOGO STYLE
  logo: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1e3a8a',
    marginBottom: 5
  },

  // 👋 TITLE
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 20
  },

  // 📦 CARD
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,

    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15
  },

  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 15
  },

  // ✅ LIST
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },

  check: {
    color: '#1e3a8a',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16
  },

  listText: {
    fontSize: 15,
    color: '#111827'
  },

  // 🔘 PRIMARY BUTTON
  primaryBtn: {
    backgroundColor: '#1e3a8a',
    padding: 16,
    borderRadius: 14,
    marginTop: 25,

    elevation: 3
  },

  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },

  // 🔘 SECONDARY BUTTON
  secondaryBtn: {
    backgroundColor: '#e5e7eb',
    padding: 16,
    borderRadius: 14,
    marginTop: 10
  },

  secondaryText: {
    color: '#111827',
    textAlign: 'center',
    fontWeight: '600'
  }
});