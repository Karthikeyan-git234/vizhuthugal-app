import { router } from 'expo-router' 
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'

import Colors from '../constants/colors'

export default function AttendanceHistory() {

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.heading}>
        Attendance History
      </Text>

      <View style={styles.card}>

        <Text style={styles.name}>
          Karthi Keyan
        </Text>

        <Text style={styles.date}>
          12 May 2026
        </Text>

        <Text style={styles.status}>
          Present
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.name}>
          Karthi Keyan
        </Text>

        <Text style={styles.date}>
          11 May 2026
        </Text>

        <Text style={styles.status}>
          Present
        </Text>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,

    backgroundColor:
      Colors.background,

    padding: 20,
  },

  heading: {
    fontSize: 28,

    fontWeight: 'bold',

    color: Colors.black,

    marginBottom: 25,
  },

  card: {
    backgroundColor:
      Colors.white,

    borderRadius: 20,

    padding: 20,

    marginBottom: 18,

    elevation: 3,
  },

  name: {
    fontSize: 18,

    fontWeight: 'bold',

    color: Colors.black,
  },

  date: {
    marginTop: 8,

    color: Colors.gray,

    fontSize: 14,
  },

  status: {
    marginTop: 12,

    color: 'green',

    fontWeight: 'bold',

    fontSize: 16,
  },

})