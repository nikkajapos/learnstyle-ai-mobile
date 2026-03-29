import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchText, setSearchText] = useState('');
  const [filterStyle, setFilterStyle] = useState('All');

  const tabs = ['Overview', 'Analytics', 'Learners', 'Model'];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            router.replace('/Auth');
          },
          style: 'destructive'
        }
      ]
    );
  };

  const stats = [
    { label: 'Active Users Today', value: 142, icon: '👥' },
    { label: 'Assessments This Week', value: 87, icon: '📋' },
    { label: 'ML Inference Latency', value: '23ms', icon: '⚡' },
  ];

  const distribution = [
    { label: 'Visual', value: 35, color: '#4f46e5' },
    { label: 'Auditory', value: 25, color: '#7c3aed' },
    { label: 'Read/Write', value: 22, color: '#a855f7' },
    { label: 'Kinesthetic', value: 18, color: '#c084fc' },
  ];

  const roster = [
    { name: 'Alice Johnson', email: 'alice@uni.edu', style: 'Visual', date: '2026-03-25' },
    { name: 'Bob Smith', email: 'bob@uni.edu', style: 'Auditory', date: '2026-03-24' },
    { name: 'Clara Lee', email: 'clara@uni.edu', style: 'Read/Write', date: '2026-03-23' },
    { name: 'Derek Miles', email: 'derek@uni.edu', style: 'Kinesthetic', date: '2026-03-22' },
  ];

  const filteredRoster = roster.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = filterStyle === 'All' || student.style === filterStyle;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>LearnStyle AI</Text>
            <Text style={styles.subtitle}>Admin dashboard</Text>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* STAT CARDS GRID */}
        <View style={styles.cardsGrid}>
          {stats.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statCardIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.statCardValue}>{item.value}</Text>
              <Text style={styles.statCardLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* distribution chart */}
        <View style={[styles.card, styles.chartCard]}>
          <Text style={styles.sectionHeading}>Class Distribution</Text>
          <PieChart
            data={distribution.map(item => ({
              name: item.label,
              population: item.value,
              color: item.color,
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            }))}
            width={Dimensions.get('window').width - 64}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <View style={styles.legendGrid}>
            {distribution.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
                <Text style={styles.legendValue}>{item.value}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* roster */}
        <View style={[styles.card, styles.rosterCard]}>
          <Text style={styles.sectionHeading}>Student List</Text>

          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search students..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <View style={styles.filterContainer}>
              {['All', 'Visual', 'Auditory', 'Read/Write', 'Kinesthetic'].map(style => (
                <TouchableOpacity
                  key={style}
                  style={[styles.filterBtn, filterStyle === style && styles.filterBtnActive]}
                  onPress={() => setFilterStyle(style)}
                >
                  <Text style={[styles.filterBtnText, filterStyle === style && styles.filterBtnTextActive]}>
                    {style}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {filteredRoster.map((student, index) => (
            <TouchableOpacity key={index} style={styles.rosterItem} onPress={() => Alert.alert('Student Details', `View details for ${student.name}`)}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{student.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
              <View style={styles.rosterInfo}>
                <Text style={styles.rosterName}>{student.name}</Text>
                <Text style={styles.rosterEmail}>{student.email}</Text>
              </View>
              <View style={styles.rosterBadge}>
                <Text style={styles.rosterBadgeText}>{student.style}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================== TABS ================== */

function ProgressBar({ percentage = 50 }: { percentage?: number }) {
  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressBarFill,
          { width: `${Math.min(percentage, 100)}%` }
        ]}
      />
    </View>
  );
}

function MetricCard({ icon, label, value, percentage }: { icon: string; label: string; value: string | number; percentage?: number }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      {percentage !== undefined && (
        <>
          <ProgressBar percentage={percentage} />
          <Text style={styles.metricPercentage}>{percentage}%</Text>
        </>
      )}
    </View>
  );
}

function Overview() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.tabContent}>
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          <MetricCard
            icon="👥"
            label="Total Students"
            value="24"
            percentage={60}
          />
          <MetricCard
            icon="📋"
            label="Total Assessments"
            value="48"
            percentage={75}
          />
        </View>
        <View style={styles.metricRow}>
          <MetricCard
            icon="✅"
            label="Completed Tests"
            value="35"
            percentage={45}
          />
          <MetricCard
            icon="⏳"
            label="Pending Tests"
            value="13"
            percentage={30}
          />
        </View>
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionHeading}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Student Assessment Completed</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New Student Registered</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>AI Model Updated</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Analytics() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.tabContent}>
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderIcon}>📊</Text>
        <Text style={styles.placeholderTitle}>Analytics Dashboard</Text>
        <Text style={styles.placeholderText}>
          Advanced analytics visualizations including student performance trends, assessment completion rates, and learning style distribution will appear here.
        </Text>
      </View>

      {/* QUICK STATS */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionHeading}>Quick Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statItemLabel}>Avg Completion Time</Text>
            <Text style={styles.statItemValue}>24 min</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statItemLabel}>Success Rate</Text>
            <Text style={styles.statItemValue}>78%</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statItemLabel}>Active Users</Text>
            <Text style={styles.statItemValue}>18</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statItemLabel}>Total Responses</Text>
            <Text style={styles.statItemValue}>1.2K</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Learners() {
  const students = [
    { id: '246106553', style: 'Reading/Writing', tests: 4, last: '3/2/2026', progress: 85 },
    { id: '246106554', style: 'Visual', tests: 3, last: '3/1/2026', progress: 70 },
    { id: '246106555', style: 'Kinesthetic', tests: 5, last: '3/3/2026', progress: 92 },
    { id: '246106556', style: 'Auditory', tests: 2, last: '2/28/2026', progress: 55 },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.tabContent}>
      <View style={styles.learnersSection}>
        <Text style={styles.sectionHeading}>Student Management</Text>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>
          <Text style={[styles.th, { flex: 1.2 }]}>User ID</Text>
          <Text style={[styles.th, { flex: 1.2 }]}>Style</Text>
          <Text style={[styles.th, { flex: 0.8 }]}>Tests</Text>
          <Text style={[styles.th, { flex: 1 }]}>Last</Text>
        </View>

        {/* ROWS */}
        {students.map((student, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.td, { flex: 1.2 }]}>{student.id}</Text>
            <Text style={[styles.td, { flex: 1.2 }, styles.styleTag]}>{student.style}</Text>
            <Text style={[styles.td, { flex: 0.8 }]}>{student.tests}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{student.last}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Model() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.tabContent}>
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderIcon}>🤖</Text>
        <Text style={styles.placeholderTitle}>AI Model Settings</Text>
        <Text style={styles.placeholderText}>
          Configure and monitor AI model parameters, view training metrics, and manage model versions.
        </Text>
      </View>

      {/* MODEL INFO CARDS */}
      <View style={styles.modelSection}>
        <Text style={styles.sectionHeading}>Model Configuration</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardLabel}>Current Model Version</Text>
          <Text style={styles.infoCardValue}>v2.1.0</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardLabel}>Training Accuracy</Text>
          <Text style={styles.infoCardValue}>94.2%</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardLabel}>Last Updated</Text>
          <Text style={styles.infoCardValue}>2 days ago</Text>
        </View>

        <TouchableOpacity style={styles.updateBtn}>
          <Text style={styles.updateBtnText}>Update Model</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  rosterCard: {
    padding: 16,
  },

  searchContainer: {
    marginBottom: 16,
  },

  searchInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  filterBtn: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  filterBtnActive: {
    backgroundColor: '#1e3a8a',
  },

  filterBtnText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },

  filterBtnTextActive: {
    color: '#fff',
  },

  rosterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  rosterInfo: {
    flex: 1,
  },

  rosterName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },

  rosterEmail: {
    fontSize: 12,
    color: '#6b7280',
  },

  rosterBadge: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  rosterBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e3a8a',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  headerLeft: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e3a8a',
  },

  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },

  logoutBtn: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  logoutText: {
    fontWeight: '600',
    color: '#111827',
    fontSize: 13,
  },

  /* CARD CONTAINER */
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },

  /* TABS */
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },

  tabText: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '500',
  },

  activeTabText: {
    color: '#1e3a8a',
    fontWeight: '700',
  },

  activeLine: {
    height: 3,
    width: 60,
    backgroundColor: '#1e3a8a',
    marginTop: 8,
    borderRadius: 1.5,
  },

  /* TAB CONTENT */
  tabContent: {
    padding: 16,
  },

  /* METRICS */
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  statIconContainer: {
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  statCardIcon: {
    fontSize: 24,
  },

  statCardValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 4,
  },

  statCardLabel: {
    fontSize: 12,
    color: '#6b7280',
  },

  chartCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    minWidth: '45%',
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },

  legendLabel: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
  },

  legendValue: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: '600',
  },

  metricRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  metricCard: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  metricIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },

  metricLabel: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },

  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 8,
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },

  metricPercentage: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '600',
  },

  /* ACTIVITY SECTION */
  activitySection: {
    marginBottom: 20,
  },

  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
  },

  activityList: {
    gap: 10,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },

  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginRight: 12,
    marginTop: 5,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },

  activityTime: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },

  /* STATISTICS SECTION */
  statisticsSection: {
    marginTop: 10,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  statItemLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 6,
  },

  statItemValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },

  /* PLACEHOLDER CARD */
  placeholderCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#dbeafe',
  },

  placeholderIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  placeholderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 8,
  },

  placeholderText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* LEARNERS SECTION */
  learnersSection: {
    marginBottom: 20,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
  },

  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },

  th: {
    fontWeight: '600',
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },

  td: {
    fontSize: 12,
    color: '#1f2937',
    textAlign: 'center',
  },

  styleTag: {
    backgroundColor: '#dbeafe',
    color: '#0369a1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '500',
    overflow: 'hidden',
  },

  /* MODEL SECTION */
  modelSection: {
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  infoCardLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
    fontWeight: '600',
  },

  infoCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },

  updateBtn: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  updateBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});