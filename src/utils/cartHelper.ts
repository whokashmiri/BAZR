// src/helpers/CartHelper.ts
export const addToCart = (cart, setCart, item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: prev[item.id]
        ? { ...prev[item.id], quantity: prev[item.id].quantity + 1 }
        : { ...item, quantity: 1 },
    }));
  };
  
  export const removeFromCart = (cart, setCart, id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };
  
  export const updateCartQuantity = (cart, setCart, id, delta) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id]) {
        newCart[id].quantity += delta;
        if (newCart[id].quantity <= 0) delete newCart[id];
      }
      return newCart;
    });
  };
  
  export const calculateTotalPrice = (cart) => {
    return Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  
  // src/components/CartButton.tsx
  import React from "react";
  import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import Icon from "react-native-vector-icons/MaterialIcons";
  
  const CartButton = ({ totalPrice, cart }) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CartScreen", { cart, totalPrice })}
        >
          <Icon name="shopping-cart" size={25} color="white" />
          <Text style={styles.buttonText}>View Cart (${totalPrice.toFixed(2)})</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { position: "absolute", bottom: 20, right: 20 },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
    },
    buttonText: { color: "white", fontWeight: "bold", marginLeft: 5 },
  });
  
  export default CartButton;
  
  