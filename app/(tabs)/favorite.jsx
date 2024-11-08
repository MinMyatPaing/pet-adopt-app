import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getUserFavorites, getUserFavoritePets } from "@/api/api";
import Colors from "@/constants/Colors";
import PetCard from "@/components/Home/PetCard";
import { useFocusEffect } from "expo-router";

export default function Favorite() {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserFavPets();
    }
  }, [user]);

  const fetchUserFavPets = async () => {
    setLoading(true);
    try {
      const result = await getUserFavorites(user);

      const favIds = result?.favorites || [];
      const favPets = await getUserFavoritePets(favIds);
      setFavList(favPets);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      setLoading(false);
    }
  };

  if (favList.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          No favorites found. Start adding pets to see favorites.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 26,
          }}
        >
          Favorites
        </Text>

        <FlatList
          numColumns={2}
          onRefresh={fetchUserFavPets}
          refreshing={loading}
          data={favList}
          renderItem={({ item, index }) => {
            console.log(item);
            return <PetCard pet={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
