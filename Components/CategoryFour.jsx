import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import category from '../assets/electronic-device.png';
import backButtonImage from "../assets/back.png";
const ProductAdded = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const firestore = getFirestore();
        const productsCollection = collection(firestore, "product");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((product) => product.category === "Electronics");
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const goToProductDetails = (productId) => {
    router.push(`/product/${productId}`);
  };

  const addToCart = (productId) => {
    console.log("Product added to cart:", productId);
  };

  return (
    <View style={styles.container}>
    <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/account/Home")}>
          <View style={styles.imagecontainer}>
            <Image source={backButtonImage} style={styles.backButtonImage} />
            </View>
        </TouchableOpacity>
        <Image source={category} style={styles.profileImage} />
    </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.bottomContainer}>
          <ScrollView>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                fontStyle: "italic",
                color: "#102C57",
                marginBottom: 10,
              }}
            >
              Electronics Products:
            </Text>
            <View style={styles.productsContainer}>
              {products.map((product) => (
                <View key={product.id} style={styles.productContainer}>
                  <Image
                    source={{ uri: product.photoURL }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>${product.price}</Text>
                  <TouchableOpacity
                    onPress={() => addToCart(product.id)}
                    style={styles.button}
                  >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>Add to Cart</Text>
                      <Image
                        source={require("../assets/cart.png")}
                        style={styles.buttonImage}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => goToProductDetails(product.id)}
                    style={{
                      backgroundColor: "#FF6347",
                      padding: 10,
                      alignItems: "center",
                      marginTop: 10,
                      borderRadius: 22,
                      backgroundColor: "darkcyan",
                    }}
                  >
                    <View style={styles.buttonContent}>
                      <Text
                        style={styles.buttonText}
                        onPress={() =>
                          router.replace({
                            pathname: "/account/cspFour",
                            params: { productId: product.id },
                          })
                        }
                      >
                        Go to Product
                      </Text>
                      <Image
                        source={require("../assets/eye.png")}
                        style={styles.buttonImage}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    borderWidth: 1,
    backgroundColor: "#F7F7F7",
    width: '100%',
    borderColor: "#CCCCCC",
    borderRadius: 10,
},
topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
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
button: {
    backgroundColor: "#FF6347",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 22,
},
buttonText: {
    color: "white",
    fontWeight: "bold",
},
productsContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
},
productContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
    width: "48%", 
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
},
productPrice: {
    color:'blue',
    fontSize: 16,
    marginBottom: 5,
},
productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
},
buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 4,
    tintColor: "white",
},
buttonContent: {
    flexDirection: "row",
    alignItems: "center",
},
backButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
},
backButtonImage: {
    width: 30,
    height: 30,
    tintColor: "black", 
},
imagecontainer:{
    justifyContent:'center',
    alignSelf:'center', 
},
profileImage: {

    width: 50,
    height: 50,
    marginLeft: '38%',
    justifyContent:'center'
  },
});

export default ProductAdded;
