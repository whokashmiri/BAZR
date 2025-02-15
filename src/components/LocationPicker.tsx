import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface LocationPickerProps {
  location: string;
  setLocation: (location: string) => void;
  fetchItemsByLocation: (location: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ location, setLocation, fetchItemsByLocation }) => {
  const [newLocation, setNewLocation] = useState<string>('');

  const handleChangeLocation = () => {
    if (newLocation) {
      setLocation(newLocation);
      fetchItemsByLocation(newLocation); // Fetch items based on the new location
      setNewLocation('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>Current Location: {location}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new location..."
        value={newLocation}
        onChangeText={setNewLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangeLocation}>
        <Text style={styles.buttonText}>Change Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LocationPicker;
