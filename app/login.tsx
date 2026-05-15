import { Entypo, Ionicons } from '@expo/vector-icons'
import API from '../services/api';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity, 
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native'

import Colors from '../constants/colors'
import { router } from 'expo-router'
import { useState } from 'react'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

const handleLogin = async () => {

  // Empty validation

  if (!email || !password) {

    Alert.alert(
      'Missing Fields',
      'Enter email and password'
    )

    return
  }

  // Demo Login

  if (
    email ===
      'resource@gmail.com' &&

    password === 'Resource1'
  ) {

    Alert.alert(
      'Login Success',
      'Welcome Resource User'
    )

    router.replace('/home')

    return
  }

  // Email validation

  if (!email.includes('@gmail.com')) {

    Alert.alert(
      'Invalid Email',
      'Enter valid Gmail address'
    )

    return
  }

  // Password validation

  if (password.length < 8) {

    Alert.alert(
      'Invalid Password',
      'Password must be minimum 8 characters'
    )

    return
  }

  try {

    setLoading(true)

    // API call

    const res = await API.post(
      '/auth/login',
      {
        email,
        password,
      }
    )

    setLoading(false)

    Alert.alert(
      'Success',
      res.data.message
    )

    router.replace('/home')

  } catch (error: any) {

    setLoading(false)

    if (
      error.response?.data
        ?.message ===
      'User not found'
    ) {

      Alert.alert(
        'User Not Found',
        'Please register first',
        [
          {
            text: 'Register',

            onPress: () =>
              router.push(
                '/register'
              ),
          },
        ]
      )

    } else {

      Alert.alert(
        'Login Failed',

        error.response?.data
          ?.message ||
          'Something went wrong'
      )
    }
  }
};

  // Forgot password navigation
  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  // Register navigation
  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.secondary}
      />

      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.welcome}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>
      </View>

      {/* Login Card */}
      <View style={styles.card}>
        {/* Email */}
        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!showPassword}
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

{/* Demo Credentials */}

<View style={styles.demoBox}>
  
  <Text style={styles.demoTitle}>
    Demo Login
  </Text>

  <Text style={styles.demoText}>
    Email: resource@gmail.com
  </Text>

  <Text style={styles.demoText}>
    Password: Resource1
  </Text>

</View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgot}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              color="#fff"
              size="small"
            />
          ) : (
            <>
              <Entypo
                name="login"
                size={22}
                color="#fff"
              />

              <Text style={styles.buttonText}>
                Login
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Register */}
        <TouchableOpacity
          onPress={handleRegister}
        >
          <Text style={styles.register}>
            Don't have an account?
            <Text style={styles.registerNow}>
              {' '}
              Register now
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
  },

  topSection: {
    paddingHorizontal: 25,
    marginBottom: 30,
    alignItems: 'center',
  },

  welcome: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
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

  passwordContainer: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.black,
  },

  forgot: {
    textAlign: 'right',
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 25,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
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

  register: {
    textAlign: 'center',
    marginTop: 25,
    color: Colors.gray,
    fontSize: 15,
  },

  registerNow: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  demoBox: {
  backgroundColor: '#eff6ff',

  padding: 14,

  borderRadius: 14,

  marginBottom: 18,

  borderWidth: 1,

  borderColor: '#bfdbfe',
},

demoTitle: {
  fontSize: 15,

  fontWeight: 'bold',

  color: Colors.primary,

  marginBottom: 6,
},

demoText: {
  fontSize: 14,

  color: Colors.black,
},
})