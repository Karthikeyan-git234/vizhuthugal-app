import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { useState } from 'react'

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
      
      {/* Left Section */}

      <View style={styles.leftSection}>
        
       <TouchableOpacity
  activeOpacity={0.8}
  onPress={() =>
    router.push('/menu')
  }
>
          <Ionicons
            name="menu"
            size={28}
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
        
        {/* Notifications */}

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
    )}
    



const styles = StyleSheet.create({
  /* Navbar */

  navbar: {
    backgroundColor:
      Colors.primary,

    marginHorizontal: -20,

    paddingTop: 60,
    paddingBottom: 18,
    paddingHorizontal: 20,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    elevation: 8,

    zIndex: 100,
  },
  wrapper: {
  zIndex: 9999,
},

  /* Left */

  leftSection: {
    flex: 1,

    flexDirection: 'row',

    alignItems: 'center',
  },

  /* Center */

  centerSection: {
    flex: 1,

    alignItems: 'center',
  },

  /* Right */

  rightSection: {
    flex: 1,

    flexDirection: 'row',

    justifyContent: 'flex-end',

    alignItems: 'center',
  },

  /* Title */

  title: {
    color: '#fff',

    fontSize: 22,

    fontWeight: 'bold',
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