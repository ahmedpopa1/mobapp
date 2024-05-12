import React, { useState } from "react";
import { View, TextInput, Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { router } from "expo-router";
import firebase from "firebase/compat/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import RNPickerSelect from 'react-native-picker-select'; 
import backButtonImage from '../assets/back.png';

const AddProductWithPhoto = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setUploading] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const pickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error Picking Image:", error);
    }
  };

  const uploadFile = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await fetch(uri).then((response) => response.blob());
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const storageRef = firebase.storage().ref().child(filename);
      await storageRef.put(blob);
      setUrl(await storageRef.getDownloadURL());
      console.log("Download URL:", url);
      Alert.alert("Upload Completed");
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!productName || !productPrice || !image) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
      const firestore = getFirestore();
      const productsCollection = collection(firestore, "product");
      const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        photoURL: image,
        category: productCategory,
      };
      await addDoc(productsCollection, newProduct);
      Alert.alert("Success", "Product added successfully.");
      setProductName("");
      setProductPrice("");
      setProductCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product. Please try again.");
    }
  };

  const goToProductAdded = () => {
    router.replace("/account/posts");
  };

  const handleBack = () => {
    router.replace("/account/adminhome");
  };
  
  // const categories = [
  //   "Men Clothing",
  //   "Women Clothing",
  //   "Accessories",
  //   "Electronics",
  // ];
  const options = [
    { label: "men's Clothing", value: "men's Clothing" },
    { label: "Women's clothing", value: "Women's clothing" },
    { label: "Jewelery", value: "Jewelery" },
    { label:"Electronics", value: "Electronics" },
  ];
  const placeholder = {
    label: 'Select Category',
    value: null,
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Image source={require('../assets/add-post.png')} style={styles.addPostImage} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.containerimag}>
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          )}
        </View>

        <TouchableOpacity onPress={pickFile} style={styles.button}>
          <Text style={styles.buttonText}>CHOOSE PHOTO</Text>
          <Image source={require('../assets/upload.png')} style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={uploadFile} style={styles.button}>
          <Text style={styles.buttonText}>UPDATE PHOTO</Text>
          <Image source={require('../assets/photo.png')} style={styles.buttonImage} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Product Title"
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
          />
          <RNPickerSelect
            placeholder={placeholder}
            items={options}
            onValueChange={setProductCategory}
            value={productCategory}
          />
        </View>

        <TouchableOpacity onPress={handleAddProduct} style={styles.button}>
          <Text style={styles.buttonText}>ADD PRODUCT</Text>
          <Image source={require('../assets/add.png')} style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToProductAdded} style={styles.button}>
          <Text style={styles.buttonText}>ADDED PRODUCTS</Text>
          <Image source={require('../assets/eye.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 10,
    backgroundColor: '#F7F7F7',
    width: '100%',
    borderColor: '#474745',
    borderRadius: 12,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '8%',
    backgroundColor: '#F7F7F7',
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    marginTop: '1%',
    padding: 10,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  containerimag: {
    width: "70%",
    height: '30%',
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  image: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'darkcyan',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: '2%',
    width: '40%',
    marginLeft: '30%',
    borderRadius: 22,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: "20%",
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    tintColor: "black",
  },
  inputContainer: {
    marginTop: '4%',
    width: '80%',
    height: '20%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: "20%",
    borderBottomWidth: 3,
    borderBottomColor: "black",
    paddingHorizontal: 10,
    marginBottom: '4%',
    marginTop: '2%',
    marginLeft: '10%',
    color: "#474745",
  },
  addPostImage: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginRight: "47%",
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
    tintColor: 'white',
  },
});

export default AddProductWithPhoto;
