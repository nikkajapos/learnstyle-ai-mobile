import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }

    setError('');

    // 🔥 fix navigation timing issue
    setTimeout(() => {
      if (role === 'admin') {
        if (username === 'admin' && password === 'admin123') {
          router.replace('/AdminDashboard');
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        router.replace('/assessment');
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subtitle}>
          Enter your username and password to log in
        </Text>

        {/* ROLE SWITCH */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleBtn, role === 'student' && styles.activeRole]}
            onPress={() => setRole('student')}
          >
            <Text style={role === 'student' ? styles.activeText : styles.roleText}>
              Student
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleBtn, role === 'admin' && styles.activeRole]}
            onPress={() => setRole('admin')}
          >
            <Text style={role === 'admin' ? styles.activeText : styles.roleText}>
              Admin
            </Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <PrimaryButton label="Log In" onPress={handleLogin} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eef2ff'
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20
  },

  heading: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#6b7280'
  },

  roleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#e5e7eb',
    borderRadius: 10
  },

  roleBtn: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },

  activeRole: {
    backgroundColor: '#1e3a8a'
  },

  roleText: {
    color: '#111'
  },

  activeText: {
    color: '#fff'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10
  }
});