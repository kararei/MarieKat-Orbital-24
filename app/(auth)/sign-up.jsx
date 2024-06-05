import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function SignUp() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>MarieKat</Text>
      <StatusBar style="auto" />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <FontAwesome name="user" size={24} color="gray" />
          <TextInput
            placeholder="Username"
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="envelope" size={24} color="gray" />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="lock" size={24} color="gray" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Ionicons name="eye" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="lock" size={24} color="gray" />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Ionicons name="eye" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or Sign up with</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome name="google" size={24} color="gray" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.loginText}>
        Don't you have an account?{' '}
        <Link href="/(auth)/log-in" style={styles.loginLink}>Log in</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
  },
  eyeIcon: {
    padding: 8,
  },
  signUpButton: {
    backgroundColor: '#800000',
    borderRadius: 50,
    paddingVertical: 12,
    marginBottom: 16,
  },
  signUpButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  separatorText: {
    marginHorizontal: 8,
    color: '#757575',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12,
    marginBottom: 16,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    color: '#757575',
  },
  loginText: {
    color: '#757575',
  },
  loginLink: {
    color: '#ff8c00',
  },
});