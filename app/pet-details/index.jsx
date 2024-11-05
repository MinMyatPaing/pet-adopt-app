import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";

import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import AboutPet from "@/components/PetDetails/AboutPet";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";
import AdoptMe from "@/components/PetDetails/AdoptMe";

export default function PetDetails() {
  const navigation = useNavigation();
  const pet = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle>
        <PetInfo pet={pet} />

        <PetSubInfo pet={pet} />

        <AboutPet pet={pet} />

        <OwnerInfo pet={pet} />

        <View style={{ height: 70 }}></View>
      </ScrollView>

      <AdoptMe />
    </View>
  );
}
