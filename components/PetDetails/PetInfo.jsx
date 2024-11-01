import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "@/constants/Colors";

export default function PetInfo({ pet }) {
  
  return (
    <View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{ width: "100%", height: 400 }}
      />

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.petName}>{pet?.name}</Text>
          <Text style={styles.address}>{pet?.address}</Text>
        </View>
        <Ionicons name="heart-outline" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petName: {
    fontFamily: 'outfit-bold',
    fontSize: 27,
  },
  address: {
    color: Colors.GRAY,
    fontFamily: 'outfit',
    fontSize: 14,
  },
})