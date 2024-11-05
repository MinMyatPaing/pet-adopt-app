import { View, StyleSheet } from "react-native";
import React from "react";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <PetSubInfoCard
          icon={"calendar"}
          label="Age"
          value={pet?.age + " Years"}
        />

        <PetSubInfoCard icon={"paw"} label="Breed" value={pet?.breed} />
      </View>

      <View style={styles.rowContainer}>
        <PetSubInfoCard icon={"male-female"} label="Sex" value={pet?.sex} />

        <PetSubInfoCard
          icon={"barbell"}
          label="Weight"
          value={pet?.weight + " Kg"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  rowContainer: {
    flexDirection: "row",
  },
});
