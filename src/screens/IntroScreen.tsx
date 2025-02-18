/* eslint-disable quotes */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductSlider from "../components/ProductSlider";

const IntroScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = () => {
    if (phoneNumber === "8825080922") {
      navigation.navigate("Home" as never);
    } else {
      Alert.alert("Contact Admin", "Invalid login number", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Product Slider */}
      <ProductSlider />

      {/* Title */}
      <Text style={styles.title}>Welcome To Bazr</Text>

      {/* Login Input */}
      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Enter Phone Number"
        placeholderTextColor="#555B6E"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEE3DB",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom:70,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
  label: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 15,
    width: "80%",
    marginTop: 50,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IntroScreen;
