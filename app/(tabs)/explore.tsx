import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { useState } from 'react'

import Colors from '../../constants/colors'

export default function MyActivity() {

  const [activeTab, setActiveTab] =
    useState('Today')

  const tabs = [
    'Today',
    'Attendance',
    'Reports',
    'Tasks',
  ]

  return (

    <ScrollView
      style={styles.container}

      contentContainerStyle={{
        paddingBottom: 120,
      }}

      showsVerticalScrollIndicator={
        false
      }
    >

      {/* Header */}

      <Text style={styles.header}>
        My Activity
      </Text>

      {/* Top Tabs */}

      <ScrollView
        horizontal

        showsHorizontalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.tabsWrapper
        }
      >

        {tabs.map((tab) => (

          <TouchableOpacity
            key={tab}

            style={[
              styles.tabButton,

              activeTab === tab &&
                styles.activeTab,
            ]}

            onPress={() =>
              setActiveTab(tab)
            }
          >

            <Text
              style={[
                styles.tabText,

                activeTab === tab &&
                  styles.activeTabText,
              ]}
            >
              {tab}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

      {/* Today */}

      {activeTab === 'Today' && (

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Today's Summary
          </Text>

          <Text style={styles.cardText}>
            Completed 4 tasks today.
          </Text>

        </View>

      )}

      {/* Attendance */}

      {activeTab ===
        'Attendance' && (

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Attendance
          </Text>

          <Text style={styles.cardText}>
            Present: 24 Days
          </Text>

          <Text style={styles.cardText}>
            Absent: 2 Days
          </Text>

        </View>

      )}

      {/* Reports */}

      {activeTab === 'Reports' && (

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Reports
          </Text>

          <Text style={styles.cardText}>
            12 reports submitted.
          </Text>

        </View>

      )}

      {/* Tasks */}

      {activeTab === 'Tasks' && (

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Tasks
          </Text>

          <Text style={styles.cardText}>
            Pending Tasks: 3
          </Text>

        </View>

      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      Colors.background,

    paddingHorizontal: 20,

    paddingTop: 20,
  },

  /* Header */

  header: {
    fontSize: 28,

    fontWeight: 'bold',

    color: Colors.black,

    marginBottom: 22,
  },

  /* Tabs */

  tabsWrapper: {
    paddingBottom: 20,
  },

  tabButton: {
    paddingVertical: 12,

    paddingHorizontal: 20,

    borderRadius: 30,

    backgroundColor:
      '#e2e8f0',

    marginRight: 12,
  },

  activeTab: {
    backgroundColor:
      Colors.primary,
  },

  tabText: {
    color: Colors.black,

    fontWeight: '600',

    fontSize: 14,
  },

  activeTabText: {
    color: Colors.white,
  },

  /* Cards */

  card: {
    backgroundColor:
      Colors.white,

    padding: 22,

    borderRadius: 24,

    marginBottom: 20,

    elevation: 4,
  },

  cardTitle: {
    fontSize: 20,

    fontWeight: 'bold',

    marginBottom: 10,

    color: Colors.black,
  },

  cardText: {
    fontSize: 16,

    color: Colors.gray,

    lineHeight: 24,

    marginBottom: 4,
  },

})