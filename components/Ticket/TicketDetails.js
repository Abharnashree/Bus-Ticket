import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native'; // Use navigation for screen transitions

const TicketDetails = ({ route }) => {
  const { busDetails, routeSummary, price } = route.params;
  const navigation = useNavigation();

  const handleNearestStop = () => {
    navigation.navigate('NearestStop'); // No extra params needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ticket Details</Text>
      <Text>Bus: {busDetails.name || 'No bus selected'}</Text>
      <Text>Route: {routeSummary}</Text>
      <Text>Price: ₹{price}</Text>
      <QRCode value={`Ticket: ${busDetails.name} - ${routeSummary}`} size={150} />

      {/* Nearest Stop Button */}
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
