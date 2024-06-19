import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search your added meal"
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Ionicons name="camera" size={24} color="#F5F5F5" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#1E1E1E",
    color: "#F5F5F5",
    paddingVertical: 10,
  },
});

export default SearchBar;
