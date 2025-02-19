import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { adData } from '../utils/dummyData'; // Ensure correct path

const { width } = Dimensions.get('window');

const CarouselComponent = () => {
  const renderItem = ({ item }) => {
    if (!item || !item.image) {
      console.error('Invalid item in renderItem:', item);
      return null;
    }

    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <Carousel
      data={adData}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width}
      loop
      autoplay
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Just for visibility
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CarouselComponent;
