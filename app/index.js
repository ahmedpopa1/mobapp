import { StyleSheet, Text, View } from "react-native";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { auth } from "../firebase/Config";
import { router } from "expo-router";
export default function Page() {
  // const checkLoginStatus = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem('@user_id');
  //     if (userId) {
  //       const isLoggedIn = await auth.onAuthStateChanged((user) => user !== null);
  //       if (isLoggedIn) {
  //         console.log('User is logged in');
  //         router.navigate('/account/Home');
  //       } else {
  //         await AsyncStorage.removeItem('@user_id');
  //       }
  //     } else {
  //       console.log('User is not logged in');
  //     }
  //   } catch (error) {
  //     console.error('Error checking login status:', error);
  //   }
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  // }, [])
  return <Login />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});
