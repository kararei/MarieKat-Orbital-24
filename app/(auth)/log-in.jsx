import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Layout from './_layout';

const LoginScreen = () => {
  return (
    <Layout>
      <Image source={require('/Users/kararei/MarieKat/assets/images/katm-removebg-preview.png')} style={styles.catIcon} />
      <Text style={styles.title}>MarieKat</Text>
      <TextInput style={styles.input} placeholder="Username or Email" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} placeholderTextColor="#aaa" />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or log in with</Text>
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={24} color="black" />
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't you have an account? <Text style={styles.signUpLink}>Sign up</Text>
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  catIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#007BFF',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#C2185B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginBottom: 20,
    color: '#aaa',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#555',
  },
  signUpText: {
    color: '#aaa',
  },
  signUpLink: {
    color: '#FF9800',
  },
});

export default LoginScreen;