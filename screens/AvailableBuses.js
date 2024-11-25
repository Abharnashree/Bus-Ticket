import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Title, IconButton } from 'react-native-paper';

const AvailableBuses = ({ route, navigation }) => {
  const { buses } = route.params;

  // State to track ticket counts for each bus
  const [ticketCounts, setTicketCounts] = useState(
    buses.reduce((acc, bus) => {
      acc[bus.id] = 1; // Default ticket count for each bus is 1
      return acc;
    }, {})
  );

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
    // Pass ticket count along with bus details
    navigation.navigate('Confirmation', { bus, tickets: ticketCounts[bus.id] });
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
