import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function ForgotPassword() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const [email, setEmail] = useState('');

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Please enter your email to reset password');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password reset email sent');
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert('Error:', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>MarieKat</Text>
      <StatusBar style="auto" />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <FontAwesome name="envelope" size={24} color="gray" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        
        <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.backToLoginText}>
        Remembered your password?{' '}
        <Link href="/(auth)/log-in" style={styles.backToLoginLink}>Log in</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff9f2', // Match the background color of the home page
    padding: 16,
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
    color: 'black',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8d2e2', // Match the input background color with home page sections
    borderRadius: 50,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  resetButton: {
    backgroundColor: '#800000', // Match the button color
    borderRadius: 50,
    paddingVertical: 12,
    marginBottom: 12,
  },
  resetButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  backToLoginText: {
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },
  backToLoginLink: {
    color: '#ff8c00',
    fontFamily: 'Poppins-SemiBold',
  },
});
