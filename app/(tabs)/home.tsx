import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native'

import {
  router,
} from 'expo-router'

import {
  Entypo,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'

import Colors from '../../constants/colors'

export default function HomeScreen() {

  return (

    <ScrollView

      contentContainerStyle={
        styles.container
      }

      showsVerticalScrollIndicator={
        false
      }
    >

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <View style={styles.header}>

        <View>
          
          <Text style={styles.userName}>

            Vizhuthugal 

          </Text>

        </View>

      </View>

      {/* ===================================== */}
      {/* SEARCH */}
      {/* ===================================== */}

      <View
        style={
          styles.searchContainer
        }
      >

        <Ionicons
          name="search"
          size={20}
          color={Colors.gray}
        />

        <TextInput
          placeholder="Search modules..."
          placeholderTextColor={
            Colors.gray
          }
          style={styles.searchInput}
        />

      </View>

      {/* ===================================== */}
      {/* QUICK STATS */}
      {/* ===================================== */}

      <View style={styles.statsRow}>

        {/* Employees */}

        <View
          style={[
            styles.statCard,
            {
              backgroundColor:
                '#2563eb',
            },
          ]}
        >

          <Ionicons
            name="people"
            size={28}
            color="#fff"
          />

          <Text style={styles.statNumber}>
            120
          </Text>

          <Text style={styles.statLabel}>
            Employees
          </Text>

        </View>

        {/* Attendance */}

        <View
          style={[
            styles.statCard,
            {
              backgroundColor:
                '#16a34a',
            },
          ]}
        >

          <Entypo
            name="calendar"
            size={28}
            color="#fff"
          />

          <Text style={styles.statNumber}>
            98
          </Text>

          <Text style={styles.statLabel}>
            Present
          </Text>

        </View>

      </View>

      {/* ===================================== */}
      {/* MODULE TITLE */}
      {/* ===================================== */}

      <Text style={styles.sectionTitle}>

        Quick Modules

      </Text>

      {/* ===================================== */}
      {/* ATTENDANCE */}
      {/* ===================================== */}

      <TouchableOpacity

        style={styles.moduleCard}

        activeOpacity={0.85}

        onPress={() =>
          router.push('/attendance')
        }
      >

        <View style={styles.moduleLeft}>

          <View
            style={[
              styles.moduleIconBox,
              {
                backgroundColor:
                  '#2563eb',
              },
            ]}
          >

            <Entypo
              name="calendar"
              size={24}
              color="#fff"
            />

          </View>

          <View>

            <Text
              style={
                styles.moduleTitle
              }
            >

              Attendance

            </Text>

            <Text
              style={
                styles.moduleSubTitle
              }
            >

              Daily attendance details

            </Text>

          </View>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={Colors.gray}
        />

      </TouchableOpacity>

      {/* ===================================== */}
      {/* EMPLOYEE */}
      {/* ===================================== */}

      <TouchableOpacity

        style={styles.moduleCard}

        activeOpacity={0.85}

        onPress={() =>
          router.push(
            '/employeeprofile'
          )
        }
      >

        <View style={styles.moduleLeft}>

          <View
            style={[
              styles.moduleIconBox,
              {
                backgroundColor:
                  '#8b5cf6',
              },
            ]}
          >

            <Ionicons
              name="person"
              size={24}
              color="#fff"
            />

          </View>

          <View>

            <Text
              style={
                styles.moduleTitle
              }
            >

              Employee Profile

            </Text>

            <Text
              style={
                styles.moduleSubTitle
              }
            >

              Employee details & records

            </Text>

          </View>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={Colors.gray}
        />

      </TouchableOpacity>

      {/* ===================================== */}
      {/* DAILY REPORT */}
      {/* ===================================== */}

      <TouchableOpacity

        style={styles.moduleCard}

        activeOpacity={0.85}

      >

        <View style={styles.moduleLeft}>

          <View
            style={[
              styles.moduleIconBox,
              {
                backgroundColor:
                  '#16a34a',
              },
            ]}
          >

            <Entypo
              name="text-document"
              size={24}
              color="#fff"
            />

          </View>

          <View>

            <Text
              style={
                styles.moduleTitle
              }
            >

              Daily Report

            </Text>

            <Text
              style={
                styles.moduleSubTitle
              }
            >

              Employee work updates

            </Text>

          </View>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={Colors.gray}
        />

      </TouchableOpacity>

      {/* ===================================== */}
      {/* TASK MANAGEMENT */}
      {/* ===================================== */}

      <TouchableOpacity

        style={styles.moduleCard}

        activeOpacity={0.85}

      >

        <View style={styles.moduleLeft}>

          <View
            style={[
              styles.moduleIconBox,
              {
                backgroundColor:
                  '#f97316',
              },
            ]}
          >

            <MaterialIcons
              name="task"
              size={24}
              color="#fff"
            />

          </View>

          <View>

            <Text
              style={
                styles.moduleTitle
              }
            >

              Task Management

            </Text>

            <Text
              style={
                styles.moduleSubTitle
              }
            >

              Manage employee tasks

            </Text>

          </View>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={Colors.gray}
        />

      </TouchableOpacity>

      {/* ===================================== */}
      {/* RECENT ACTIVITY */}
      {/* ===================================== */}

      <Text style={styles.sectionTitle}>

        Recent Activity

      </Text>

      <View style={styles.activityCard}>

        <View style={styles.activityRow}>

          <View
            style={styles.activityDot}
          />

          <View>

            <Text
              style={
                styles.activityTitle
              }
            >

              Attendance marked successfully

            </Text>

            <Text
              style={
                styles.activityTime
              }
            >

              2 mins ago

            </Text>

          </View>

        </View>

        <View style={styles.activityRow}>

          <View
            style={[
              styles.activityDot,
              {
                backgroundColor:
                  '#16a34a',
              },
            ]}
          />

          <View>

            <Text
              style={
                styles.activityTitle
              }
            >

              New employee added

            </Text>

            <Text
              style={
                styles.activityTime
              }
            >

              10 mins ago

            </Text>

          </View>

        </View>

      </View>

    </ScrollView>
  )
}

const styles =
  StyleSheet.create({

    container: {

      flexGrow: 1,

      backgroundColor:
        '#f8fafc',

      paddingHorizontal: 20,

      paddingTop: 20,

      paddingBottom: 120,

    },

    /* HEADER */

    header: {

      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginBottom: 25,

    },

    greeting: {

      color: Colors.gray,

      fontSize: 15,

    },

    userName: {

      fontSize: 28,

      fontWeight: 'bold',

      color: Colors.black,

      marginTop: 4,

    },

    profile: {

      width: 55,

      height: 55,

      borderRadius: 18,

    },

    /* SEARCH */

    searchContainer: {

      backgroundColor:
        '#fff',

      borderRadius: 20,

      paddingHorizontal: 16,

      flexDirection: 'row',

      alignItems: 'center',

      marginBottom: 25,

      elevation: 3,

      shadowColor: '#000',

      shadowOffset: {

        width: 0,

        height: 4,

      },

      shadowOpacity: 0.05,

      shadowRadius: 6,

    },

    searchInput: {

      flex: 1,

      padding: 15,

      fontSize: 16,

      marginLeft: 8,

      color: Colors.black,

    },

    /* STATS */

    statsRow: {

      flexDirection: 'row',

      justifyContent:
        'space-between',

      marginBottom: 30,

    },

    statCard: {

      width: '48%',

      borderRadius: 24,

      padding: 22,

      elevation: 5,

    },

    statNumber: {

      color: '#fff',

      fontSize: 32,

      fontWeight: 'bold',

      marginTop: 16,

    },

    statLabel: {

      color: '#e0e7ff',

      marginTop: 6,

      fontSize: 14,

    },

    /* SECTION */

    sectionTitle: {

      fontSize: 20,

      fontWeight: 'bold',

      color: Colors.black,

      marginBottom: 18,

    },

    /* MODULE */

    moduleCard: {

      backgroundColor:
        '#fff',

      padding: 18,

      borderRadius: 24,

      marginBottom: 18,

      flexDirection: 'row',

      justifyContent:
        'space-between',

      alignItems: 'center',

      elevation: 4,

      shadowColor: '#000',

      shadowOffset: {

        width: 0,

        height: 4,

      },

      shadowOpacity: 0.05,

      shadowRadius: 8,

    },

    moduleLeft: {

      flexDirection: 'row',

      alignItems: 'center',

    },

    moduleIconBox: {

      width: 60,

      height: 60,

      borderRadius: 20,

      justifyContent:
        'center',

      alignItems: 'center',

      marginRight: 16,

    },

    moduleTitle: {

      fontSize: 18,

      fontWeight: 'bold',

      color: Colors.black,

    },

    moduleSubTitle: {

      color: Colors.gray,

      marginTop: 4,

      fontSize: 14,

    },

    /* ACTIVITY */

    activityCard: {

      backgroundColor:
        '#fff',

      borderRadius: 24,

      padding: 22,

      elevation: 4,

      shadowColor: '#000',

      shadowOffset: {

        width: 0,

        height: 4,

      },

      shadowOpacity: 0.05,

      shadowRadius: 8,

    },

    activityRow: {

      flexDirection: 'row',

      alignItems: 'center',

      marginBottom: 18,

    },

    activityDot: {

      width: 14,

      height: 14,

      borderRadius: 20,

      backgroundColor:
        '#2563eb',

      marginRight: 14,

    },

    activityTitle: {

      fontSize: 15,

      fontWeight: '600',

      color: Colors.black,

    },

    activityTime: {

      color: Colors.gray,

      marginTop: 3,

      fontSize: 13,

    },

  })