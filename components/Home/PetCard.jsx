import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function PetCard({ pet }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: "/pet-details", params: pet });
      }}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: pet?.imageUrl }} />
      <Text style={styles.name}>{pet?.name}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.breed}>{pet?.breed}</Text>
        <Text style={styles.age}>{pet?.age} YRS</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 14,
    margin: 5,
  },
  image: {
    width: 140,
    height: 135,
    borderRadius: 15,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    marginVertical: 4,
  },
  breed: {
    fontFamily: "outfit",
    color: Colors.GRAY,
    fontSize: 14,
  },
  age: {
    fontFamily: "outfit",
    color: Colors.PRIMARY,
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 4,
    borderRadius: 20,
  },
});
