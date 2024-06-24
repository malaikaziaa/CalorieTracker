import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CaloriesScreen = ({ navigation }) => {
  const [dailyCalorieIntake, setDailyCalorieIntake] = useState("");
  const [targetCalorieIntake, setTargetCalorieIntake] = useState("");
  const [macroRatio, setMacroRatio] = useState({
    protein: "",
    carbs: "",
    fats: "",
  });

  const handleNext = () => {
    // Validate and navigate to the next screen or perform next action
    navigation.navigate("Nutrition Track");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calories Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Daily Calorie Intake"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={dailyCalorieIntake}
        onChangeText={setDailyCalorieIntake}
      />
      <TextInput
        style={styles.input}
        placeholder="Target Calorie Intake"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={targetCalorieIntake}
        onChangeText={setTargetCalorieIntake}
      />
      <Text style={styles.subtitle}>Macronutrient Ratio</Text>
      <TextInput
        style={styles.input}
        placeholder="Protein (%)"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={macroRatio.protein}
        onChangeText={(value) =>
          setMacroRatio((prev) => ({ ...prev, protein: value }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Carbohydrates (%)"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={macroRatio.carbs}
        onChangeText={(value) =>
          setMacroRatio((prev) => ({ ...prev, carbs: value }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Fats (%)"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={macroRatio.fats}
        onChangeText={(value) =>
          setMacroRatio((prev) => ({ ...prev, fats: value }))
        }
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default CaloriesScreen;
