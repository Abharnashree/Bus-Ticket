import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';

const NearestStop = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded nearby stops
  const nearbyStops = [
    { name: 'Stop A', latitude: 12.971598, longitude: 77.594566 },
    { name: 'Stop B', latitude: 12.97523, longitude: 77.603288 },
    { name: 'Stop C', latitude: 12.96631, longitude: 77.595125 },
  ];

  // Calculate the nearest stop
  const getNearestStop = () => {
    if (!currentLocation) return null;

    let nearestStop = nearbyStops[0];
    let minDistance = Infinity;

    nearbyStops.forEach((stop) => {
      const distance = Math.sqrt(
        Math.pow(currentLocation.latitude - stop.latitude, 2) +
          Math.pow(currentLocation.longitude - stop.longitude, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestStop = stop;
      }
    });

    return nearestStop;
  };

  useEffect(() => {
    (async () => {
      try {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        // Get the current position
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setErrorMsg('Unable to fetch location. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  const nearestStop = getNearestStop();

  if (!nearestStop) {
    Alert.alert('No nearby stops found!');
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearest Stop</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Marker for current location */}
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          pinColor="blue"
        />

        {/* Marker for nearest stop */}
        <Marker
          coordinate={{ latitude: nearestStop.latitude, longitude: nearestStop.longitude }}
          title={nearestStop.name}
          pinColor="red"
        />

        {/* Route from current location to nearest stop */}
        <Polyline
          coordinates={[
            currentLocation,
            { latitude: nearestStop.latitude, longitude: nearestStop.longitude },
          ]}
          strokeColor="blue"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default NearestStop;
