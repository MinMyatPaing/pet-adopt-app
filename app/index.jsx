import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { useEffect } from "react";
import { Text, View, Pressable } from "react-native";

export default function Index() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={"/(tabs)/home"} /> : <Redirect href={"/login"} />}
    </View>
  );
}
