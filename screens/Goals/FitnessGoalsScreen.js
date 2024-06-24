import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const FitnessGoalsScreen = ({ navigation }) => {
  const [weightGoal, setWeightGoal] = useState("");
  const [muscleGoal, setMuscleGoal] = useState("");
  const [enduranceGoal, setEnduranceGoal] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleNext = () => {
    // Validate and navigate to the next screen
    if (weightGoal === "" || muscleGoal === "" || enduranceGoal === "") {
      setModalMessage("Please fill all the fields.");
      setModalVisible(true);
    } else {
      navigation.navigate("Calories");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fitness Goals</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Weight Goal</Text>
        <Picker
          selectedValue={weightGoal}
          style={styles.picker}
          onValueChange={(itemValue) => setWeightGoal(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select" value="" color="#000" />
          <Picker.Item label="Weight Loss" value="weight_loss" color="#000" />
          <Picker.Item label="Weight Gain" value="weight_gain" color="#000" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Muscle Goal</Text>
        <Picker
          selectedValue={muscleGoal}
          style={styles.picker}
          onValueChange={(itemValue) => setMuscleGoal(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select" value="" color="#000" />
          <Picker.Item label="Muscle Gain" value="muscle_gain" color="#000" />
          <Picker.Item label="Tone Muscles" value="tone_muscles" color="#000" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Endurance Goal</Text>
        <Picker
          selectedValue={enduranceGoal}
          style={styles.picker}
          onValueChange={(itemValue) => setEnduranceGoal(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select" value="" color="#000" />
          <Picker.Item
            label="Improve Endurance"
            value="improve_endurance"
            color="#000"
          />
          <Picker.Item
            label="Maintain Endurance"
            value="maintain_endurance"
            color="#000"
          />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>OOPS!</Text>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  pickerContainer: {
    width: "100%",
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  picker: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  pickerItem: {
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default FitnessGoalsScreen;
