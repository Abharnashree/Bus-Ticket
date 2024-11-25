import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import Notification from '../components/Notifications/Notification.js'; // Import Notification component

const Home = () => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleFindBuses = () => {
    if (startPoint && endPoint) {
      alert(`Finding buses from ${startPoint} to ${endPoint}`);
    } else {
      alert('Please select both start and end points');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        {showNotifications ? 'Notifications' : 'Find Buses'}
      </Title>

      {showNotifications ? (
        <Notification />
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            label="Start Point"
            value={startPoint}
            onChangeText={(text) => setStartPoint(text)}
            style={styles.input}
          />
          <TextInput
            label="Destination Point"
            value={endPoint}
            onChangeText={(text) => setEndPoint(text)}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleFindBuses} style={styles.button}>
            Find Buses
          </Button>
        </View>
      )}

      <Button
        mode="outlined"
        onPress={() => setShowNotifications(!showNotifications)} // Toggle between views
        style={styles.toggleButton}
      >
        {showNotifications ? 'Back to Find Buses' : 'Go to Notifications'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  toggleButton: {
    marginTop: 10,
  },
});

export default Home;
