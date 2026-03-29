import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const defaultProfile = {
  name: 'Student',
  learningStyle: 'Not set',
  learningStylePercent: 0,
  streakDays: 0,
  lessonsCompleted: 0,
  courseCompletion: 0,
  lastAssessmentScore: 0,
};  

export default function StudentDashboard() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 LOAD DATA
  useEffect(() => {
    const loadProfile = async () => {
      const data = await AsyncStorage.getItem('studentProfile');
      if (data) {
        try {
          setProfile(JSON.parse(data));
        } catch {
          setProfile(defaultProfile);
        }
      }
      setIsLoading(false);
    };

    loadProfile();
  }, []);

  const weeklyData = useMemo(
    () => ({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{ data: [3, 5, 2, 6, 4], strokeWidth: 3 }],
    }),
    []
  );

  // ⛔ LOADING STATE
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <Text>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* 🔵 HEADER */}
      <View style={styles.hero}>
        
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>
            Good morning, {profile.name}! 
          </Text>

          {/* 👤 PROFILE BUTTON (FIXED ROUTE) */}
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => router.push('/studentprofile')} 
          >
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtext}>
          Stay on track with your learning progress and personalized recommendations.
        </Text>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              🔥 {profile.streakDays}-day streak
            </Text>
            <Text style={styles.statLabel}>Consistency matters</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              📚 {profile.lessonsCompleted} lessons
            </Text>
            <Text style={styles.statLabel}>Completed so far</Text>
          </View>
        </View>
      </View>

      {/* 🟣 LEARNING STYLE */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Learning Style</Text>
          <Text style={styles.badge}>
            {profile.learningStylePercent}% Match
          </Text>
        </View>

        <Text style={styles.bigText}>{profile.learningStyle}</Text>

        <Text style={styles.text}>
          You learn best with diagrams, charts, illustrations, and visually structured lessons.
        </Text>

        <View style={styles.progress}>
          <View
            style={[
              styles.progressFill,
              { width: `${profile.learningStylePercent}%` },
            ]}
          />
        </View>
      </View>

      {/* 🟢 WEEKLY ACTIVITY */}
      <View style={styles.card}>
        <Text style={styles.title}>Weekly Activity</Text>

        <LineChart
          data={weeklyData}
          width={screenWidth - 72}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => '#1d4ed8',
          }}
          bezier
        />
      </View>

      {/* 🟢 PROGRESS */}
      <View style={styles.card}>
        <Text style={styles.title}>Learning Progress</Text>
        <Text style={styles.text}>
          Course Completion: {profile.courseCompletion}%
        </Text>

        <View style={styles.progress}>
          <View
            style={[
              styles.progressFillGreen,
              { width: `${profile.courseCompletion}%` },
            ]}
          />
        </View>
      </View>

      {/* 🔴 ASSESSMENT */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>You&apos;re improving! 🚀</Text>

        <Text style={styles.text}>
          📊 Last score: {profile.lastAssessmentScore}%
        </Text>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/assessment')}
        >
          <Text style={styles.primaryText}>Take Assessment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f7ff' },
  container: { flex: 1 },
  content: { padding: 20 },

  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  hero: {
    backgroundColor: '#1d4ed8',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },

  profileBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },

  profileText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1d4ed8',
  },

  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  subtext: {
    color: '#dbeafe',
    marginTop: 8,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  statBox: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 10,
  },

  statValue: { color: '#fff', fontWeight: '800' },
  statLabel: { color: '#dbeafe', fontSize: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },

  bigText: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 6,
  },

  text: {
    marginTop: 6,
    color: '#475569',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  badge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  progress: {
    height: 10,
    backgroundColor: '#e2e8f0',
    marginTop: 10,
    borderRadius: 10,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
  },

  progressFillGreen: {
    height: '100%',
    backgroundColor: '#22c55e',
  },

  primaryBtn: {
    marginTop: 10,
    backgroundColor: '#1e40af',
    padding: 12,
    borderRadius: 10,
  },

  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
  },
});