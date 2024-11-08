import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase.config.js";

export const getUserFavorites = async (user) => {
  const docRef = doc(
    db,
    "UserFavPets",
    user?.primaryEmailAddress?.emailAddress
  );
  
  
  const snapShot = await getDoc(docRef);
  
  if (snapShot.exists()) {
    return snapShot.data();
  } else {
    await setDoc(docRef, {
      email: user?.primaryEmailAddress?.emailAddress,
      favorites: [],
    });
  }
};

export const updateUserFavorites = async (user, favoriteList) => {
  const docRef = doc(
    db,
    "UserFavPets",
    user?.primaryEmailAddress?.emailAddress
  );

  try {
    await updateDoc(docRef, {
      favorites: favoriteList,
    });

    
  } catch (error) {
    console.error(error);
  }
};

export const getUserFavoritePets = async (favIds) => {
  const favPets = [];
  const q = query(collection(db, 'Pets'), where('id', 'in', favIds));

  const snapShot = await getDocs(q);

  snapShot.forEach(doc => {
    favPets.push(doc.data());
  });
  return favPets;
}