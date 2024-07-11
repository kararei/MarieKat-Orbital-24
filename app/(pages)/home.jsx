import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner or something
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MarieKat</Text>
        <TouchableOpacity style={styles.swapPetButton}>
          <Text style={styles.swapPetText}>swap pet</Text>
          <Ionicons name="caret-down" size={16} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => navigation.navigate('Calendar')}>
            <FontAwesome name="calendar" size={24} color="black" />
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionContent}>
            <Text style={styles.placeholderText}>No upcoming events scheduled.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => navigation.navigate('Forum')}>
            <FontAwesome name="comments" size={24} color="black" />
            <Text style={styles.sectionTitle}>Community Messages</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionContent}>
            <Text style={styles.placeholderText}>No new messages.</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="red" />
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
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff9f2',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
  },
  swapPetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  swapPetText: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginRight: 4,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f8d2e2',
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
  },
  sectionContent: {
    padding: 16,
    backgroundColor: '#fff9f2',
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
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
