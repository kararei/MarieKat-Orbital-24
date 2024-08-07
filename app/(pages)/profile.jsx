import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { db, auth } from '../firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const initialLayout = { width: Dimensions.get('window').width };

const PersonalProfile = () => {
  const navigation = useNavigation(); 
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    cityCountry: '',
    bio: '',
    socialMedia: '',
    image: null
  });

  const userId = auth.currentUser.uid;
  const profileRef = doc(db, 'profile', userId);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docSnap = await getDoc(profileRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Profile</Text>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarIcon}>👤</Text>
          )}
          <Text style={styles.addIcon}>+</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.placeholderText}>
            Hi! My name is <Text style={styles.placeholder}>{profile.name || '<Name>'}</Text>. I am <Text style={styles.placeholder}>{profile.age || '<Age>'}</Text> this year. I am from <Text style={styles.placeholder}>{profile.cityCountry || '<City/Country>'}</Text>.
          </Text>

          <Text style={styles.placeholderText}><Text style={styles.placeholder}>{profile.bio || '<Bio/About me>'}</Text></Text>

          {profile.socialMedia ? (
            <>
              <Text style={styles.placeholderText}>Here are my socials!</Text>
              <Text style={styles.placeholderText}><Text style={styles.placeholder}>{profile.socialMedia}</Text></Text>
            </>
          ) : null}
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}
        onPress={() => navigation.navigate('PersonalProfileFeature')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const PetsProfile = () => {
  const [pets, setPets] = useState([]);
  const userId = auth.currentUser.uid;
  const navigation = useNavigation(); 

  const petsCollectionRef = collection(db, 'users', userId, 'pets');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const querySnapshot = await getDocs(petsCollectionRef);
        const petsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPets(petsList);
      } catch (error) {
        console.error("Error fetching pet profiles: ", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Pet Profile(s)</Text>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      {pets.length > 0 ? (
        pets.map((pet, index) => (
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
            <TouchableOpacity style={styles.editButton}
              onPress={() => navigation.navigate('editPetProfile', { petId: pet.id })}>
              <Text style={styles.editButtonText}>Edit Pet</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noPetsText}>No pets found. Add a pet profile to see it here.</Text>
      )}

      <TouchableOpacity style={styles.editButton}
        onPress={() => navigation.navigate('PetProfileFeature')}>
        <Text style={styles.editButtonText}>Add Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ProfilePage = () => {
  const navigation = useNavigation(); 
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'personal', title: 'Personal' },
    { key: 'pets', title: 'Pets' },
  ]);

  const renderScene = SceneMap({
    personal: PersonalProfile,
    pets: PetsProfile,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} />}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}
          onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Calendar')}>
          <Ionicons name="calendar" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}>
          <Ionicons name="person" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f2',
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
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addIcon: {
    fontSize: 24,
    marginLeft: 10,
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
  editButton: {
    backgroundColor: '#f8d2e2',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  noPetsText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
    textAlign: 'center',
    margin: 16,
  },
  tabBar: {
    backgroundColor: '#f8d2e2',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff9f2',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default ProfilePage;
