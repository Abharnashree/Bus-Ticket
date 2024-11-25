import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking } from 'react-native';

const Confirmation = ({ route, navigation }) => {
  const { bookingDetails = {} } = route.params || {};
  const { busId = 'No bus selected', totalPrice = 0, tickets = 1, departure, arrival } = bookingDetails;

  // State to enable/disable "My Ticket" button
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const handlePayNow = () => {
    const upiUrl = `upi://pay?pa=upi_id@upi&pn=Bus%20Service&mc=&tid=TXN${Date.now()}&tr=TR${Date.now()}&tn=Bus%20Ticket&am=${totalPrice}&cu=INR&url=bussy://confirmation`;

    Linking.openURL(upiUrl)
      .then(() => {
        console.log('UPI App Opened');
        setIsPaymentDone(true); // Enable "My Ticket" button
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          'Failed to open UPI app. Please ensure you have a UPI app installed.',
          [{ text: 'OK' }]
        );
        console.error('Error:', err);
      });
  };

  // Handle deep link return
  useEffect(() => {
    const handleDeepLink = (event) => {
      const { url } = event;
      if (url.includes('confirmation')) {
        Alert.alert('Payment Status', 'Payment successful or handled in the UPI app!');
        setIsPaymentDone(true); // Enable "My Ticket" button
      }
    };

    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);

    return () => linkingSubscription.remove();
  }, [navigation]);

  const navigateToTicketDetails = () => {
    navigation.navigate('TicketDetails', { bookingDetails });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Confirmation</Text>
      <View style={styles.summary}>
        <Text>Bus: {busId}</Text>
        <Text>Departure: {departure || 'N/A'}</Text>
        <Text>Arrival: {arrival || 'N/A'}</Text>
        <Text>Tickets: {tickets}</Text>
        <Text>Total Price: ₹{totalPrice}</Text>
      </View>
      <Button title="Pay Now" onPress={handlePayNow} />
      <View style={styles.myTicketButton}>
        <Button
          title="My Ticket"
          onPress={navigateToTicketDetails}
          disabled={!isPaymentDone} // Disable button until payment is done
        />
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
  summary: {
    marginBottom: 20,
  },
  myTicketButton: {
    marginTop: 20,
  },
});

export default Confirmation;
