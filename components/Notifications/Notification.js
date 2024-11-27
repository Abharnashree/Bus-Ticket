import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title } from 'react-native-paper';

const Notification = () => {
  // Mock notification data
  const notifications = [
    { id: 1, message: 'Bus A is delayed by 10 minutes' },
    { id: 2, message: 'Bus B has been canceled' },
    { id: 3, message: 'New route added from City X to City Y' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {notifications.map((notification) => (
          <Card key={notification.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </Card.Content>
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
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginBottom: 15,
    elevation: 3, // Adds shadow effect for iOS/Android
    borderRadius: 8, // Rounds the corners of the card
    backgroundColor: '#fff', // Sets a white background for each card
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark color for title
  },
  notificationMessage: {
    fontSize: 16,
    color: '#555', // Slightly lighter color for the message text
    marginTop: 5,
  },
});

export default Notification;
