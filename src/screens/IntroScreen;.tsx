import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IntroScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeScreen'); // Use navigate to go to HomeScreen
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/hero-main.png")} style={styles.logo} />
      <Text style={styles.text}>Buy Your Favourite Dry Fruits from BAZR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default IntroScreen;
