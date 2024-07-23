import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export default function CalendarPage() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'darkred' },
          }}
        />

        <View style={styles.addTaskContainer}>
          <Text style={styles.addTaskText}>Click "+" to add a new task.</Text>
        </View>
      </ScrollView>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        <View style={styles.bottomNav}>
            <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Home')} 
            >
            <Ionicons name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="calendar" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}
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
      padding: 16,
      backgroundColor: '#fff9f2',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    content: {
      padding: 16,
    },
    addTaskContainer: {
      alignItems: 'center',
      marginTop: 50,
    },
    addTaskText: {
      fontSize: 16,
      color: '#757575',
    },
    addButton: {
      backgroundColor: 'blue',
      borderRadius: 50,
      padding: 16,
      position: 'absolute',
      bottom: 80,
      right: 20,
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
  
