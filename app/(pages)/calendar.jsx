import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function CalendarPage() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

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

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const filtered = tasks.filter(task => task.date === day.dateString);
    setFilteredTasks(filtered);
  };

  const handleAddTask = () => {
    navigation.navigate('AddTask');
  };

  const markedDates = tasks.reduce((acc, task) => {
    acc[task.date] = { marked: true, dotColor: 'darkred' };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = { ...markedDates[selectedDate], selected: true, selectedColor: 'darkred' };
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />

        <View style={styles.addTaskContainer}>
          <Text style={styles.addTaskText}>Click "+" to add a new task.</Text>
        </View>

        {filteredTasks.length > 0 && (
          <View style={styles.tasksContainer}>
            <Text style={styles.tasksTitle}>Tasks for {selectedDate}:</Text>
            {filteredTasks.map(task => (
              <View key={task.id} style={styles.taskItem}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text>{task.description}</Text>
                {!task.allDay && <Text>{task.time}</Text>}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
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
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
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
    backgroundColor: 'darkred',
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
  tasksContainer: {
    marginTop: 20,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
