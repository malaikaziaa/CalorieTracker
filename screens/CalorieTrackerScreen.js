import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import fetch from "node-fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Calendar from "../components/Calender";
import CalorieGraph from "../components/CalorieGraph";
import SearchBar from "../components/SearchBar";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SPOONACULAR_API_KEY = "deed54e100cc410fb74ceb1fcf9739c6";

const fetchNutrition = async (name) => {
  try {
    const nutritionResponse = await fetch(
      `https://api.spoonacular.com/recipes/guessNutrition?title=${name}&apiKey=${SPOONACULAR_API_KEY}`
    );
    if (!nutritionResponse.ok) {
      throw new Error(
        `Error fetching nutrition data: ${nutritionResponse.statusText}`
      );
    }
    const nutritionData = await nutritionResponse.json();

    return {
      calories: nutritionData.calories.value,
      protein: nutritionData.protein.value,
      carbs: nutritionData.carbs.value,
      fat: nutritionData.fat.value,
    };
  } catch (error) {
    console.error("Error in fetchNutrition:", error);
    return null;
  }
};

const CalorieTrackerScreen = ({ navigation }) => {
  const [mealName, setMealName] = useState("");
  const [meals, setMeals] = useState([]);
  const [caloriesLeft, setCaloriesLeft] = useState(6000);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadMealsForDate(selectedDate);
  }, [selectedDate]);

  const saveMealsForDate = async (date, meals) => {
    try {
      const dateKey = date.toISOString().split("T")[0];
      await AsyncStorage.setItem(dateKey, JSON.stringify(meals));
      console.log("Meals saved for date:", dateKey); // Log saving meals
    } catch (error) {
      console.error("Error saving meals:", error);
    }
  };

  const loadMealsForDate = async (date) => {
    try {
      const dateKey = date.toISOString().split("T")[0];
      const storedMeals = await AsyncStorage.getItem(dateKey);
      const parsedMeals = storedMeals ? JSON.parse(storedMeals) : [];
      setMeals(parsedMeals);
      console.log("Meals loaded for date:", dateKey, parsedMeals); // Log loaded meals
      const totalCaloriesConsumed = parsedMeals.reduce(
        (acc, meal) => acc + meal.calories,
        0
      );
      setTotalCaloriesConsumed(totalCaloriesConsumed);
      setCaloriesLeft(6000 - totalCaloriesConsumed);
    } catch (error) {
      console.error("Error loading meals:", error);
    }
  };

  const handleAddMeal = async () => {
    if (mealName.trim() === "") {
      Alert.alert("Error", "Meal name cannot be empty");
      return;
    }

    console.log("Fetching nutrition for meal:", mealName); // Log meal name
    const nutrition = await fetchNutrition(mealName);
    if (nutrition !== null) {
      const newMeal = { name: mealName, ...nutrition };
      const updatedMeals = [...meals, newMeal];
      setMeals(updatedMeals);
      console.log("Updated meals:", updatedMeals); // Log updated meals
      const totalCaloriesConsumed = updatedMeals.reduce(
        (acc, meal) => acc + meal.calories,
        0
      );
      setTotalCaloriesConsumed(totalCaloriesConsumed);
      setCaloriesLeft(6000 - totalCaloriesConsumed);
      setMealName("");
      saveMealsForDate(selectedDate, updatedMeals);
    } else {
      Alert.alert(
        "Error",
        "We don't have this meal yet. Please try something else"
      );
    }
  };

  const handleDeleteMeal = (mealToDelete) => {
    const updatedMeals = meals.filter((meal) => meal !== mealToDelete);
    setMeals(updatedMeals);
    const totalCaloriesConsumed = updatedMeals.reduce(
      (acc, meal) => acc + meal.calories,
      0
    );
    setTotalCaloriesConsumed(totalCaloriesConsumed);
    setCaloriesLeft(6000 - totalCaloriesConsumed);
    saveMealsForDate(selectedDate, updatedMeals);
  };

  const handleMealPress = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar navigation={navigation} />
        <View style={styles.sectionContainer}>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.caloriesLeftText}>{caloriesLeft} Kcal left</Text>
        </View>
        <View style={styles.sectionContainer}>
          <CalorieGraph
            data={{
              labels: ["Calories Left", "Calories Consumed"],
              datasets: [{ data: [caloriesLeft, totalCaloriesConsumed] }],
            }}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Daily Meals</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={mealName}
              onChangeText={setMealName}
              placeholder="Enter meal name"
              placeholderTextColor="#ccc"
            />
            <Button title="Add Meal" onPress={handleAddMeal} />
          </View>
          <FlatList
            data={meals}
            renderItem={({ item }) => (
              <View style={styles.mealContainer}>
                <TouchableOpacity onPress={() => handleMealPress(item)}>
                  <View style={styles.mealTextContainer}>
                    <Text style={styles.mealName}>{item.name}</Text>
                    <Text style={styles.mealCalories}>
                      {item.calories} Kcal
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteMeal(item)}>
                  <Ionicons name="trash" size={24} color="#F5F5F5" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.mealList}
          />
        </View>
        {selectedMeal && (
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedMeal.name}</Text>
                <PieChart
                  data={[
                    {
                      name: "% Protein",
                      amount: selectedMeal.protein,
                      color: "#FF6F61",
                      legendFontColor: "#F5F5F5",
                      legendFontSize: 15,
                    },
                    {
                      name: "% Carbs",
                      amount: selectedMeal.carbs,
                      color: "#0E76A8",
                      legendFontColor: "#F5F5F5",
                      legendFontSize: 15,
                    },
                    {
                      name: "% Fat",
                      amount: selectedMeal.fat,
                      color: "#FFB6C1",
                      legendFontColor: "#F5F5F5",
                      legendFontSize: 15,
                    },
                  ]}
                  width={Dimensions.get("window").width - 40}
                  height={220}
                  chartConfig={{
                    backgroundColor: "#1E1E1E",
                    backgroundGradientFrom: "#1E1E1E",
                    backgroundGradientTo: "#1E1E1E",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(245, 245, 245, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  accessor="amount"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#1E1E1E",
  },
  sectionContainer: {
    backgroundColor: "#333333",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  caloriesLeftText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#F5F5F5",
  },
  graphContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5F5F5",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#555",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#333",
    color: "#F5F5F5",
  },
  mealList: {
    marginBottom: 20,
  },
  mealContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#444444",
    padding: 10,
  },
  mealTextContainer: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    color: "#F5F5F5",
    fontWeight: "bold",
  },
  mealCalories: {
    fontSize: 14,
    color: "#F5F5F5",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5F5F5",
    marginBottom: 20,
  },
});

export default CalorieTrackerScreen;
