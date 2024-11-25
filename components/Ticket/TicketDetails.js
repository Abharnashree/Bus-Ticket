import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

const TicketDetails = ({ route }) => {
  const { bookingDetails } = route.params; // Get booking details from params
  const { busId, departure, arrival, tickets, totalPrice } = bookingDetails || {};

  const navigation = useNavigation();

  const handleNearestStop = () => {
    navigation.navigate('NearestStop'); // Navigate to the nearest stop screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ticket Details</Text>
      <Text>Bus ID: {busId || 'Unknown'}</Text>
      <Text>Departure: {departure || 'N/A'}</Text>
      <Text>Arrival: {arrival || 'N/A'}</Text>
      <Text>Tickets: {tickets || 'N/A'}</Text>
      <Text>Total Price: ₹{totalPrice || '0.00'}</Text>
      <QRCode value={`Ticket: ${busId} - ₹${totalPrice}`} size={150} />

      <View style={styles.buttonContainer}>
        <Button title="Nearest Stop" onPress={handleNearestStop} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default TicketDetails;
