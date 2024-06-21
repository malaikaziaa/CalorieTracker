import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";

const AddMealModal = ({ visible, onClose, onAddMeal }) => {
  const [meal, setMeal] = useState("");

  const handleAddMeal = () => {
    onAddMeal({ name: meal });
    setMeal("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text>Add a new meal</Text>
        <TextInput
          style={styles.input}
          placeholder="Meal Name"
          value={meal}
          onChangeText={setMeal}
        />
        <Button title="Add Meal" onPress={handleAddMeal} />
        <Button title="Cancel" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AddMealModal;
