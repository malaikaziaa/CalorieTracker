import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useCart } from "./CartContext";

const ProductDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { product } = route.params;

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useFocusEffect(
    useCallback(() => {
      // Reset quantity when the screen loses focus
      return () => setQuantity(1);
    }, [])
  );

  const dummyData = {
    ingredients:
      "Protein Blend (Whey Protein Isolate, Whey Protein Concentrate), Cocoa (Processed With Alkali), Natural And Artificial Flavors, Lecithin, Salt, Sucralose, Acesulfame Potassium.",
    pros: [
      "Helps build lean muscle.",
      "Supports muscle recovery.",
      "High-quality protein source.",
    ],
    sideEffects: [
      "May cause digestive issues in some individuals.",
      "Possible allergic reactions if sensitive to dairy.",
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {product.images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.productImage}
            />
          ))}
        </ScrollView>
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={handleDecrease}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.productDescription}>{dummyData.ingredients}</Text>
          <Text style={styles.sectionTitle}>Pros</Text>
          {dummyData.pros.map((pro, index) => (
            <Text key={index} style={styles.productDescription}>
              - {pro}
            </Text>
          ))}
          <Text style={styles.sectionTitle}>Side Effects</Text>
          {dummyData.sideEffects.map((effect, index) => (
            <Text key={index} style={styles.productDescription}>
              - {effect}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.addToCartContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            addToCart({ ...product, quantity });
            navigation.navigate("Cart");
          }}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    paddingBottom: 70, // To ensure the last content is scrollable above the fixed button
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 24,
    color: "#fff",
  },
  quantityValue: {
    fontSize: 18,
    color: "#fff",
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: 20,
  },
  productDescription: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
  },
  addToCartContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default ProductDetailsScreen;
