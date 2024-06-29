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
        resetButton: {
          backgroundColor: '#800000',
          borderRadius: 50,
          paddingVertical: 12,
          marginBottom: 16,
        },
        resetButtonText: {
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins-SemiBold',
        },
        backToLoginText: {
          color: '#757575',
        },
        backToLoginLink: {
          color: '#ff8c00',
        },
      });
      
    
    