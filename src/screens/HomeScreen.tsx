import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
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
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortByPrice, setSortByPrice] = useState<'asc' | 'desc'>('asc');
  const navigation = useNavigation();

  const storeLocation = { latitude: 12.9716, longitude: 77.5946 }; // Example store location

  // Fetch items when the app loads
  useEffect(() => {
    fetchInitialItems();
  }, []);

  // Fetch initial items and categories
  const fetchInitialItems = async () => {
    setLoading(true);
    try {
      const data = await fetchItems('');
      setItems(data);
      const uniqueCategories = [...new Set(data.map((item) => item.category))];
      setCategories(['all', ...uniqueCategories]);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort items based on category and price
  const getFilteredAndSortedItems = () => {
    let filteredItems = items;
    if (selectedCategory !== 'all') {
      filteredItems = items.filter((item) => item.category === selectedCategory);
    }
    return filteredItems.sort((a, b) =>
      sortByPrice === 'asc' ? a.price - b.price : b.price - a.price
    );
  };

  // Handle search query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        setLoading(true);
        fetchItems(searchQuery)
          .then((data) => setItems(data))
          .finally(() => setLoading(false));
      } else {
        fetchInitialItems();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Update delivery message based on location
  useEffect(() => {
    const userLocation = { latitude: 12.9352, longitude: 77.6245 }; // Example user location
    const distance = calculateDistance(storeLocation, userLocation);
    setDeliveryMessage(distance <= 4 ? 'Delivery In 10 minutes' : 'Change location');
  }, [location]);

  // Add item to cart
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
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.categoryPicker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
        <Picker
          selectedValue={sortByPrice}
          style={styles.sortPicker}
          onValueChange={(itemValue) => setSortByPrice(itemValue)}
        >
          <Picker.Item label="Price: Low to High" value="asc" />
          <Picker.Item label="Price: High to Low" value="desc" />
        </Picker>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={getFilteredAndSortedItems()}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryPicker: {
    flex: 1,
    marginRight: 8,
  },
  sortPicker: {
    flex: 1,
    marginLeft: 8,
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