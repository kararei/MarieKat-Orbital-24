import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import moment from 'moment';

export default function Home() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });
  const [tasks, setTasks] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      });
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      const upcomingTasks = sortedTasks.slice(0, 5);
      setNextEvents(upcomingTasks);
    }
  }, [tasks]);

  if (!fontsLoaded) {
    return null; // or a loading spinner or something
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MarieKat</Text>
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
            {nextEvents.length > 0 ? (
              nextEvents.map((event) => (
                <View key={event.id} style={styles.taskItem}>
                  <Text style={styles.taskTitle}>{event.title}</Text>
                  <Text>{event.description}</Text>
                  <Text>{moment(event.date).format('MMMM Do, YYYY')}</Text>
                  {!event.allDay && <Text>{event.time}</Text>}
                </View>
              ))
            ) : (
              <Text style={styles.placeholderText}>No upcoming events scheduled.</Text>
            )}
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
  taskItem: {
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
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
