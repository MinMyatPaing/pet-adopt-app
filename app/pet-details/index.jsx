import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useLocalSearchParams } from 'expo-router'

import PetInfo from '@/components/PetDetails/PetInfo';

export default function PetDetails() {
    const navigation = useNavigation();
    const pet = useLocalSearchParams();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        })
    }, [])

  return (
    <View>
      <ScrollView contentContainerStyle>

        <PetInfo pet={pet} />

      </ScrollView>
    </View>
  )
}