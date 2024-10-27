import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.nameText}>{user?.fullName}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "outfit",
    fontSize: 18,
  },
  nameText: {
    fontFamily: "outfit-medium",
    fontSize: 25,
  },
  imageContainer: {
    borderRadius: 99,
    overflow: "hidden",
  },
  image: {
    width: 50,
    height: 50,
  },
});
