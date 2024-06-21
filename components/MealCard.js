import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MealCard = ({ meal }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{meal.name}</Text>
      <Text>{meal.calories} Kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MealCard;
