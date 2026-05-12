import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native'

import { useState } from 'react'
import Colors from '../constants/colors'

export default function ForgotPasswordScreen() {

  const [email, setEmail] = useState('')

  const handleReset = () => {
    alert('Password Reset Link Sent 🚀')
  }

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" />

      <View style={styles.topSection}>

        <Text style={styles.welcome}>
          Forgot Password 🔐
        </Text>

        <Text style={styles.subtitle}>
          Reset your password
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>
            Send Reset Link
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
  },

  topSection: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },

  welcome: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#dbeafe',
    fontSize: 16,
    marginTop: 8,
  },

  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },

  input: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    fontSize: 16,
    color: Colors.black,
  },

  button: {
    backgroundColor: Colors.danger,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

})