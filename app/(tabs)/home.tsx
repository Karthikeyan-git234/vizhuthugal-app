import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native'

import { router } from 'expo-router'

import {
  Entypo,
  Ionicons,
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

      {/* Search */}

      <View style={styles.searchContainer}>

        <Ionicons
          name="search"
          size={20}
          color={Colors.gray}
        />

        <TextInput
          placeholder="Search..."
          placeholderTextColor={
            Colors.gray
          }
          style={styles.searchInput}
        />

      </View>

      {/* Attendance */}

      <TouchableOpacity
        style={styles.moduleCard}

        onPress={() =>
          router.push('/attendance')
        }
      >

        <View style={styles.moduleLeft}>

          <View
            style={styles.moduleIconBox}
          >

            <Entypo
              name="calendar"
              size={24}
              color={Colors.white}
            />

          </View>

          <View>

            <Text
              style={styles.moduleTitle}
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

      {/* Daily Report */}

      <TouchableOpacity
        style={styles.moduleCard}
      >

        <View style={styles.moduleLeft}>

          <View
            style={[
              styles.moduleIconBox,
              {
                backgroundColor:
                  Colors.success,
              },
            ]}
          >

            <Entypo
              name="text-document"
              size={24}
              color={Colors.white}
            />

          </View>

          <View>

            <Text
              style={styles.moduleTitle}
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

      {/* Profile */}

      <TouchableOpacity
        style={styles.moduleCard}
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
              color={Colors.white}
            />

          </View>

          <View>

            <Text
              style={styles.moduleTitle}
            >
              Profile
            </Text>

            <Text
              style={
                styles.moduleSubTitle
              }
            >
              Employee profile details
            </Text>

          </View>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color={Colors.gray}
        />

      </TouchableOpacity>

      {/* Stats Card */}

      <View style={styles.statsCard}>

        <Text style={styles.statsTitle}>
          Today's Summary
        </Text>

        <View style={styles.statsRow}>

          <View>

            <Text style={styles.statsNumber}>
              12
            </Text>

            <Text style={styles.statsLabel}>
              Tasks
            </Text>

          </View>

          <View>

            <Text style={styles.statsNumber}>
              24
            </Text>

            <Text style={styles.statsLabel}>
              Present
            </Text>

          </View>

          <View>

            <Text style={styles.statsNumber}>
              8
            </Text>

            <Text style={styles.statsLabel}>
              Reports
            </Text>

          </View>

        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,

    backgroundColor:
      Colors.background,

    paddingHorizontal: 20,

    paddingTop: 20,

    paddingBottom: 120,
  },

  /* Search */

  searchContainer: {
    backgroundColor:
      Colors.white,

    borderRadius: 18,

    paddingHorizontal: 15,

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 25,

    elevation: 3,
  },

  searchInput: {
    flex: 1,

    padding: 15,

    fontSize: 16,

    marginLeft: 8,

    color: Colors.black,
  },

  /* Module Cards */

  moduleCard: {
    backgroundColor:
      Colors.white,

    padding: 18,

    borderRadius: 22,

    marginBottom: 18,

    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    elevation: 4,
  },

  moduleLeft: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  moduleIconBox: {
    width: 58,

    height: 58,

    borderRadius: 18,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 15,
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

  /* Stats */

  statsCard: {
    backgroundColor:
      Colors.primary,

    borderRadius: 24,

    padding: 24,

    marginTop: 10,
  },

  statsTitle: {
    color: '#fff',

    fontSize: 20,

    fontWeight: 'bold',

    marginBottom: 20,
  },

  statsRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',
  },

  statsNumber: {
    color: '#fff',

    fontSize: 28,

    fontWeight: 'bold',
  },

  statsLabel: {
    color: '#e2e8f0',

    marginTop: 5,

    fontSize: 14,
  },

})