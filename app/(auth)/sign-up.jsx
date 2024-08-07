import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Username already exists', 'Please choose a different username');
        return;
      }

      //unique username check
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        uid: user.uid,
      });

      Alert.alert('User registered successfully');
      console.log('User registered:', user);
      navigation.goBack();

    } catch (error) {
      const errorMessage = error.message;
      Alert.alert('Error:', errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user data to Firestore if it's a new user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          username: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      }

      Alert.alert('User logged in with Google successfully');
      console.log('User logged in:', user);
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
          <FontAwesome name="envelope" size={24} color="gray" />
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
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

        <View style={styles.inputWrapper}>
          <FontAwesome name="lock" size={24} color="gray" />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Ionicons name="eye" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or Sign up with</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <FontAwesome name="google" size={24} color="gray" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.loginText}>
        Have an account?{' '}
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
    backgroundColor: '#fff9f2', // Match the background color of the home page
    paddingHorizontal: 16, // Added padding to ensure proper spacing
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 8, // Reduced margin to ensure it doesn't stick out
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
    paddingVertical: 12, // Adjust padding to match the forget password page
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 16, // Ensure the font size matches
  },
  eyeIcon: {
    padding: 8,
  },
  signUpButton: {
    backgroundColor: '#800000', // Match the button color
    borderRadius: 50,
    paddingVertical: 12, // Adjust padding to match the forget password page
    width: '100%', // Ensure button doesn't stick out
    alignSelf: 'center', // Center the button
    maxWidth: 400, // Ensure max width consistency
    marginBottom: 8,
  },
  signUpButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16, // Ensure the font size matches
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  separatorText: {
    marginHorizontal: 8,
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12, // Adjust padding to match the forget password page
    width: '100%', // Ensure button doesn't stick out
    alignSelf: 'center', // Center the button
    maxWidth: 400, // Ensure max width consistency
    marginBottom: 16,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    color: '#757575',
    fontFamily: 'Poppins-Regular',
    fontSize: 16, // Ensure the font size matches
  },
  loginText: {
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    color: '#ff8c00',
    fontFamily: 'Poppins-SemiBold',
  },
});
