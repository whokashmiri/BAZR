import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { searchProducts } from '../utils/searchData';
import {  categories } from '../utils/dummyData';
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  // Function to fetch and filter products based on search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredProducts([]); // Clear previous search results when input is empty
    } else {
      const filtered = searchProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Function to handle product selection
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <View style={styles.container}>
      {/* Delivery Info */}
      <View style={styles.delivery}>
      <View style={styles.deliverySection}>
        <Text style={styles.deliveryText}>Delivery In 12 minutes</Text>
        <Text style={styles.positionText}>Current Position: Your location</Text>
        </View>
     
      {/* Profile Icon */}
      <View style={styles.profileContainer}>
        <Image 
          source={require('../assets/profle.png')} 
          style={styles.profileIcon} 
        />
      </View>
      </View>

      {/* Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search For Products"
        placeholderTextColor="black"
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {/* Search Results with ScrollView */}
      <ScrollView style={styles.productsContainer}>
        {filteredProducts.map((product, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectProduct(product)}>
            <View style={styles.productItem}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productCardDetails}>
                <Text style={styles.productText}>{product.name}</Text>
                <Text style={styles.productCardPrice}>Price: ${product.price}</Text>
                <Text style={styles.productCardFiber}>Fiber: {product.fiber}g</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for Selected Product */}
      {selectedProduct && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedProduct(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.productCard}>
              <Image source={{ uri: selectedProduct.image }} style={styles.productCardImage} />
              <Text style={styles.productCardTitle}>{selectedProduct.name}</Text>
              <Text style={styles.productCardPrice}>Price: ${selectedProduct.price}</Text>
              <Text style={styles.productCardFiber}>Fiber: {selectedProduct.fiber}g</Text>
              <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProduct(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Cart Button */}
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('CartScreen', { cart })}>
        <Text style={styles.cartText}>Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEE3DB",
    padding: 20,
  },
  deliverySection: {
    marginBottom: 10,
  },
  delivery:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  deliveryText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  positionText: {
    fontSize: 16,
    color: '#777',
  },
  profileIcon:{
    height:50,
    width:50,
  },
  searchInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  productsContainer: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productCardDetails: {
    paddingLeft: 10,
    flexDirection: 'column',
  },
  productText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productCardPrice: {
    fontSize: 16,
    color: 'green',
  },
  productCardFiber: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  productCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  productCardImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryCard: {
    width: 120,
    height: 140,
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 10,
  },
  cartText: {
    color: 'white',
    fontSize: 16,
  }
 
});

export default HomeScreen;


