import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

const CartIcon: React.FC = () => {
  const { state } = useCart();

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.cartText}>Cart ({state.items.length})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  cartText: {
    color: '#fff',
  },
});

export default CartIcon;