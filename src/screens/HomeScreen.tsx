import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import ItemCard from '../components/ItemCard';
import LocationPicker from '../components/LocationPermission';
import { fetchItems } from '../utils/api';
import { calculateDistance } from '../utils/distanceCalculator';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [location, setLocation] = useState<string>('Current Location');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deliveryMessage, setDeliveryMessage] = useState<string>('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigation = useNavigation();

  const storeLocation = { latitude: 12.9716, longitude: 77.5946 }; // Example store location

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        setLoading(true);
        fetchItems(searchQuery)
          .then((data) => setItems(data))
          .finally(() => setLoading(false));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const userLocation = { latitude: 12.9352, longitude: 77.6245 }; // Example user location
    const distance = calculateDistance(storeLocation, userLocation);
    setDeliveryMessage(distance <= 4 ? 'Delivery In 10 minutes' : 'Change location');
  }, [location]);

  const handleAddToCart = (item: any) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.deliveryText}>{deliveryMessage}</Text>
      <LocationPicker location={location} setLocation={setLocation} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCard item={item} onAddToCart={() => handleAddToCart(item)} />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart', { cartItems })}
      >
        <Text style={styles.cartButtonText}>Go to Cart ({cartItems.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  cartButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
