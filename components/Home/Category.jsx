import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Colors from "@/constants/Colors";

export default function Category({ fetchPetsByCategory }) {
  const [selectedCategory, setSelectedCategory] = useState("dogs");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      setCategoryList([]);
      const snapshot = await getDocs(collection(db, "Categories"));
      snapshot.forEach((doc) => {
        setCategoryList((catList) => [...catList, doc.data()]);
      });
    };

    getCategory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <FlatList
        numColumns={4}
        data={categoryList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item?.name);
              fetchPetsByCategory(item?.name);
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.imageContainer,
                selectedCategory === item?.name && styles.selectedCategory,
              ]}
            >
              <Image style={styles.image} source={{ uri: item?.imageUrl }} />
            </View>
            <Text style={styles.categoryName}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-medium",
  },
  imageContainer: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  image: {
    width: 40,
    height: 40,
  },
  selectedCategory: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
  categoryName: {
    fontFamily: "outfit",
    textAlign: "center",
  },
});
