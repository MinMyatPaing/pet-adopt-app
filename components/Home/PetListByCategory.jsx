import { FlatList } from "react-native";
import React from "react";
import PetCard from "./PetCard";

export default function PetListByCategory({ petList }) {
  return (
    <FlatList
      data={petList}
      style={{ marginTop: 20 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => <PetCard key={item.name} pet={item} />}
    />
  );
}
