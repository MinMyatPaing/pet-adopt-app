import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../config/firebase.config";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    const getSliderImages = async () => {
      setSliderList([]);
      const snapshot = await getDocs(collection(db, "Sliders"));

      snapshot.forEach((sliderItem) => {
        setSliderList((prevSliderList) => [
          ...prevSliderList,
          sliderItem.data(),
        ]);
      });
    };

    getSliderImages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={sliderList}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer} key={item?.name}>
            <Image style={styles.image} source={{ uri: item?.imageUrl }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  imageContainer: {
    marginRight: 20,
  },
  image: {
    width: Dimensions.get("screen").width * 0.9,
    height: 160,
  },
});
