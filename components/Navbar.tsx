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

type Props = {
  title: string
}

export default function Navbar({ title }: Props) {

  return (

    <View style={styles.navbar}>

  {/* Left */}
  <View style={styles.leftSection}>
    <TouchableOpacity>

      <Ionicons
        name="menu"
        size={26}
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
  onPress={() =>
    router.push('/notifications')
  }
>

  <Ionicons
    name="notifications-outline"
    size={28}
    color="#fff"
  />

</TouchableOpacity>
  {/* Settings */}
    <TouchableOpacity
  style={styles.iconButton}
  onPress={() => router.push('/settings')}
>

      <Ionicons
        name="settings-outline"
        size={22}
        color="#fff"
      />

    </TouchableOpacity>

  </View>

</View>
  )
}

const styles = StyleSheet.create({

  navbar: {
    backgroundColor: Colors.primary,

    marginHorizontal: -20,

    paddingTop: 60,
    paddingBottom: 18,
    paddingHorizontal: 20,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

leftSection: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
},

centerSection: {
  flex: 1,
  alignItems: 'center',
},

rightSection: {
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'flex-end',
},

  iconButton: {
    marginRight: 15,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  userName: {
    color: '#fff',
    marginRight: 15,
    fontWeight: '600',
  },

})