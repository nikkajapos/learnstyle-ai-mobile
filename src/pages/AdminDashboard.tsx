import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Analytics', 'Learners', 'Model'];

  return (
    <SafeAreaView style={styles.screen}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>LearnStyle AI</Text>
          <Text style={styles.subtitle}>System Analytics & Management</Text>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CARD */}
      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* TABS */}
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tabItem}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText
                  ]}
                >
                  {tab}
                </Text>

                {activeTab === tab && <View style={styles.activeLine} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* CONTENT */}
          {activeTab === 'Overview' && <Overview />}
          {activeTab === 'Analytics' && <Analytics />}
          {activeTab === 'Learners' && <Learners />}
          {activeTab === 'Model' && <Model />}

        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

/* ================== TABS ================== */

function Overview() {
  const stats = [
    { label: 'Total Students', value: 1 },
    { label: 'Assessments', value: 4 },
    { label: 'Avg per Student', value: 4 },
  ];

  return (
    <View style={styles.statsRow}>
      {stats.map((item, index) => (
        <View key={index} style={styles.statBox}>
          <Text style={styles.statNumber}>{item.value}</Text>
          <Text style={styles.statLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

function Analytics() {
  return (
    <View style={styles.center}>
      <Text style={styles.placeholder}>📊 Analytics Coming Soon</Text>
    </View>
  );
}

function Learners() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Student Management</Text>

      {/* TABLE HEADER */}
      <View style={styles.tableHeader}>
        <Text style={styles.th}>User ID</Text>
        <Text style={styles.th}>Style</Text>
        <Text style={styles.th}>Tests</Text>
        <Text style={styles.th}>Last</Text>
      </View>

      {/* ROW */}
      <View style={styles.tableRow}>
        <Text style={styles.td}>246106553</Text>
        <Text style={styles.td}>Reading/Writing</Text>
        <Text style={styles.td}>4</Text>
        <Text style={styles.td}>3/2/2026</Text>
      </View>
    </View>
  );
}

function Model() {
  return (
    <View style={styles.center}>
      <Text style={styles.placeholder}>🤖 AI Model Settings</Text>
    </View>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 15,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },

  subtitle: {
    fontSize: 12,
    color: '#6B7280',
  },

  logoutBtn: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },

  logoutText: {
    fontWeight: '600',
    color: '#111827',
  },

  /* CARD */
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
  },

  /* TABS */
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 15,
  },

  tabItem: {
    alignItems: 'center',
    paddingBottom: 8,
  },

  tabText: {
    color: '#6B7280',
    fontSize: 14,
  },

  activeTabText: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },

  activeLine: {
    height: 2,
    width: 40,
    backgroundColor: '#1E3A8A',
    marginTop: 4,
    borderRadius: 2,
  },

  /* OVERVIEW */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#374151',
  },

  /* SECTION */
  section: {
    marginTop: 10,
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 14,
  },

  /* TABLE */
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 10,
  },

  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  th: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },

  td: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },

  /* CENTER */
  center: {
    alignItems: 'center',
    marginTop: 30,
  },

  placeholder: {
    color: '#6B7280',
    fontSize: 14,
  },
});