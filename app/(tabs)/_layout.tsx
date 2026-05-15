import {
  Tabs,
  router,
} from 'expo-router'
import { useState } from 'react'
import {
  Ionicons,
} from '@expo/vector-icons'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import Colors from '../../constants/colors'

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      
      {/* Top Navbar */}

      <View style={styles.navbar}>
        
        {/* Menu */}

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

        {/* Title */}

        <Text style={styles.title}>
          Vizhuthugal
        </Text>

        {/* Notification */}

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

      {/* Bottom Tabs */}

      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor:
            Colors.primary,

          tabBarInactiveTintColor:
            Colors.gray,

          tabBarHideOnKeyboard: true,

          tabBarStyle: {
            position: 'absolute',

            left: 15,
            right: 15,
            bottom: 12,

            height: 72,

            borderRadius: 24,

            backgroundColor:
              '#fff',

            borderTopWidth: 0,

            elevation: 10,

            paddingTop: 8,
            paddingBottom: 8,
          },

          tabBarLabelStyle: {
            fontSize: 12,

            fontWeight: '600',

            marginBottom: 4,
          },
        }}
      >
        {/* Activity */}

        <Tabs.Screen
          name="explore"
          options={{
            title: 'Activity',

            tabBarIcon: ({
              color,
              size,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'time'
                    : 'time-outline'
                }
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* Home */}

        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',

            tabBarIcon: ({
              color,
              size,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'home'
                    : 'home-outline'
                }
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* Profile */}

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',

            tabBarIcon: ({
              color,
              size,
              focused,
            }) => (
              <Ionicons
                name={
                  focused
                    ? 'person'
                    : 'person-outline'
                }
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      Colors.background,
  },

  /* Navbar */

  navbar: {
    height: 95,

    backgroundColor:
      Colors.primary,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    paddingHorizontal: 18,

    paddingTop: 38,

    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,

    elevation: 8,

    zIndex: 999,
  },

  title: {
    color: '#fff',

    fontSize: 22,

    fontWeight: 'bold',
  },
})