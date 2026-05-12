import React, { useState, useRef } from 'react'
import API from '../services/api'
import { router } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native'

import {
  Ionicons,
  Entypo,
} from '@expo/vector-icons'

import Colors from '../constants/colors'

export default function AttendanceScreen() {

  const [employeeName, setEmployeeName] = useState('')
  const [workDone, setWorkDone] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

const slideAnim = useRef(
  new Animated.Value(-100)
).current
  const [checkIn, setCheckIn] = useState(new Date())
  const [checkOut, setCheckOut] = useState(new Date())

const [showCheckInPicker, setShowCheckInPicker] = useState(false)
const [showCheckOutPicker, setShowCheckOutPicker] = useState(false)

  const handleSubmit = async () => {

  if (
    !employeeName ||
    !checkIn ||
    !checkOut ||
    !workDone
  ) {
    alert('Please fill all fields')
    return
  }

  try {

    await API.post('/work', {
      employeeName,
      checkIn,
      checkOut,
      workDone,
    })

    setShowSuccess(true)

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()

    setTimeout(() => {

      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }).start()

   setTimeout(() => {

  setShowSuccess(false)

  router.replace('/home')

}, 500)

    }, 2500)

  } catch (error: any) {

    alert(
      error.response?.data?.message ||
      'Failed to save report'
    )
  }
}

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
<StatusBar
  barStyle="dark-content"
  
/>
{
  showSuccess && (

    <Animated.View
      style={[
        styles.successBox,
        {
          transform: [
            { translateY: slideAnim }
          ]
        }
      ]}
    >

      <Ionicons
        name="checkmark-circle"
        size={24}
        color="#fff"
      />

      <Text style={styles.successText}>
        Attendance Submitted Successfully
      </Text>

    </Animated.View>

  )
}

      {/* Header */}
      <View style={styles.header}>

        <View>

          <Text style={styles.heading}>
            Attendance
          </Text>

          <Text style={styles.subHeading}>
            Fill daily attendance details
          </Text>

        </View>

        <View style={styles.headerIcon}>

          <Entypo
            name="calendar"
            size={28}
            color={Colors.white}
          />

        </View>

      </View>

      {/* Form Card */}
      <View style={styles.card}>

        {/* Employee Name */}
        <Text style={styles.label}>
          Employee Name
        </Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="person-outline"
            size={20}
            color={Colors.gray}
          />

          <TextInput
            placeholder="Enter employee name"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            value={employeeName}
            onChangeText={setEmployeeName}
          />

        </View>

       {/* Check In */}
<Text style={styles.label}>
  Check In Time
</Text>

<TouchableOpacity
  style={styles.inputContainer}
  onPress={() => setShowCheckInPicker(true)}
>

  <Ionicons
    name="time-outline"
    size={20}
    color={Colors.gray}
  />

  <Text style={styles.timeText}>
    {checkIn.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}
  </Text>

</TouchableOpacity>

{
  showCheckInPicker && (
    <DateTimePicker
      value={checkIn}
      mode="time"
      is24Hour={false}
      display="default"
      onChange={(event, selectedDate) => {

        setShowCheckInPicker(false)

        if (selectedDate) {
          setCheckIn(selectedDate)
        }

      }}
    />
  )
}

       {/* Check Out */}
<Text style={styles.label}>
  Check Out Time
</Text>

<TouchableOpacity
  style={styles.inputContainer}
  onPress={() => setShowCheckOutPicker(true)}
>

  <Ionicons
    name="time-outline"
    size={20}
    color={Colors.gray}
  />

  <Text style={styles.timeText}>
    {checkOut.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}
  </Text>

</TouchableOpacity>

{
  showCheckOutPicker && (
    <DateTimePicker
      value={checkOut}
      mode="time"
      is24Hour={false}
      display="default"
      onChange={(event, selectedDate) => {

        setShowCheckOutPicker(false)

        if (selectedDate) {
          setCheckOut(selectedDate)
        }

      }}
    />
  )
}
        </View>

        {/* Work Done */}
        <Text style={styles.label}>
          Work Done Today
        </Text>

  <TextInput
  placeholder="Describe today's work..."
  placeholderTextColor={Colors.gray}

  multiline

  numberOfLines={6}

  maxLength={100}

  textAlignVertical="top"

  style={styles.textArea}

  value={workDone}

  onChangeText={setWorkDone}
/>

<Text style={styles.charCount}>
  {workDone.length}/100 Characters
</Text>

        {/* Submit */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >

          <Ionicons
            name="checkmark-circle"
            size={22}
            color={Colors.white}
          />

          <Text style={styles.buttonText}>
            Submit Attendance
          </Text>

        </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.black,
  },

  subHeading: {
    color: Colors.gray,
    marginTop: 5,
    fontSize: 15,
  },

  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    padding: 22,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
    marginTop: 5,
  },

  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: Colors.background,
  borderRadius: 15,
  paddingHorizontal: 15,
  height: 60,
  marginBottom: 18,
},

  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: Colors.black,
    marginLeft: 10,
  },

textArea: {
  backgroundColor: Colors.white,

  borderRadius: 16,

  padding: 15,

  minHeight: 140,

  fontSize: 16,

  color: Colors.black,

  textAlignVertical: 'top',

},
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  successBox: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    zIndex: 1,
  },

  successText: {
    color: Colors.white,
    fontSize: 15,
    marginLeft: 10,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
  marginLeft: 12,
  fontSize: 16,
  color: Colors.black,
  fontWeight: '600',
},
charCount: {
  textAlign: 'right',
  color: Colors.gray,
  marginTop: -15,
  marginBottom: 20,
  fontSize: 13,
},

})