import {
  Tabs,
  router,
} from 'expo-router'

import {
  Ionicons,
} from '@expo/vector-icons'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native'

import Colors from '../../constants/colors'

export default function TabsLayout() {

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.primary
        }
      />

      {/* ===================================== */}
      {/* TOP NAVBAR */}
      {/* ===================================== */}

      <View style={styles.navbar}>

        {/* Left Section */}

        <View style={styles.leftSection}>

          {/* Menu */}

          <TouchableOpacity

            activeOpacity={0.8}

            style={styles.iconButton}

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

          {/* App Name */}

          <View>

           

            <Text style={styles.title}>

              Vizhuthugal

            </Text>

             <Text style={styles.smallText}>

              Welcome Back admin👋

            </Text>
          </View>

        </View>

        {/* Right Section */}

        <View style={styles.rightSection}>

          {/* Notification */}

          <TouchableOpacity

            activeOpacity={0.8}

            style={styles.notificationButton}

            onPress={() =>
              router.push(
                '/notifications'
              )
            }
          >

            <Ionicons
              name="notifications-outline"
              size={24}
              color="#fff"
            />

            {/* Notification Dot */}

            <View style={styles.dot} />

          </TouchableOpacity>

        </View>

      </View>

      {/* ===================================== */}
      {/* BOTTOM TABS */}
      {/* ===================================== */}

      <Tabs

        screenOptions={{

          headerShown: false,

          tabBarActiveTintColor:
            Colors.primary,

          tabBarInactiveTintColor:
            '#94a3b8',

          tabBarHideOnKeyboard: true,

          tabBarStyle: {

            position: 'absolute',

            left: 18,
            right: 18,
            bottom: 14,

            height: 74,

            borderRadius: 28,

            backgroundColor:
              '#fff',

            borderTopWidth: 0,

            elevation: 12,

            shadowColor: '#000',

            shadowOffset: {

              width: 0,

              height: 5,

            },

            shadowOpacity: 0.08,

            shadowRadius: 10,

            paddingTop: 8,

            paddingBottom: 8,

          },

          tabBarLabelStyle: {

            fontSize: 12,

            fontWeight: '700',

            marginBottom: 5,

          },

        }}
      >

        {/* ===================================== */}
        {/* ACTIVITY */}
        {/* ===================================== */}

        <Tabs.Screen

          name="explore"

          options={{

            title: 'Activity',

            tabBarIcon: ({
              color,
              size,
              focused,
            }) => (

              <View
                style={
                  focused
                    ? styles.activeIcon
                    : undefined
                }
              >

                <Ionicons

                  name={
                    focused
                      ? 'time'
                      : 'time-outline'
                  }

                  size={size}

                  color={color}

                />

              </View>
            ),

          }}
        />

        {/* ===================================== */}
        {/* HOME */}
        {/* ===================================== */}

        <Tabs.Screen

          name="home"

          options={{

            title: 'Home',

            tabBarIcon: ({
              color,
              size,
              focused,
            }) => (

              <View
                style={
                  focused
                    ? styles.activeIcon
                    : undefined
                }
              >

                <Ionicons

                  name={
                    focused
                      ? 'home'
                      : 'home-outline'
                  }

                  size={size}

                  color={color}

                />

              </View>
            ),

          }}
        />

        {/* ===================================== */}
        {/* PROFILE */}
        {/* ===================================== */}

        <Tabs.Screen

          name="profile"

          options={{

            title: 'Profile',

            tabBarIcon: ({
              color,
              size,
              focused,
            }) => (

              <View
                style={
                  focused
                    ? styles.activeIcon
                    : undefined
                }
              >

                <Ionicons

                  name={
                    focused
                      ? 'person'
                      : 'person-outline'
                  }

                  size={size}

                  color={color}

                />

              </View>
            ),

          }}
        />

      </Tabs>

    </View>
  )
}

const styles =
  StyleSheet.create({

    container: {

      flex: 1,

      backgroundColor:
        Colors.background,

    },

    /* ===================================== */
    /* NAVBAR */
    /* ===================================== */

    navbar: {

      height: 105,

      backgroundColor:
        Colors.primary,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent:
        'space-between',

      paddingHorizontal: 18,

      paddingTop: 40,

      borderBottomLeftRadius: 28,

      borderBottomRightRadius: 28,

      elevation: 10,

      shadowColor: '#000',

      shadowOffset: {

        width: 0,

        height: 5,

      },

      shadowOpacity: 0.15,

      shadowRadius: 8,

      zIndex: 999,

    },

    leftSection: {

      flexDirection: 'row',

      alignItems: 'center',

      gap: 14,

    },

    rightSection: {

      flexDirection: 'row',

      alignItems: 'center',

    },

    iconButton: {

      width: 46,

      height: 46,

      borderRadius: 16,

      backgroundColor:
        'rgba(255,255,255,0.15)',

      alignItems: 'center',

      justifyContent:
        'center',

    },

    notificationButton: {

      width: 46,

      height: 46,

      borderRadius: 16,

      backgroundColor:
        'rgba(255,255,255,0.15)',

      alignItems: 'center',

      justifyContent:
        'center',

    },

    dot: {

      width: 10,

      height: 10,

      borderRadius: 10,

      backgroundColor: '#ef4444',

      position: 'absolute',

      top: 10,

      right: 10,

      borderWidth: 2,

      borderColor:
        Colors.primary,

    },

    smallText: {

      color:
        'rgba(255,255,255,0.8)',

      fontSize: 12,

      marginBottom: 2,

    },

    title: {

      color: '#fff',

      fontSize: 24,

      fontWeight: 'bold',

      letterSpacing: 0.5,

    },

    /* ===================================== */
    /* ACTIVE TAB ICON */
    /* ===================================== */

    activeIcon: {

      width: 42,

      height: 42,

      borderRadius: 14,

      backgroundColor:
        'rgba(37,99,235,0.12)',

      alignItems: 'center',

      justifyContent:
        'center',

      marginBottom: 2,

    },

  })