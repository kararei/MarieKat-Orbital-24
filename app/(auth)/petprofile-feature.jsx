import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const firebaseConfig = {
  apiKey: "AIzaSyDzZEvYjyr3jA4eAoz2UCyG0xAYIt3o0fw",
  authDomain: "mariekat-a7cbd.firebaseapp.com",
  projectId: "mariekat-a7cbd",
  storageBucket: "mariekat-a7cbd.appspot.com",
  messagingSenderId: "956490826711",
  appId: "1:956490826711:web:deb1d1e869934e20a64192",
  measurementId: "G-L3YMD3WLND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
export default function CreatePetProfile() {
  const [name, setName] = useState('');
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const handleEnter = async () => {
    const petProfileData = { name, petType, age, bio, socialMedia };

    try {
      const docRef = await addDoc(collection(db, 'pets'), petProfileData);
      console.log("Pet profile document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding pet profile document: ", e);
    }
  };


  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Create Pet Profile</Text>
      <StatusBar style="auto" />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <FontAwesome name="user" size={24} color="gray" />
          <TextInput
            placeholder="Pet Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="paw" size={24} color="gray" />
          <TextInput
            placeholder="Type of Pet"
            value={petType}
            onChangeText={setPetType}
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
          <FontAwesome name="info-circle" size={24} color="gray" />
          <TextInput
            placeholder="Bio/About Your Pet"
            value={bio}
            onChangeText={setBio}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <FontAwesome name="instagram" size={24} color="gray" />
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
