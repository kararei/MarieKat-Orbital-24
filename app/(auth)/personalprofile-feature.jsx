import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../hooks';

export default function NewProfile() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const { user } = useAuth(); // Custom hook to get the authenticated user

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  const handleEnter = async () => {
    try {
      // Save user profile to Firestore under the user's document
      await setDoc(doc(db, 'users', user.uid, 'profiles', name), {
        name: name,
        age: age,
        cityCountry: cityCountry,
        bio: bio,
        socialMedia: socialMedia,
      });

      Alert.alert('Profile created successfully');
      console.log('Profile created:', { name, age, cityCountry, bio, socialMedia });
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert('Error:', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Create New Profile</Text>
      <StatusBar style="auto" />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <FontAwesome name="user" size={24} color="gray" />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="birthday-cake" size={24} color="gray" />
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="map-marker" size={24} color="gray" />
          <TextInput
            placeholder="City/Country"
            value={cityCountry}
            onChangeText={setCityCountry}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="info-circle" size={24} color="gray" />
          <TextInput
            placeholder="Bio/About Me"
            value={bio}
            onChangeText={setBio}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="social-instagram" size={24} color="gray" />
          <TextInput
            placeholder="Social Media (optional)"
            value={socialMedia}
            onChangeText={setSocialMedia}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.enterButton} onPress={handleEnter}>
          <Text style={styles.enterButtonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  enterButton: {
    backgroundColor: '#800000',
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 16,
  },
  enterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});