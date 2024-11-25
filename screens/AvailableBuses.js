import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Title, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AvailableBuses = ({ route, navigation }) => {
  const { buses } = route.params;

  // State to track ticket counts for each bus
  const [ticketCounts, setTicketCounts] = useState(
    buses.reduce((acc, bus) => {
      acc[bus.id] = 1; // Default ticket count for each bus is 1
      return acc;
    }, {})
  );

  const [userId, setUserId] = useState(null); // State for userId

  useEffect(() => {
    // Fetch the userId from AsyncStorage
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage', error);
      }
    };
    fetchUserId();
  }, []);

  const handleIncrease = (busId) => {
    setTicketCounts((prev) => ({
      ...prev,
      [busId]: prev[busId] + 1,
    }));
  };

  const handleDecrease = (busId) => {
    setTicketCounts((prev) => ({
      ...prev,
      [busId]: prev[busId] > 1 ? prev[busId] - 1 : 1, // Ensure count doesn't go below 1
    }));
  };

  const handleBookNow = (bus) => {
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }
  
    const payload = {
      busId: Number(bus.id), // Ensure it's a number
      tickets: Number(ticketCounts[bus.id]), // Ensure it's a number
      userId: Number(userId), // Ensure it's a number
      date: new Date().toISOString().split('T')[0], // Current date
    };
  
    fetch('http://192.168.235.158:8080/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          alert(data.message);
          navigation.navigate('Confirmation', { bookingDetails: data.bookingDetails });
        } else {
          alert(data.message);
        }
      })
      .catch((error) => alert('Network Error: ' + error.message));
  };
  
  

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Available Buses</Title>
      <ScrollView>
        {buses.map((bus) => (
          <Card key={bus.id} style={styles.card}>
            <Card.Title title={bus.name} subtitle={`Price: $${bus.price}`} />
            <Card.Content>
              <Text>Departure: {bus.departure}</Text>
              <Text>Arrival: {bus.arrival}</Text>
              <Text>Available Seats: {bus.availableSeats}</Text>

              {/* Ticket count controls */}
              <View style={styles.ticketCounter}>
                <Text style={styles.ticketLabel}>Tickets:</Text>
                <IconButton
                  icon="minus"
                  size={20}
                  onPress={() => handleDecrease(bus.id)}
                  disabled={ticketCounts[bus.id] === 1}
                />
                <Text style={styles.ticketCount}>{ticketCounts[bus.id]}</Text>
                <IconButton
                  icon="plus"
                  size={20}
                  onPress={() => handleIncrease(bus.id)}
                />
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => handleBookNow(bus)}>
                Book Now
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
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
  card: {
    marginBottom: 20,
  },
  ticketCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ticketLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  ticketCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default AvailableBuses;
