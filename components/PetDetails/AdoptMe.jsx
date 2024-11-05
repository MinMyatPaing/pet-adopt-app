import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function AdoptMe() {
  return (
    <View style={styles.button}>
      <TouchableOpacity>
        <Text style={styles.text}>Adopt Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 12,
  },
  text: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    textAlign: "center",
  },
});
