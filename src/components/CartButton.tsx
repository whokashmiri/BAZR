import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";

const CartButton = () => {
  const navigation = useNavigation();
  const { cart, totalPrice } = useContext(CartContext);

  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={() => navigation.navigate("CartScreen", { cart, totalPrice })}
    >
      <Icon name="shopping-cart" size={25} color="white" />
      <Text style={styles.cartText}>${totalPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  cartText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default CartButton;
