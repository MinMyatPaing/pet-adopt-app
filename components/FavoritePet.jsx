import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

import {getUserFavorites, updateUserFavorites} from "../api/api.js";

export default function FavoritePet({pet}) {

  const {user} = useUser();
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
  
      user && getFav();
    
  }, [user])

  const getFav = async () => {
    const result = await getUserFavorites(user);
    
    setFavoriteList(result?.favorites? result.favorites : []);
  }

  const addFav = async () => {
    const addedFavList = [...favoriteList];
    addedFavList.push(pet?.id);
    
    await updateUserFavorites(user, addedFavList);
    await getFav()
  }

  const removeFav = async () => {
    let removeFavList = [...favoriteList];
    removeFavList = removeFavList.filter(id => id !== pet?.id);
    
    await updateUserFavorites(user, removeFavList);
    await getFav();
  }

  const isFavorite = favoriteList.includes(pet.id);

  return (
    <Pressable onPress={isFavorite ? removeFav : addFav}>
      <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="red" />
    </Pressable>
  );
}
