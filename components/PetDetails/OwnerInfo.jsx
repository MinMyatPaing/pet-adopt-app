import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.rowContainer}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={{ uri: pet?.userImage }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 99,
                objectFit: "cover",
              }}
            />
            <View>
              <Text style={styles.userName}>{pet?.userName}</Text>
              <Text style={styles.userType}>Pet Owner</Text>
            </View>
          </View>

          <Ionicons name="send" size={20} color={Colors.PRIMARY} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontFamily: "outfit-medium",
    fontSize: 15,
  },
  userType: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
});
