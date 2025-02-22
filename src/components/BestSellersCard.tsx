/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React, { useRef, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const bestSellers = [
  {
    "id": 1,
    "name": "Dried Apricots",
    "image": "https://images.pexels.com/photos/6138727/pexels-photo-6138727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 0.5
  },
  {
    "id": 2,
    "name": "Pistachios",
    "image": "https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 0.5
  },
  {
    "id": 3,
    "name": "Dates",
    "image": "https://images.pexels.com/photos/2291592/pexels-photo-2291592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 0.5
  },
  {
    "id": 4,
    "name": "Raisins",
    "image": "https://images.pexels.com/photos/8380347/pexels-photo-8380347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 0.5
  },
  {
    "id": 5,
    "name": "Dried Cranberries",
    "image": "https://images.pexels.com/photos/6939752/pexels-photo-6939752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "price": 0.5
  },
];

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8; 

const BestSellersCard = ({ item }) => (
  <View style={styles.cardContainer}>
    <ImageBackground source={{ uri: item.image }} style={styles.imageBackground} imageStyle={styles.imageStyle}>
      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} style={styles.gradientOverlay}>
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
);

const BestSellers = () => {
  const flatListRef = useRef(null);
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % bestSellers.length;
      flatListRef.current?.scrollToOffset({ animated: true, offset: index * cardWidth });
    }, 1500); // 1 second wait + 0.5 second transition

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Sellers</Text>
      <FlatList
        ref={flatListRef}
        data={bestSellers}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <BestSellersCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   
    // marginTop: 20,
  },
  title: {
    textAlign:'right',
    fontWeight: 'bold',
    fontSize: 22,
    // marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: cardWidth,
    marginHorizontal: 8,
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
    height: 220,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
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
