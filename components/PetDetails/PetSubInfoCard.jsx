import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

export default function PetSubInfoCard({ icon, label, value }) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={30} color={Colors.PRIMARY} />
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
  },
  label: {
    fontFamily: "outfit",
    color: Colors.GRAY,
    fontSize: 12,
  },
  value: {
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
});
