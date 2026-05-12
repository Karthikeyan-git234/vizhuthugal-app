import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import Navbar from '../components/Navbar'

import { router } from 'expo-router'

import {
  Ionicons,
} from '@expo/vector-icons'

import Colors from '../constants/colors'

export default function SettingsScreen() {

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }

      showsVerticalScrollIndicator={
        false
      }
    >

      <Navbar title="Settings" />

      <View style={styles.content}>

        {/* Profile */}

        <TouchableOpacity
          style={styles.card}
        >

          <View style={styles.iconBox}>

            <Ionicons
              name="person"
              size={24}
              color="#fff"
            />

          </View>

          <View
            style={styles.textContainer}
          >

            <Text style={styles.title}>
              Profile
            </Text>

            <Text style={styles.subTitle}>
              View employee profile details
            </Text>

          </View>

        </TouchableOpacity>

        {/* App Settings */}

        <TouchableOpacity
          style={styles.card}
        >

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
              name="settings"
              size={24}
              color="#fff"
            />

          </View>

          <View
            style={styles.textContainer}
          >

            <Text style={styles.title}>
              App Settings
            </Text>

            <Text style={styles.subTitle}>
              Manage application preferences
            </Text>

          </View>

        </TouchableOpacity>

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

          <Text
            style={styles.logoutText}
          >
            Logout
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,

    backgroundColor:
      Colors.background,
  },

  content: {
    padding: 20,

    paddingBottom: 40,
  },

  /* Cards */

  card: {
    backgroundColor:
      Colors.white,

    borderRadius: 20,

    padding: 18,

    marginBottom: 18,

    flexDirection: 'row',

    alignItems: 'center',

    elevation: 3,
  },

  iconBox: {
    width: 55,

    height: 55,

    borderRadius: 16,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 15,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,

    fontWeight: 'bold',

    color: Colors.black,
  },

  subTitle: {
    color: Colors.gray,

    marginTop: 5,

    fontSize: 14,
  },

  /* Logout */

  logoutButton: {
    backgroundColor:
      '#ef4444',

    padding: 18,

    borderRadius: 20,

    marginTop: 20,

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