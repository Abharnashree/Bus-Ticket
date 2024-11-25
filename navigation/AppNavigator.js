import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking } from 'react-native';

// Import screens
import Welcome from '../screens/Welcome';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import Home from '../screens/Home';
import AvailableBuses from '../screens/AvailableBuses';
import Confirmation from '../components/Booking/Confirmation';
import TicketDetails from '../components/Ticket/TicketDetails';
import Notification from '../components/Notifications/Notification.js';
import NearestStop from '../components/Ticket/NearestStop'; // Import NearestStop screen

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['bussy://', 'https://dombussy.com'], // Your custom scheme and domain
  config: {
    screens: {
      Welcome: '/',
      Login: '/login',
      Signup: '/signup',
      Home: '/home',
      AvailableBuses: '/buses',
      Confirmation: '/confirmation',
      TicketDetails: '/ticket-details',
      NearestStop: '/nearest-stop',
      Notifications: '/notifications',
    },
  },
};


const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200EE' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ title: 'Sign Up' }} 
        />

        {/* Main App Screens */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="AvailableBuses" 
          component={AvailableBuses} 
          options={{ title: 'Available Buses' }} 
        />
        <Stack.Screen 
          name="Confirmation" 
          component={Confirmation} 
          options={{ title: 'Booking Confirmation' }} 
        />
        <Stack.Screen 
          name="TicketDetails" 
          component={TicketDetails} 
          options={{ title: 'Your Ticket' }} 
        />
        <Stack.Screen 
          name="NearestStop" 
          component={NearestStop} 
          options={{ title: 'Nearest Stop' }} 
        />
        <Stack.Screen 
          name="Notification" 
          component={Notification} 
          options={{ title: 'Notification' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
