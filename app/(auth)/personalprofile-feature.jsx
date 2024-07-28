import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function CreateProfile({ route }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Get the current user ID
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
        const docRef = doc(db, 'profile', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profileData = docSnap.data();
          setName(profileData.name || '');
          setAge(profileData.age || '');
          setCityCountry(profileData.cityCountry || '');
          setBio(profileData.bio || '');
          setSocialMedia(profileData.socialMedia || '');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleEnter = async () => {
    if (userId) {
      const profileData = { name, age, cityCountry, bio, socialMedia };

      try {
        // Update the existing profile
        const docRef = doc(db, 'profile', userId);
        await setDoc(docRef, profileData, { merge: true });
        console.log("Profile updated with ID: ", userId);
      } catch (e) {
        console.error("Error updating profile: ", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>{userId ? 'Edit Profile' : 'Create New Profile'}</Text>
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
          <FontAwesome name="instagram" size={24} color="gray" />
          <TextInput
            placeholder="Social Media (optional)"
            value={socialMedia}
            onChangeText={setSocialMedia}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.enterButton} onPress={handleEnter}>
          <Text style={styles.enterButtonText}>{userId ? 'Edit Profile' : 'Create Profile'}</Text>
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
    backgroundColor: '#fff9f2',
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
