import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Title } from 'react-native-paper';

const Notification = () => {
  // Mock notification data
  const notifications = [
    { id: 1, message: 'Bus A is delayed by 10 minutes' },
    { id: 2, message: 'Bus B has been canceled' },
    { id: 3, message: 'New route added from City X to City Y' },
  ];

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Notifications</Title>
      <ScrollView>
        {notifications.map((notification) => (
          <Text key={notification.id} style={styles.notification}>
            {notification.message}
          </Text>
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
  notification: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Notification;
