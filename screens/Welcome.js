import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Title } from 'react-native-paper';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo.png')} // Replace with your logo file
        style={styles.logo}
      />

      {/* Title and Subtitle */}
      <Title style={styles.title}>Welcome to EasyBus</Title>
      <Text style={styles.subtitle}>Book your tickets and travel hassle-free!</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          Log In
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Signup')}
          style={styles.button}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 5,
  },
});
