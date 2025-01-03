import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function AddNewPet() {

  const router = useRouter();
  return (
    <TouchableOpacity style={styles.button} onPress={() => {
      router.push('/add-pet');
    }}>
        <MaterialIcons name='pets' size={24} color={Colors.PRIMARY} />
        <Text style={styles.buttonText}>Add New Pet</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        padding: 20,
        marginTop: 20,
        backgroundColor: Colors.LIGHT_PRIMARY,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "outfit-medium",
        color: Colors.PRIMARY,
        fontSize: 18,
    }
})