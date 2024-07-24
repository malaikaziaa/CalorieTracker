// CartScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useCart } from "./CartContext";

const CartScreen = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation();

  const handlePlaceOrder = async () => {
    // Mock API call to place order
    try {
      const user = { email: "user@example.com" }; // Retrieve the email from the login context/state
      const order = {
        email: user.email,
        products: cart.map((item) => ({
          name: item.title,
          quantity: item.quantity,
        })),
      };

      // Mock API call
      const response = await fetch("https://mockapi.com/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        clearCart();
        alert("Order placed successfully!");
        navigation.navigate("ProductList");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.images[0] }} style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => removeFromCart(item.id)}
          style={styles.removeItemButton}
        >
          <Text style={styles.removeItemButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cartIcon}
        >
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  cartIcon: {
    position: "relative",
  },
  cartList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  cartItemQuantity: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
  },
  cartItemPrice: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
  },
  removeItemButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeItemButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  placeOrderButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  placeOrderButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default CartScreen;
