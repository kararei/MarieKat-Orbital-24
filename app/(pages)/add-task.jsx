import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Switch, Alert, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title || !date || (!allDay && !time)) {
      Alert.alert('Error', 'Please fill in all required fields (title, date, and time if not all day).');
      return;
    }

    const user = auth.currentUser;
    if (user) {
      setLoading(true);
      const task = {
        title,
        description,
        date: date.toISOString().split('T')[0],
        time: allDay ? '' : `${time.getHours()}:${time.getMinutes()}`,
        allDay,
        userId: user.uid,
      };

      try {
        await addDoc(collection(db, 'tasks'), task);
        setLoading(false);
        Alert.alert('Success', 'Task added successfully');
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } else {
      Alert.alert('Error', 'User not signed in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.label}>All Day</Text>
        <Switch value={allDay} onValueChange={setAllDay} />
      </View>

      {!allDay && (
        <>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            <Text>{time.toTimeString().slice(0, 5)}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                const currentTime = selectedTime || time;
                setShowTimePicker(false);
                setTime(currentTime);
              }}
            />
          )}
        </>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff9f2',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: 'darkred',
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddTask;
