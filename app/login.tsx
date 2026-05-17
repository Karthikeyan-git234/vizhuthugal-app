import {
  Entypo,
  Ionicons,
} from '@expo/vector-icons'

import API from '../services/api'

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

import {
  router,
} from 'expo-router'

import {
  useState,
} from 'react'

export default function LoginScreen() {

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  // =====================================
  // LOGIN
  // =====================================

 const handleLogin =
  async () => {

    // Empty Validation

    if (
      !email ||
      !password
    ) {

      Alert.alert(
        'Missing Fields',
        'Enter email and password'
      )

      return
    }

    // Email Validation

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !emailRegex.test(email)
    ) {

      Alert.alert(
        'Invalid Email',
        'Enter valid email address'
      )

      return
    }

    // Password Validation

    if (
      password.length < 6
    ) {

      Alert.alert(
        'Invalid Password',
        'Password must be minimum 6 characters'
      )

      return
    }

    setLoading(true)

    try {

      console.log(
        'LOGIN API:',
        'https://vizhuthugal-backend-3jmj.onrender.com/api/auth/login'
      )

      const res =
        await API.post(

          '/auth/login',

          {
            email:
              email.trim(),

            password:
              password.trim(),
          }

        )

      console.log(
        'LOGIN SUCCESS:',
        res.data
      )

      setLoading(false)

      Alert.alert(
        'Success',
        res.data.message
      )

      router.replace(
        '/home'
      )

    } catch (error: any) {

      console.log(
        'FULL LOGIN ERROR:',
        error
      )

      console.log(
        'ERROR RESPONSE:',
        error.response?.data
      )

      console.log(
        'ERROR MESSAGE:',
        error.message
      )

      setLoading(false)

      Alert.alert(

        'Login Failed',

        error.response?.data
          ?.message ||

        error.message ||

        'Something went wrong'

      )
    }
  }

  // =====================================
  // FORGOT PASSWORD
  // =====================================

  const handleForgotPassword =
    () => {

      router.push(
        '/forgot-password'
      )
    }

  // =====================================
  // REGISTER
  // =====================================

  const handleRegister =
    () => {

      router.push(
        '/register'
      )
    }

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.secondary
        }
      />

      {/* Top Section */}

      <View
        style={
          styles.topSection
        }
      >

        <View
          style={
            styles.logoBox
          }
        >

          <Ionicons
            name="person-circle"
            size={60}
            color={
              Colors.white
            }
          />

        </View>

        <Text
          style={
            styles.welcome
          }
        >

          Welcome Back

        </Text>

        <Text
          style={
            styles.subtitle
          }
        >

          Login to continue your account

        </Text>

      </View>

      {/* Login Card */}

      <View style={styles.card}>

        {/* Email */}

        <Text style={styles.label}>

          Email Address

        </Text>

        <View
          style={
            styles.inputContainer
          }
        >

          <Ionicons
            name="mail-outline"
            size={20}
            color={
              Colors.gray
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

        </View>

        {/* Password */}

        <Text style={styles.label}>

          Password

        </Text>

        <View
          style={
            styles.passwordContainer
          }
        >

          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={
              Colors.gray
            }
          />

          <TextInput
            style={
              styles.passwordInput
            }
            placeholder="Enter your password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={
              !showPassword
            }
            value={password}
            onChangeText={
              setPassword
            }
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            <Ionicons
              name={
                showPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={22}
              color={
                Colors.gray
              }
            />

          </TouchableOpacity>

        </View>

        {/* Forgot Password */}

        <TouchableOpacity
          onPress={
            handleForgotPassword
          }
        >

          <Text
            style={
              styles.forgot
            }
          >

            Forgot password?

          </Text>

        </TouchableOpacity>

        {/* Login Button */}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >

          {
            loading ? (

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

                <Text
                  style={
                    styles.buttonText
                  }
                >

                  Login

                </Text>

              </>

            )
          }

        </TouchableOpacity>

        {/* Register */}

        <TouchableOpacity
          onPress={
            handleRegister
          }
        >

          <Text
            style={
              styles.register
            }
          >

            Don't have an account?

            <Text
              style={
                styles.registerNow
              }
            >

              {' '}
              Register now

            </Text>

          </Text>

        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles =
  StyleSheet.create({

    container: {

      flex: 1,

      backgroundColor:
        Colors.secondary,

      justifyContent:
        'center',

      paddingHorizontal: 20,

    },

    topSection: {

      alignItems: 'center',

      marginBottom: 35,

    },

    logoBox: {

      width: 90,

      height: 90,

      borderRadius: 30,

      backgroundColor:
        'rgba(255,255,255,0.12)',

      justifyContent:
        'center',

      alignItems: 'center',

      marginBottom: 20,

    },

    welcome: {

      color: Colors.white,

      fontSize: 34,

      fontWeight: 'bold',

      textAlign: 'center',

    },

    subtitle: {

      color: '#dbeafe',

      fontSize: 15,

      marginTop: 8,

    },

    card: {

      backgroundColor:
        Colors.white,

      borderRadius: 30,

      padding: 24,

      shadowColor: '#000',

      shadowOffset: {

        width: 0,

        height: 8,

      },

      shadowOpacity: 0.08,

      shadowRadius: 10,

      elevation: 5,

    },

    label: {

      fontSize: 15,

      fontWeight: '700',

      color: Colors.black,

      marginBottom: 10,

      marginTop: 5,

    },

    inputContainer: {

      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        '#f8fafc',

      borderRadius: 16,

      paddingHorizontal: 16,

      borderWidth: 1,

      borderColor: '#e2e8f0',

      marginBottom: 18,

      height: 58,

    },

    input: {

      flex: 1,

      marginLeft: 12,

      fontSize: 16,

      color: Colors.black,

    },

    passwordContainer: {

      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor:
        '#f8fafc',

      borderRadius: 16,

      paddingHorizontal: 16,

      borderWidth: 1,

      borderColor: '#e2e8f0',

      marginBottom: 18,

      height: 58,

    },

    passwordInput: {

      flex: 1,

      marginLeft: 12,

      fontSize: 16,

      color: Colors.black,

    },

    forgot: {

      textAlign: 'right',

      color: Colors.primary,

      fontWeight: '700',

      marginBottom: 25,

    },

    button: {

      backgroundColor:
        Colors.primary,

      height: 58,

      borderRadius: 18,

      alignItems: 'center',

      justifyContent:
        'center',

      flexDirection: 'row',

      gap: 10,

      shadowColor:
        Colors.primary,

      shadowOffset: {

        width: 0,

        height: 5,

      },

      shadowOpacity: 0.25,

      shadowRadius: 8,

      elevation: 6,

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

  })