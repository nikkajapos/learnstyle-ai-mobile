import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const defaultProfile = {
  name: 'Student',
  learningStyle: 'Not set',
  learningStylePercent: 0,
  streakDays: 0,
  lessonsCompleted: 0,
  courseCompletion: 0,
  lastAssessmentScore: 0,
};

export default function StudentProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await AsyncStorage.getItem('studentProfile');
      if (data) {
        try {
          const parsed = JSON.parse(data);
          setProfile(parsed);
          setTempName(parsed.name);
        } catch {
          setProfile(defaultProfile);
          setTempName(defaultProfile.name);
        }
      } else {
        setTempName(defaultProfile.name);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    const updatedProfile = { ...profile, name: tempName };
    setProfile(updatedProfile);
    await AsyncStorage.setItem('studentProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated!');
  };

  const handleAvatarTap = () => {
    Alert.alert('Change Avatar', 'Add a real image picker here in production', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Use placeholder',
        onPress: () => setProfilePicture('https://i.pravatar.cc/150?img=12'),
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          router.replace('/Auth');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔵 HEADER */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.avatar} onPress={handleAvatarTap}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>
                  {profile.name?.charAt(0)?.toUpperCase() || 'S'}
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.headerText}>
              <Text style={styles.title}>Hi, {profile.name}</Text>
              <Text style={styles.subtitle}>
                Your learning progress looks great today
              </Text>
            </View>
          </View>

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>Daily insight</Text>
            <Text style={styles.insightText}>
              You're 8 days into a streak—keep the momentum for a bigger reward.
            </Text>
          </View>
        </View>

        {/* 🟣 PERSONAL INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>👤 Profile Summary</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statsCard}>
              <Text style={styles.statsIcon}>🧠</Text>
              <Text style={styles.statsValue}>{profile.learningStyle}</Text>
              <Text style={styles.statsLabel}>Learning style</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsIcon}>📊</Text>
              <Text style={styles.statsValue}>{profile.learningStylePercent}%</Text>
              <Text style={styles.statsLabel}>Style match</Text>
            </View>
            <View style={styles.statsCard}>
              <Text style={styles.statsIcon}>🎯</Text>
              <Text style={styles.statsValue}>{profile.lastAssessmentScore}%</Text>
              <Text style={styles.statsLabel}>Assessment</Text>
            </View>
          </View>

          {!profile.learningStyle || profile.learningStyle === 'Not set' ? (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeLabel}>Set your learning style for better recommendations</Text>
              <TouchableOpacity style={styles.actionBadge} onPress={() => Alert.alert('Set Style', 'Open style assessment flow') }>
                <Text style={styles.actionBadgeText}>Take assessment</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {/* 🟢 STATS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📊 Learning Statistics</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>🔥 Streak Days</Text>
            <Text style={styles.statValue}>{profile.streakDays} days</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>📚 Lessons Completed</Text>
            <Text style={styles.statValue}>{profile.lessonsCompleted}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>🎯 Course Completion</Text>
            <Text style={styles.statValue}>{profile.courseCompletion}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${profile.courseCompletion}%` },
              ]}
            />
          </View>

          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Overall course progress</Text>
            <Text style={styles.progressPercentage}>{profile.courseCompletion}% complete</Text>
            <View style={styles.progressBarOuter}>
              <View style={[styles.progressBarInner, { width: `${profile.courseCompletion}%` }]} />
            </View>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>📈 Last Assessment Score</Text>
            <Text style={styles.statValue}>
              {profile.lastAssessmentScore}%
            </Text>
          </View>
        </View>

        <View style={styles.motivationalCard}>
          <Text style={styles.motivationalTitle}>Keep going 💪</Text>
          <Text style={styles.motivationalText}>
            Great consistency! Complete one assessment today to reach a higher tier.
          </Text>
        </View>

        {/* 🔘 ACTIONS */}
        <View style={styles.actions}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.primaryBtn} onPress={handleSave}>
                <Text style={styles.primaryText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => {
                  setIsEditing(false);
                  setTempName(profile.name);
                }}
              >
                <Text style={styles.secondaryText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.primaryText}>Edit Profile</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f4f7ff',
  },

  container: {
    flex: 1,
    backgroundColor: '#f4f7ff',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    backgroundColor: '#1d4ed8',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 26,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  avatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },

  subtitle: {
    color: '#dbeafe',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },

  field: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: '#1f2937',
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  statLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    flex: 1,
  },

  statValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },

  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 12,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 3,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },

  actions: {
    marginTop: 20,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  statsCard: {
    width: '32%',
    backgroundColor: '#eef2ff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },

  statsIcon: {
    fontSize: 20,
    marginBottom: 6,
  },

  statsValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1d4ed8',
  },

  statsLabel: {
    fontSize: 12,
    color: '#475569',
    marginTop: 4,
    textAlign: 'center',
  },

  badgeContainer: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: '#fef3c7',
    padding: 12,
  },

  badgeLabel: {
    color: '#92400e',
    fontWeight: '600',
    marginBottom: 8,
  },

  actionBadge: {
    backgroundColor: '#c2410c',
    paddingVertical: 8,
    borderRadius: 8,
  },

  actionBadgeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },

  progressSection: {
    marginTop: 14,
    marginBottom: 6,
  },

  progressTitle: {
    color: '#0f172a',
    fontWeight: '700',
  },

  progressPercentage: {
    color: '#334155',
    marginTop: 2,
    fontSize: 12,
  },

  progressBarOuter: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },

  progressBarInner: {
    height: '100%',
    backgroundColor: '#22c55e',
  },

  motivationalCard: {
    marginTop: 14,
    marginBottom: 14,
    backgroundColor: '#eef6ff',
    borderRadius: 16,
    padding: 14,
  },

  motivationalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d4ed8',
  },

  insightBox: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 14,
  },

  insightTitle: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 14,
  },

  insightText: {
    color: '#dbeafe',
    marginTop: 4,
    fontSize: 13,
  },

  motivationalText: {
    color: '#334155',
    marginTop: 4,
  },

  primaryBtn: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },

  secondaryBtn: {
    backgroundColor: '#e2e8f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  secondaryText: {
    color: '#1f2937',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },

  logoutBtn: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },

  backBtn: {
    backgroundColor: '#6b7280',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  backText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});