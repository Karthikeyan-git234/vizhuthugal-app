import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { router } from 'expo-router'

import {
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'

import Colors from '../../constants/colors'

export default function ProfileScreen() {

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }

      showsVerticalScrollIndicator={
        false
      }
    >

      {/* Profile Card */}

      <View style={styles.profileCard}>

        <Image
          source={{
            uri:
              'https://i.pravatar.cc/300',
          }}

          style={styles.avatar}
        />

        <Text style={styles.name}>
          Karthi Keyan
        </Text>

        <Text style={styles.role}>
          Employee
        </Text>

      </View>

      {/* Menu Items */}

      <View style={styles.menuContainer}>

        {/* Account */}

        <TouchableOpacity
          style={styles.menuItem}

          onPress={() =>
            router.push('/')
          }
        >

          <View style={styles.menuLeft}>

            <View
              style={styles.iconBox}
            >

              <Ionicons
                name="person-outline"
                size={22}
                color={Colors.white}
              />

            </View>

            <Text style={styles.menuText}>
              My Account
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.gray}
          />

        </TouchableOpacity>

        {/* Attendance */}

       <TouchableOpacity
  style={styles.menuItem}

  onPress={() =>
    router.push('/attendance-history')
  }
>
          <View style={styles.menuLeft}>

            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    '#10b981',
                },
              ]}
            >

              <MaterialIcons
                name="calendar-month"
                size={22}
                color={Colors.white}
              />

            </View>

            <Text style={styles.menuText}>
              Attendance History
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.gray}
          />

        </TouchableOpacity>

        {/* Reports */}

        <TouchableOpacity
          style={styles.menuItem}
        >

          <View style={styles.menuLeft}>

            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    '#f59e0b',
                },
              ]}
            >

              <Ionicons
                name="document-text-outline"
                size={22}
                color={Colors.white}
              />

            </View>

            <Text style={styles.menuText}>
              Reports
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.gray}
          />

        </TouchableOpacity>

        {/* Settings */}

        <TouchableOpacity
          style={styles.menuItem}

          onPress={() =>
            router.push('/settings')
          }
        >

          <View style={styles.menuLeft}>

            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    '#8b5cf6',
                },
              ]}
            >

              <Ionicons
                name="settings-outline"
                size={22}
                color={Colors.white}
              />

            </View>

            <Text style={styles.menuText}>
              Settings
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.gray}
          />

        </TouchableOpacity>

      </View>

      {/* Logout */}

      <TouchableOpacity
  style={styles.logoutButton}

  onPress={() =>
    router.replace('/login')
  }
>

        <Ionicons
          name="log-out-outline"
          size={22}
          color="#fff"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,

    backgroundColor:
      Colors.background,

    padding: 20,

    paddingBottom: 120,
  },

  /* Profile Card */

  profileCard: {
    backgroundColor:
      Colors.white,

    borderRadius: 28,

    padding: 30,

    alignItems: 'center',

    marginBottom: 25,

    elevation: 4,
  },

  avatar: {
    width: 110,

    height: 110,

    borderRadius: 55,

    marginBottom: 18,
  },

  name: {
    fontSize: 24,

    fontWeight: 'bold',

    color: Colors.black,
  },

  role: {
    fontSize: 16,

    color: Colors.gray,

    marginTop: 6,
  },

  /* Menu */

  menuContainer: {
    marginBottom: 30,
  },

  menuItem: {
    backgroundColor:
      Colors.white,

    borderRadius: 20,

    padding: 18,

    marginBottom: 15,

    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    elevation: 3,
  },

  menuLeft: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  iconBox: {
    width: 50,

    height: 50,

    borderRadius: 16,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 15,
  },

  menuText: {
    fontSize: 17,

    fontWeight: '600',

    color: Colors.black,
  },

  /* Logout */

  logoutButton: {
    backgroundColor:
      '#ef4444',

    padding: 18,

    borderRadius: 20,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',

    fontSize: 18,

    fontWeight: 'bold',

    marginLeft: 8,
  },

})