import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

export default function OtherProfilePage() {
  const route = useRoute();
  const { userId } = route.params;
  const [userProfile, setUserProfile] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [isLoadingProfile, setLoadingProfile] = useState(true);
  const [isLoadingPets, setLoadingPets] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      const userDocRef = doc(db, 'profile', userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserPets = useCallback(async () => {
    try {
      const petsCollectionRef = collection(db, 'users', userId, 'pets');
      const querySnapshot = await getDocs(petsCollectionRef);
      const petsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserPets(petsList);
    } catch (error) {
      console.error('Error fetching user pets:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      fetchUserPets();
    }
  }, [userId, fetchUserProfile, fetchUserPets]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text>No profile found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>User Profile</Text>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          {userProfile.image ? (
            <Image source={{ uri: userProfile.image }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarIcon}>👤</Text>
          )}
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.placeholderText}>
            Hi! My name is <Text style={styles.placeholder}>{userProfile.name || '<Name>'}</Text>. I am <Text style={styles.placeholder}>{userProfile.age || '<Age>'}</Text> this year. I am from <Text style={styles.placeholder}>{userProfile.cityCountry || '<City/Country>'}</Text>.
          </Text>

          <Text style={styles.placeholderText}><Text style={styles.placeholder}>{userProfile.bio || '<Bio/About me>'}</Text></Text>

          {userProfile.socialMedia ? (
            <>
              <Text style={styles.placeholderText}>Here are my socials!</Text>
              <Text style={styles.placeholderText}><Text style={styles.placeholder}>{userProfile.socialMedia}</Text></Text>
            </>
          ) : null}
        </View>
      </View>

      {userPets.length > 0 && (
        <View style={styles.petsContainer}>
          <Text style={styles.petsTitle}>Pet Profile(s)</Text>
          {userPets.map((pet, index) => (
            <View key={index} style={styles.profileCard}>
              <View style={styles.avatarPlaceholder}>
                {pet.image ? (
                  <Image source={{ uri: pet.image }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarIcon}>🐾</Text>
                )}
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.placeholderText}>
                  I am <Text style={styles.placeholder}>{pet.name || '<Pet Name>'}</Text>. I am <Text style={styles.placeholder}>{pet.age || '<Pet Age>'}</Text> years old.
                </Text>
                <Text style={styles.placeholderText}>A bit about me: <Text style={styles.placeholder}>{pet.bio || '<Pet Bio/About>'}</Text></Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff9f2',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  logo: {
    width: 50,
    height: 50,
    margin: 10,
  },
  profileCard: {
    backgroundColor: '#f8d2e2',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  avatarPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarIcon: {
    fontSize: 50,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },
  placeholder: {
    fontStyle: 'italic',
    color: '#555555',
  },
  petsContainer: {
    marginTop: 16,
  },
  petsTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 16,
  },
});
