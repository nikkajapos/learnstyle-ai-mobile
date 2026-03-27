import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* TOP TEXT */}
      <Text style={styles.smallText}>WELCOME TO</Text>
      <Text style={styles.title}>LEARNSTYLE AI</Text>

      {/* ICON */}
      <Text style={styles.icon}>🎓</Text>

      {/* DESCRIPTION */}
      <Text style={styles.headline}>Discover your learning style</Text>
      <Text style={styles.subText}>
        Improve your study habits using AI-powered recommendations.
      </Text>

      {/* DOTS */}
      <View style={styles.dots}>
        <View style={styles.activeDot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/login')} // go to login
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },

  smallText: {
    color: '#6b7280',
    fontSize: 14,
    letterSpacing: 1
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 40
  },

  icon: {
    fontSize: 100,
    marginBottom: 40,
    color: '#1e3a8a'
  },

  headline: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5
  },

  subText: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 30
  },

  dots: {
    flexDirection: 'row',
    marginBottom: 30
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
    marginHorizontal: 4
  },

  activeDot: {
    width: 20,
    height: 8,
    backgroundColor: '#1e3a8a',
    borderRadius: 4,
    marginHorizontal: 4
  },

  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 12
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});