import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

const NearestStop = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [directions, setDirections] = useState(null); // Store directions

  // Hardcoded nearby stops with actual bus stop names around Guindy, Chennai
  const nearbyStops = [
    { name: 'Guindy Bus Stand', latitude: 13.007872, longitude: 80.220032 },
    { name: 'Velachery Bus Stand', latitude: 12.978571, longitude: 80.220470 },
    { name: 'Ekkatuthangal Bus Stop', latitude: 12.996283, longitude: 80.214618 },
    { name: 'Ashok Pillar Bus Stop', latitude: 13.002283, longitude: 80.215397 },
    { name: 'Kotturpuram Bus Stop', latitude: 13.002455, longitude: 80.237697 },
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

  // Fetch directions from OSRM API
  const fetchDirections = async (origin, destination) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=polyline`;

    try {
      const response = await axios.get(url);
      const route = response.data.routes[0];
      const polyline = decodePolyline(route.geometry);
      setDirections(polyline);
    } catch (error) {
      console.error(error);
      setErrorMsg('Unable to fetch directions.');
    }
  };

  // Decode the polyline from the OSRM API
  const decodePolyline = (encoded) => {
    let polyline = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let shift = 0;
      let result = 0;
      let byte;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLat = result & 0x01 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLng = result & 0x01 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      polyline.push({
        latitude: (lat / 1E5),
        longitude: (lng / 1E5)
      });
    }

    return polyline;
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

  useEffect(() => {
    if (currentLocation) {
      const nearestStop = getNearestStop();
      if (nearestStop) {
        fetchDirections(currentLocation, nearestStop);
      }
    }
  }, [currentLocation]);

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
      <Text style={styles.header}>Nearest Bus Stop</Text>
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

        {/* Marker for nearest bus stop */}
        <Marker
          coordinate={{ latitude: nearestStop.latitude, longitude: nearestStop.longitude }}
          title={nearestStop.name}
          pinColor="red"
        />

        {/* Route from current location to nearest stop */}
        {directions && (
          <Polyline
            coordinates={directions}
            strokeColor="blue"
            strokeWidth={4}
          />
        )}
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
