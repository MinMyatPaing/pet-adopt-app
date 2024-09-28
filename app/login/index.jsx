import { View, Text, Image, Pressable } from "react-native";
import React from "react";

import Colors from "../../constants/Colors";

export default function LoginScreen() {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Image
        source={require("../../assets/images/login.jpeg")}
        style={{
          width: "100%",
          height: 500,
        }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Sign up and find a partner for both yours and their lives.
        </Text>

        <Pressable
          style={{
            padding: 14,
            marginTop: 20,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Get Started!
          </Text>
        </Pressable>
      </View>
    </View>
  );
}