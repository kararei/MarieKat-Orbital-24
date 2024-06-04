import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Layout from './_layout';

const SignUpScreen = () => {
  return (
    <Layout>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} placeholderTextColor="#aaa" />
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink}>Log in</Text>
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: 'CustomFont',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#C2185B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#aaa',
  },
  loginLink: {
    color: '#FF9800',
  },
});

export default SignUpScreen;