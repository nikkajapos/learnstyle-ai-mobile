import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const hideIcon = require('../assets/images/hide.png');
const unhideIcon = require('../assets/images/unhide.png');

export default function Auth() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('userAccount');

      if (!storedUser) {
        Alert.alert('Error', 'No account found. Please sign up first.');
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (
        (identifier === parsedUser.email ||
          identifier === parsedUser.username) &&
        password === parsedUser.password
      ) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(parsedUser));

        if (parsedUser.role === 'admin') {
          router.replace('/AdminDashboard');
        } else {
          router.replace('/StudentDashboard');
        }
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.log('❌ LOGIN ERROR:', error);
    }
  };

  // 📝 SIGNUP
  const handleSignup = async () => {
    if (!name || !identifier || !password) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    try {
      const user = {
        name,
        username: identifier,
        email: identifier,
        password,
        role,
      };

      const profile = {
        name,
        learningStyle: 'Not set',
        learningStylePercent: 0,
        streakDays: 0,
        lessonsCompleted: 0,
        courseCompletion: 0,
        lastAssessmentScore: 0,
      };

      await AsyncStorage.setItem('userAccount', JSON.stringify(user));
      await AsyncStorage.setItem('studentProfile', JSON.stringify(profile));

      Alert.alert('Success', 'Account created!');
      setIsLogin(true);
    } catch (error) {
      console.log('❌ SIGNUP ERROR:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        {/* HEADER */}
        <Text style={styles.title}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Text>

        <Text style={styles.subtitle}>
          {isLogin
            ? 'Sign in to your LearnStyle AI account'
            : 'Create your account to get started'}
        </Text>

        {/* ROLE */}
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[
              styles.roleBtn,
              role === 'student' && styles.activeRole,
            ]}
            onPress={() => setRole('student')}
          >
            <Text style={styles.roleText}>👤 Student</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleBtn,
              role === 'admin' && styles.activeRole,
            ]}
            onPress={() => setRole('admin')}
          >
            <Text style={styles.roleText}>⚙️ Admin</Text>
          </TouchableOpacity>
        </View>

        {/* NAME */}
        {!isLogin && (
          <TextInput
            placeholder="username"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        )}

        {/* USERNAME / EMAIL */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={identifier}
          onChangeText={setIdentifier}
        />

        {/* PASSWORD */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            activeOpacity={0.7}
          >
            <Image
              source={showPassword ? unhideIcon : hideIcon}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* FORGOT */}
        {isLogin && (
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        {/* MAIN BUTTON */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={isLogin ? handleLogin : handleSignup}
        >
          <Text style={styles.primaryText}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {/* GOOGLE UI */}
        {isLogin && (
          <>
            <Text style={styles.or}>or</Text>

            <TouchableOpacity style={styles.googleBtn}>
              <View style={styles.googleContent}>
                <Image
                  source={require('../assets/images/google.png')}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleText}>
                  Sign in with Google
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}

        {/* SWITCH */}
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </Text>
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
    backgroundColor: '#eef2ff',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },

  roleRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  roleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  activeRole: {
    backgroundColor: '#c7d2fe',
  },

  roleText: {
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingRight: 10,
    marginBottom: 10,
  },

  passwordInput: {
    flex: 1,
    padding: 14,
  },

  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: '#6b7280',
  },

  forgot: {
    textAlign: 'right',
    color: '#4f46e5',
    marginBottom: 12,
  },

  primaryBtn: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 14,
  },

  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
  },

  or: {
    textAlign: 'center',
    marginVertical: 14,
    color: '#6b7280',
  },

  googleBtn: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleText: {
    fontWeight: '600',
    color: '#374151',
  },

  switchText: {
    textAlign: 'center',
    marginTop: 18,
    color: '#4f46e5',
    fontWeight: '600',
  },
});