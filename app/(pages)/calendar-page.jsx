import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarPage() {
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
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
        />

        <View style={styles.addTaskContainer}>
          <Text style={styles.addTaskText}>Click "+" to create a new task.</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="calendar" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color="black" />
            </TouchableOpacity>
        </View>
      </View>
  );
}
