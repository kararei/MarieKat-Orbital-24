import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileCreationPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>
          Profile
        </Text>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarIcon}>👤</Text>
          <Text style={styles.addIcon}>+</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.placeholderText}>Hi! My name is <Text style={styles.placeholder}>&lt;Name&gt;</Text>. I am <Text style={styles.placeholder}>&lt;Age&gt;</Text> this year. I am from <Text style={styles.placeholder}>&lt;City/Country&gt;</Text>.</Text>

          <Text style={styles.placeholderText}><Text style={styles.placeholder}>&lt;Bio/About me&gt;</Text></Text>

          <Text style={styles.placeholderText}>Here are my socials!</Text>
          <Text style={styles.placeholderText}><Text style={styles.placeholder}>&lt;Social media&gt;</Text></Text>
        </View>
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
    color: '#888888',
  },
});

export default ProfileCreationPage;
