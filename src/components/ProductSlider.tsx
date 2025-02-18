/* eslint-disable quotes */
import React, { FC, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { imageData } from "../utils/dummyData"; // Your data array with image URIs or sources
import AutoScroll from "@homielab/react-native-auto-scroll"; // Ensure you have this package installed
import { screenWidth } from "../utils/Scaling"; // Ensure screenWidth is defined for responsiveness

const ProductSlider = () => {
  const rows = useMemo(() => {
    // Split image data into chunks of 4
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none" style={styles.container}>
      <AutoScroll
        style={styles.autoScroll}
        endPaddingWidth={0} // Optional: controls the space after the last image
        duration={10000} // Scroll duration for auto-scroll effect
      >
        <View style={styles.gridContainer}>
          {rows?.map((row, rowIndex) => {
            return (
              <MemorizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
            );
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({ row, rowIndex }) => {
  return (
    <View style={styles.row}>
      {row.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18; // Apply different horizontal shifts based on row index
        return (
          <View
            key={imageIndex}
            style={[styles.itemContainer, { transform: [{ translateX: horizontalShift }] }]}
          >
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemorizedRow = React.memo(Row); // Optimize with memoization for rows

const styles = StyleSheet.create({
  container: {
    // Ensure the container takes full width/height where necessary
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  autoScroll: {
    position: "absolute",
    zIndex: -2,
    width: "100%",
  },
  gridContainer: {
    justifyContent: "center",
    overflow: "visible",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.26, // Adjust item width
    height: screenWidth * 0.26, // Adjust item height
    backgroundColor: "#e9f7f8",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ProductSlider;
