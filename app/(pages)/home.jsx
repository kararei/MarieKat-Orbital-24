import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function Home() {
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

          