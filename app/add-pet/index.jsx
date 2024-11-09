import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { db, storage } from "@/config/firebase.config";

import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function index() {
  const [formData, setFormData] = useState({
    sex: "Male",
    category: "Dogs",
  });
  const [selectedCategory, setSelectedCategory] = useState("Dogs");
  const [categoryList, setCategoryList] = useState([]);
  const [sex, setSex] = useState("Male");
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useUser();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: "Add Pet",
    });
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      setCategoryList([]);
      const snapshot = await getDocs(collection(db, "Categories"));
      snapshot.forEach((doc) => {
        setCategoryList((catList) => [...catList, doc.data()]);
      });
    };

    getCategory();
  }, []);

  const handleChange = (fieldName, value) => {
    setFormData((prevFrom) => {
      return {
        ...prevFrom,
        [fieldName]: value,
      };
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (callBack) => {
    const response = await fetch(selectedImage);
    const blob = await response.blob();
    const storageRef = ref(storage, "/AdoptPet/" + Date.now() + ".jpg");

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("file uploading");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (downLoadUrl) => {
          await callBack(downLoadUrl);
        });
      });
  };

  const submitForm = async () => {
    if (Object.keys(formData).length !== 8) {
      ToastAndroid.show("Please enter all fields", ToastAndroid.BOTTOM);
      return;
    }

    setSubmitting(true);
    await uploadImage(async (imgUrl) => {
      const docId = Date.now().toString();
      console.log("Submtting Data ====> ", {
        ...formData,
        imageUrl: imgUrl,
        username: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        id: docId,
      });

      await setDoc(doc(db, "Pets", docId), {
        ...formData,
        imageUrl: imgUrl,
        username: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        id: docId,
      });
    });

    setSubmitting(false);
    router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Add new Pet for adoption!
      </Text>

      <Pressable onPress={pickImage}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
        ) : (
          <View
            style={{
              padding: 5,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              height: 100,
            }}
          >
            <Ionicons name="paw" size={35} color="black" />
          </View>
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChange={(value) => handleChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleChange("category", itemValue);
          }}
        >
          {categoryList.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.name} value={item.name} />
            );
          })}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChange={(value) => handleChange("breed", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChange={(value) => handleChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sex *</Text>
        <Picker
          selectedValue={sex}
          onValueChange={(itemValue, itemIndex) => {
            setSex(itemValue);
            handleChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChange={(value) => handleChange("weight", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChange={(value) => handleChange("address", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          multiline={true}
          numberOfLines={3}
          style={[styles.input, { height: 65 }]}
          onChange={(value) => handleChange("about", value)}
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: Colors.PRIMARY,
          alignItems: "center",
          justifyContent: "center",
          padding: 17,
          borderRadius: 15,
        }}
        onPress={submitForm}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontFamily: "outfit-medium",
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 7,
  },
  label: {
    fontFamily: "outfit",
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 12,
    color: "black",
    fontFamily: "outfit",
  },
});
