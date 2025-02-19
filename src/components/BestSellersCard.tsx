/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

// Mock data (replace with your actual data import)
const bestSellers = [
    {
        "id":1,
        "name": "Dried Apricots",
        "image": "https://images.pexels.com/photos/4499213/pexels-photo-4499213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    {
        "id":2,
        "name": "Pistachios ",
        "image": "https://images.pexels.com/photos/7262761/pexels-photo-7262761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    {
        "id":3,
        "name": "Dates ",
        "image": "https://images.pexels.com/photos/4499227/pexels-photo-4499227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    {
        "id":4,
        "name": "Raisins  ",
        "image": "https://images.pexels.com/photos/8380347/pexels-photo-8380347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    {
        "id":5,
        "name": "Dried Cranberries ",
        "image": "https://images.pexels.com/photos/3872416/pexels-photo-3872416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    { 
        "id":6,
        "name": "Juices  ",
        "image": "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    {
        "id":7,
        "name": "Dried Mango ",
        "image": "https://images.pexels.com/photos/4499212/pexels-photo-4499212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    {
        "id":8,
        "name": "Mango Juice ",
        "image": "https://images.pexels.com/photos/9880628/pexels-photo-9880628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    { 
        "id":9,
        "name": "Honey ",
        "image": "https://images.pexels.com/photos/4111270/pexels-photo-4111270.jpeg?auto=compress&cs=tinysrgb&w=600",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5
    },
    {
        "id":10,
        "name": "Mix Fruit ",
        "image": "https://images.pexels.com/photos/6004803/pexels-photo-6004803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "protein": 0.3,
        "fiber": 2.4,
        "price": 0.5,
    },
];

const { width } = Dimensions.get('window');
const cardWidth = width * 0.42; // Adjust card width as needed

const BestSellersCard = ({ item }) => {
  return (
    <View>
      
  
    <View style={styles.cardContainer}>
     
      <ImageBackground source={{ uri: item.image }} style={styles.imageBackground} imageStyle={styles.imageStyle}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
        >
          <View style={styles.contentContainer}>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
    </View>
  );
};

const BestSellers = () => {
  return (
    <View style={styles.container}>
       <Text style={styles.title}>Best Sellers</Text>
       
      <FlatList
        data={bestSellers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <BestSellersCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title:{
    fontWeight:'bold',
    fontSize:20,
  },
  listContainer: {
    width:"100%",
  },
  cardContainer: {
    width: cardWidth,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageBackground: {
    width: '100%',
    height: 200, // Adjust height as needed
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  gradientOverlay: {
    padding: 12,
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: '#FFF',
    fontWeight:'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BestSellers;

