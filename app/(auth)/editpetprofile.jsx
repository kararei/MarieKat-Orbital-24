import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

export default function EditPetProfile({ route, navigation }) {
  const { petId } = route.params;
  const userId = auth.currentUser.uid;
  const [name, setName] = useState('');
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState('');

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petDoc = await getDoc(doc(db, 'users', userId, 'pets', petId)); 
        if (petDoc.exists()) {
          const { name, petType, age, bio, socialMedia, image, gender } = petDoc.data();
          setName(name);
          setPetType(petType);
          setAge(age);
          setBio(bio);
          setSocialMedia(socialMedia);
          setImage(image);
          setGender(gender);
        } else {
          Alert.alert('Error', 'Pet not found.');
        }
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };

    fetchPetData();
  }, [petId]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    const petRef = doc(db, 'pets', petId);
    const updatedPetData = { name, petType, age, bio, socialMedia, image, gender };

    try {
      await setDoc(petRef, updatedPetData, { merge: true });
      Alert.alert('Success', 'Pet profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating pet profile:', error);
      Alert.alert('Error', 'Failed to update pet profile');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <FontAwesome name="camera" size={24} color="gray" />
        )}
      </TouchableOpacity>

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
        {/* Gender section removed */}
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
        <TouchableOpacity style={styles.enterButton} onPress={handleUpdate}>
          <Text style={styles.enterButtonText}>Update</Text>
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
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
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
