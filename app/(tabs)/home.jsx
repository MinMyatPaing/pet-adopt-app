import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";

export default function home() {
  return (
    <View style={styles.container}>
      <Header />

      <Slider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
