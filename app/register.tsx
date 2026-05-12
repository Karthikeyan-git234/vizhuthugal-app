import API from '../services/api'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native'

import { useState } from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'

import Colors from '../constants/colors'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] =
    useState(false)

 const handleRegister = async () => {
  // Name Validation
  if (name.trim().length < 3) {
    Alert.alert(
      'Invalid Name',
      'Name must be minimum 3 characters'
    )
    return
  }

  // Email Validation
  if (!email.includes('@gmail.com')) {
    Alert.alert(
      'Invalid Email',
      'Enter valid Gmail address'
    )
    return
  }

  // Password Validation
  if (password.length < 8) {
    Alert.alert(
      'Weak Password',
      'Password must be minimum 8 characters'
    )
    return
  }

  try {
    setLoading(true)

    // API Call
    const res = await API.post(
      '/auth/register',
      {
        name,
        email,
        password,
      }
    )

    setLoading(false)

    Toast.show({
      type: 'success',
      text1:
        'Registration Successful 🎉',
      text2:
        'Account created successfully',
      visibilityTime: 2000,
    })

    setTimeout(() => {
      router.replace('/login')
    }, 2000)

  } catch (error: any) {
    setLoading(false)

    Alert.alert(
      'Registration Failed',
      error.response?.data?.message ||
        'Something went wrong'
    )
  }
}

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.secondary}
      />

      {/* Header */}
      <View style={styles.topSection}>
        <Text style={styles.welcome}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Register to continue
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Name */}
        <Text style={styles.label}>Full Name</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color={Colors.gray}
          />

          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={Colors.gray}
          />

          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>
          Password
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={Colors.gray}
          />

          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={22}
              color={Colors.gray}
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              color="#fff"
            />
          ) : (
            <>
              <Ionicons
                name="person-add-outline"
                size={22}
                color="#fff"
              />

              <Text style={styles.buttonText}>
                Register
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Login Navigation */}
        <TouchableOpacity
          onPress={() =>
            router.push('/login')
          }
        >
          <Text style={styles.loginText}>
            Already have an account?
            <Text style={styles.loginLink}>
              {' '}
              Login
            </Text>
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
    paddingHorizontal: 20,
  },

  topSection: {
    marginBottom: 30,
    alignItems: 'center',
  },

  welcome: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#dbeafe',
    fontSize: 16,
    marginTop: 8,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.background,

    borderRadius: 14,
    paddingHorizontal: 15,

    marginBottom: 18,
  },

  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 10,
    fontSize: 16,
    color: Colors.black,
  },

  button: {
    backgroundColor: Colors.success,

    padding: 18,
    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'row',
    gap: 8,

    marginTop: 10,

    shadowColor: Colors.success,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 25,
    color: Colors.gray,
    fontSize: 15,
  },

  loginLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
})