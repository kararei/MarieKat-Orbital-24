import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './(pages)/home';
import CalendarPage from './(pages)/calendar';
import Login from './(auth)/log-in';
import SignUp from './(auth)/sign-up';
import ForgetPassword from './(auth)/forget-pw';
import PersonalProfileFeature from './(auth)/personalprofile-feature';
import PetProfileFeature from './(auth)/petprofile-feature';
import ForumPage from './(pages)/forum';
import AddTask from './(pages)/add-task';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Calendar" component={CalendarPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="PersonalProfileFeature" component={PersonalProfileFeature} />
        <Stack.Screen name="PetProfileFeature" component={PetProfileFeature} />
        <Stack.Screen name="Forum" component={ForumPage} />
        <Stack.Screen name="AddTask" component={AddTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
