import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import {
  Ionicons,
} from '@expo/vector-icons'

import Colors from '../constants/colors'

const notifications = [
  {
    id: 1,
    title: 'Attendance Submitted',
    message:
      'Your attendance was submitted successfully.',
    time: '2 mins ago',
  },

  {
    id: 2,
    title: 'New Update',
    message:
      'Employee portal updated successfully.',
    time: '10 mins ago',
  },

  {
    id: 3,
    title: 'Reminder',
    message:
      'Don’t forget to submit daily report.',
    time: '1 hour ago',
  },
]

export default function NotificationScreen() {

  return (

    <View style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Notifications
        </Text>

      </View>

      {/* Notification List */}

      <ScrollView
        contentContainerStyle={
          styles.content
        }

        showsVerticalScrollIndicator={
          false
        }
      >

        {notifications.map((item) => (

          <TouchableOpacity
            key={item.id}

            style={styles.card}

            activeOpacity={0.8}
          >

            {/* Icon */}

            <View style={styles.iconBox}>

              <Ionicons
                name="notifications"
                size={24}
                color="#fff"
              />

            </View>

            {/* Text */}

            <View
              style={styles.textContainer}
            >

              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.message}>
                {item.message}
              </Text>

              <Text style={styles.time}>
                {item.time}
              </Text>

            </View>

          </TouchableOpacity>

        ))}

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      Colors.background,
  },

  /* Header */

  header: {
    height: 110,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    paddingTop: 30,

    paddingHorizontal: 22,

    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,

    elevation: 6,
  },

  headerTitle: {
    fontSize: 24,

    fontWeight: 'bold',

    color: '#fff',
  },

  /* Content */

  content: {
    padding: 20,

    paddingBottom: 40,
  },

  /* Card */

  card: {
    backgroundColor:
      Colors.white,

    borderRadius: 22,

    padding: 18,

    marginBottom: 18,

    flexDirection: 'row',

    alignItems: 'center',

    elevation: 3,
  },

  iconBox: {
    width: 60,

    height: 60,

    borderRadius: 18,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 16,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,

    fontWeight: 'bold',

    color: Colors.black,
  },

  message: {
    fontSize: 14,

    color: Colors.gray,

    marginTop: 5,

    lineHeight: 20,
  },

  time: {
    fontSize: 13,

    color: Colors.primary,

    marginTop: 10,

    fontWeight: '600',
  },

})