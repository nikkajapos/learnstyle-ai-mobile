// screens/LoginScreen.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }

    // simulate success (same as your web logic simplified)
    router.push('/dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LearnStyle AI</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Welcome Back</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <Text>Username</Text>
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          onChangeText={setUsername}
        />

        <Text>Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <PrimaryButton label="Sign In" onPress={handleLogin} />

        <Text style={styles.adminText}>
          Admin? Use your admin credentials to access the dashboard.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f3f4f6'
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  error: {
    color: 'red',
    marginBottom: 10
  },
  adminText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray'
  }
});