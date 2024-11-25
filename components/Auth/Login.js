import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both fields');
    } else {
      setError(''); // Clear any previous error
      try {
        const response = await fetch('http://192.168.1.3:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Successfully logged in, navigate to the Home page
          console.log(result.message); // For debugging
          navigation.navigate('Home'); // Replace with the appropriate route after login
        } else {
          // Invalid email or password
          setError(result.message || 'Invalid email or password');
        }
      } catch (error) {
        // Handle network or server errors
        console.error('Login error:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>

      {/* Email Input */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Login Button */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Log In
      </Button>

      {/* Navigate to Sign Up */}
      <Button
        mode="text"
        onPress={() => navigation.navigate('Signup')}
        style={styles.linkButton}
      >
        Don't have an account? Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  linkButton: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
