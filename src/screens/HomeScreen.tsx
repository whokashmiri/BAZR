/* eslint-disable quotes */
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { searchProducts } from '../utils/searchData';
import { categories } from '../utils/dummyData';
import { adData } from '../utils/dummyData';
import BestSellerCard from '../components/BestSellersCard';





const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [cartModalVisible, setCartModalVisible] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredProducts([]);
    } else {
      const filtered = searchProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredProducts(filtered);
    }
  };
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFilteredProducts([]);
    setSearchTerm("")
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const handleIncreaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };


  const handleDecreaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.delivery}>
        <View style={styles.deliverySection}>
          <Text style={styles.deliveryText}>Delivery In 12 minutes</Text>
          <Text style={styles.positionText}> Your Location </Text>
        </View>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/profle.png')} style={styles.profileIcon} />
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

      {/* Search Results */}
      {filteredProducts.length > 0 && (
        <ScrollView style={styles.productsContainer}>
          {filteredProducts.map((product, index) => (
            <TouchableOpacity key={product.index || index} onPress={() => handleSelectProduct(product)}>
              <View style={styles.productItem}>
                <View style={styles.productCardDetails}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  <Text style={styles.productText}>{product.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
        {/* Buttons */}
        <View style={styles.BtnView}>
      
          <TouchableOpacity style={styles.addToCartButton} onPress={() => 
            handleAddToCart(selectedProduct)
          }>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.closeButtonn} onPress={() => 
            setSelectedProduct(null)

            }>
            <Text style={styles.closeButtonTextt}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)}





      {/* Categories Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainerr}>
        {adData.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCardd}>
            <Image source={category.image} style={styles.categoryImagee} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cart Button */}
      <TouchableOpacity style={styles.cartButton} onPress={() => setCartModalVisible(true)}>
        <Text style={styles.cartText}>Cart ({getTotalItems()})</Text>
      </TouchableOpacity>

      {/* Cart Modal */}
      <Modal visible={cartModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.cartModal}>
            <Text style={styles.cartModalTitle}>Your Cart</Text>
            {cart.length === 0 ? (
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            ) : (
              <>
                {cart.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Text style={styles.cartItemText}>{item.name} x {item.quantity}</Text>
                    <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <View style={styles.cartActions}>
                      <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
                        <Text style = {styles.quantityButton}>-</Text>
                      </TouchableOpacity>
                      <Text>Quantity</Text>
                      <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
                        <Text style={styles.quantityButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                <Text style={styles.totalPrice}>Total: ${getTotalPrice()}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setCartModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    <BestSellerCard/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  deliverySection: {
    marginBottom: 10,
  },
  delivery: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deliveryText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  positionText: {
    fontSize: 16,
    color: '#777',
  },
  profileIcon: {
    height: 50,
    width: 50,
  },
  searchInput: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    zIndex: 10,
  },
  productsContainer: {
    marginLeft:10,
    backgroundColor:"#e7dfcf",
    width:'100%',
    borderRadius:10,
    maxHeight: '100%',
    marginTop: 150,
    position:'absolute',
  zIndex:10,
  },
  cartActions:{
    flexDirection:'row',
  },
  productItem: {
    backgroundColor: "#F3f0E9",
    borderColor:"black",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
    padding: 5,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  productCardDetails: {
    paddingLeft: 10,
    flexDirection: 'row',
  },
  productText: {
    marginLeft: 15,
    fontSize: 20,
    color:'black',
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
    width: 200,
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginBlock:20,
    margin:5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor:"black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryCard: {
    width: 160,
    height: 140,
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCardd:{
    width: 380,
    height: 200,
    marginRight:10,
  },
    categoryImagee: {
      width: '100%',
      height: 230,
      borderRadius: 10,
    },
  categoryImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  carouselContainer: {
   
   
  },
  carouselContainerr: {
    marginTop:20,
    height:250,
    width:"100%"
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
  cartText: { color: 'white', fontSize: 16 },
  cartModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  cartModalTitle: { fontSize: 20, fontWeight: 'bold' },
  emptyCartText: { fontSize: 16, color: 'gray' },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    
  },
  BtnView:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between'},
  cartItemText: { fontSize: 16 },
  cartItemPrice: { fontSize: 16, color: 'green' },
  quantityButton: { fontSize: 20, paddingHorizontal: 10 },
  totalPrice: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  closeButtonn: { marginTop: 10, backgroundColor: '#f44336', padding: 10, borderRadius: 5 },
  closeButtonTextt: { color: 'white', fontSize: 16 },
});

export default HomeScreen;

