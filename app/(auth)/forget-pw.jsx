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
              <FontAwesome name="user" size={24} color="gray" />
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
            <Link href="/(auth)/login" style={styles.backToLoginLink}>Log in</Link>
          </Text>
        </View>
      );
    }
    
    