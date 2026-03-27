import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';

export default function Index() {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 🔥 Logo animation (smooth zoom)
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start();

    // 🔥 Text animation (slide up + fade)
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true
        })
      ]).start();
    }, 500);

    // 🔥 Navigate after animation
    setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }).start(() => {
        router.replace('/welcome'); // 👈 change here if needed
      });
    }, 2500);

  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>

      {/* LOGO */}
      <Animated.Image
        source={require('../assets/images/splash-icon.png')}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }
        ]}
      />

      {/* TITLE */}
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslate }]
          }
        ]}
      >
        LearnStyle AI
      </Animated.Text>

      {/* LOADING */}
      <ActivityIndicator
        size="small"
        color="#c7d2fe"
        style={{ marginTop: 25 }}
      />

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 20
  },

  text: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1.2
  }
});