import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import Category from "@/components/Home/Category";
import PetListByCategory from "@/components/Home/PetListByCategory";
import AddNewPet from "@/components/Home/AddNewPet";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import Colors from "@/constants/Colors";

export default function home() {

  const [petListByCategory, setPetListByCategory] = useState([]);
  const [petListLoading, setPetListLoading] = useState(false);

  useEffect(() => {
    fetchPetsByCategory('Dogs');
  }, [])

  const fetchPetsByCategory = async (category) => {
    setPetListLoading(true);
    setPetListByCategory([]);
    const qy = query(collection(db, 'Pets'), where('category', '==', category));
    const snapshot = await getDocs(qy);

    snapshot.forEach(doc => {
      setPetListByCategory(petList => [...petList, doc.data()]);
    })
    setPetListLoading(false);
  }

  return (
    <View style={styles.container}>
      <Header />

      <Slider />

      <Category fetchPetsByCategory={fetchPetsByCategory} />

      {petListLoading ? <ActivityIndicator color={Colors.PRIMARY} size={30} /> : <PetListByCategory petList={petListByCategory} />}

      <AddNewPet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
  },
});
