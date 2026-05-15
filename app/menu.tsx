import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { router } from 'expo-router'

import {
  Ionicons,
} from '@expo/vector-icons'

import Colors from '../constants/colors'

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>
        Menu
      </Text>

      {/* Profile */}

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          router.push('/profile')
        }
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={Colors.primary}
        />

        <Text style={styles.menuText}>
          Profile
        </Text>
      </TouchableOpacity>

      {/* Notifications */}

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          router.push('/notifications')
        }
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color={Colors.primary}
        />

        <Text style={styles.menuText}>
          Notifications
        </Text>
      </TouchableOpacity>

      {/* Settings */}

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          router.push('/settings')
        }
      >
        <Ionicons
          name="settings-outline"
          size={24}
          color={Colors.primary}
        />

        <Text style={styles.menuText}>
          Settings
        </Text>
      </TouchableOpacity>

      {/* Logout */}

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          router.replace('/login')
        }
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color="#ef4444"
        />

        <Text
          style={[
            styles.menuText,
            { color: '#ef4444' },
          ]}
        >
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      Colors.background,

    padding: 24,
  },

  heading: {
    fontSize: 28,

    fontWeight: 'bold',

    color: Colors.primary,

    marginBottom: 30,

    marginTop: 40,
  },

  menuItem: {
    backgroundColor: '#fff',

    padding: 18,

    borderRadius: 18,

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 16,

    elevation: 3,
  },

  menuText: {
    fontSize: 17,

    fontWeight: '600',

    marginLeft: 14,

    color: Colors.black,
  },
})