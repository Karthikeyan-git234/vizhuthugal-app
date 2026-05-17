import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native'

import { router } from 'expo-router'

import {
  Ionicons,
} from '@expo/vector-icons'

import Colors from '../constants/colors'

type Props = {
  title: string
}

export default function Navbar({
  title,
}: Props) {

  return (

    <View style={styles.wrapper}>

      {/* Navbar */}

      <View style={styles.navbar}>

        {/* Left */}

        <View style={styles.leftSection}>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push('/menu')
            }
          >

            <Ionicons
              name="menu"
              size={30}
              color="#fff"
            />

          </TouchableOpacity>

        </View>

        {/* Center */}

        <View style={styles.centerSection}>

          <Text style={styles.title}>
            {title}
          </Text>

        </View>

        {/* Right */}

        <View style={styles.rightSection}>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push(
                '/notifications'
              )
            }
          >

            <Ionicons
              name="notifications-outline"
              size={28}
              color="#fff"
            />

          </TouchableOpacity>

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  wrapper: {
    zIndex: 9999,
  },

  /* Navbar */

  navbar: {

    backgroundColor:
      Colors.primary,

    marginHorizontal: -20,

    paddingTop:
      Platform.OS === 'android'
        ? (
            StatusBar.currentHeight || 0
          ) + 18
        : 60,

    paddingBottom: 22,

    paddingHorizontal: 22,

    borderBottomLeftRadius: 30,

    borderBottomRightRadius: 30,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    elevation: 10,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,

    shadowRadius: 6,
  },

  /* Left */

  leftSection: {

    width: 55,

    justifyContent: 'center',

    alignItems: 'flex-start',
  },

  /* Center */

  centerSection: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  /* Right */

  rightSection: {

    width: 55,

    justifyContent: 'center',

    alignItems: 'flex-end',
  },

  /* Title */

  title: {

    color: '#fff',

    fontSize: 24,

    fontWeight: 'bold',

    textAlign: 'center',

    letterSpacing: 0.5,
  },

  /* Dropdown */

  dropdownMenu: {

    position: 'absolute',

    top: 115,

    left: 20,

    width: 210,

    backgroundColor: '#fff',

    borderRadius: 20,

    paddingVertical: 10,

    elevation: 20,

    zIndex: 9999,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,

    shadowRadius: 6,
  },

  dropdownItem: {

    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 14,

    paddingHorizontal: 16,
  },

  dropdownText: {

    marginLeft: 12,

    fontSize: 16,

    fontWeight: '600',

    color: Colors.black,
  },
})