import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db, firebaseConfig } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default function Login() {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const navigation = useNavigation(); 

  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  const handleLogin = async () => {
    try {
      // Query Firestore to get the user document with the given username
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        Alert.alert('Error', 'User not found');
        return;
      }
  
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
  
      // Now use the email from the user document to sign in
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, password);
      const user = userCredential.user;
      Alert.alert('User logged in successfully');
      console.log('User logged in:', user);
      navigation.navigate('Home');
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert('Error!', errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      Alert.alert('User logged in with Google successfully');
      console.log('User logged in:', user);
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert('Error:', errorMessage);
    }
  };

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
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <FontAwesome name="lock" size={24} color="gray" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Ionicons name="eye" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.forgotPassword} onPress={handlePasswordReset}>Forgot Password?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or log in with</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <FontAwesome name="google" size={24} color="gray" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Link href="/(auth)/sign-up" style={styles.signupLink}>Sign up</Link>
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
  forgotPassword: {
    textAlign: 'right',
    color: '#757575',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#800000',
    borderRadius: 50,
    paddingVertical: 12,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
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
  signupText: {
    color: '#757575',
  },
  signupLink: {
    color: '#ff8c00',
  },
});
