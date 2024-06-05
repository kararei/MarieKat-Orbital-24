import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

const AuthLayout = () => {
  reuturn (
    <>
      <Stack>
        <Stack.Screen
          name = "log-in"
          options={{
          headerShown: false
          }}
        />
        <Stack.Screen
          name = "sign-up"
          options={{
          headerShown: false
          }}
        />
      </Stack>
    </>
  )

function AuthLayoutWrapper({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E5',
    justifyContent: 'center',
    padding: 16,
  },
}); 
}