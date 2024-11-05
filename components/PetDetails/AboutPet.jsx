import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>About {pet?.name}</Text>
      <Text numberOfLines={readMore ? 30 : 3} style={styles.about}>
        {pet?.about}
      </Text>
      <Pressable onPress={() => setReadMore((prevState) => !prevState)}>
        <Text style={{ color: Colors.SECONDARY }}>
          {readMore ? "Read Less" : "Read More"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  about: {
    fontSize: 14,
    fontFamily: "outfit",
  },
});
