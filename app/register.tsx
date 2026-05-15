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

import {
  useState,
} from 'react'

import {
  router,
} from 'expo-router'

import {
  Ionicons,
  Entypo,
} from '@expo/vector-icons'

import Toast from 'react-native-toast-message'

import Colors from '../constants/colors'

export default function RegisterScreen() {

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  // =====================================
  // REGISTER
  // =====================================

  const handleRegister =
    async () => {

      // Name Validation

      if (
        name.trim().length < 3
      ) {

        Alert.alert(

          'Invalid Name',

          'Name must be minimum 3 characters'

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
        password.length < 8
      ) {

        Alert.alert(

          'Weak Password',

          'Password must be minimum 8 characters'

        )

        return
      }

      try {

        setLoading(true)

        // API Call

        const res =
          await API.post(

            '/auth/register',

            {
              name,
              email,
              password,
            }

          )

        setLoading(false)

        // Success Toast

        Toast.show({

          type: 'success',

          text1:
            'Registration Successful 🎉',

          text2:
            'Account created successfully',

          visibilityTime: 2500,

        })

        // Navigate

        setTimeout(() => {

          router.replace(
            '/login'
          )

        }, 2500)

      } catch (error: any) {

        setLoading(false)

        Alert.alert(

          'Registration Failed',

          error.response?.data
            ?.message ||

          'Something went wrong'

        )
      }
    }

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.secondary
        }
      />

      {/* Header */}

      <View style={styles.topSection}>

        {/* Logo */}

        <View style={styles.logoBox}>

          <Ionicons
            name="person-add"
            size={55}
            color={
              Colors.white
            }
          />

        </View>

        <Text style={styles.welcome}>

          Create Account

        </Text>

        <Text style={styles.subtitle}>

          Register to continue your journey

        </Text>

      </View>

      {/* Card */}

      <View style={styles.card}>

        {/* Full Name */}

        <Text style={styles.label}>

          Full Name

        </Text>

        <View
          style={
            styles.inputContainer
          }
        >

          <Ionicons
            name="person-outline"
            size={20}
            color={
              Colors.gray
            }
          />

          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

        </View>

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
            placeholder="Enter your email"
            placeholderTextColor="#94a3b8"
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
            placeholder="Enter your password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={
              !showPassword
            }
            style={
              styles.passwordInput
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

        {/* Register Button */}

        <TouchableOpacity

          style={styles.button}

          onPress={
            handleRegister
          }

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

                  Register

                </Text>

              </>

            )
          }

        </TouchableOpacity>

        {/* Login */}

        <TouchableOpacity
          onPress={() =>
            router.push(
              '/login'
            )
          }
        >

          <Text
            style={
              styles.loginText
            }
          >

            Already have an account?

            <Text
              style={
                styles.loginLink
              }
            >

              {' '}
              Login

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

      marginBottom: 35,

      alignItems: 'center',

    },

    logoBox: {

      width: 95,

      height: 95,

      borderRadius: 30,

      backgroundColor:
        'rgba(255,255,255,0.12)',

      justifyContent:
        'center',

      alignItems: 'center',

      marginBottom: 22,

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

      marginBottom: 22,

      height: 58,

    },

    passwordInput: {

      flex: 1,

      marginLeft: 12,

      fontSize: 16,

      color: Colors.black,

    },

    button: {

      backgroundColor:
        Colors.success,

      height: 58,

      borderRadius: 18,

      alignItems: 'center',

      justifyContent:
        'center',

      flexDirection: 'row',

      gap: 10,

      shadowColor:
        Colors.success,

      shadowOffset: {

        width: 0,

        height: 5,

      },

      shadowOpacity: 0.3,

      shadowRadius: 8,

      elevation: 6,

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