import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const PersonalInformationScreen = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleNext = () => {
    // Validate fields
    if (!age || !gender || !weight || !height) {
      setModalMessage("Please fill all the fields.");
      setModalVisible(true);
      return;
    }
    if (isNaN(age) || age <= 0) {
      setModalMessage("Please enter a valid age.");
      setModalVisible(true);
      return;
    }
    if (gender === "select") {
      setModalMessage("Please select a valid gender.");
      setModalVisible(true);
      return;
    }
    if (isNaN(weight) || weight <= 0) {
      setModalMessage("Please enter a valid weight.");
      setModalVisible(true);
      return;
    }
    if (isNaN(height) || height <= 0) {
      setModalMessage("Please enter a valid height.");
      setModalVisible(true);
      return;
    }

    // Navigate to the next screen
    navigation.navigate("FitnessGoals");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select" value="select" color="#000" />
          <Picker.Item label="Male" value="male" color="#000" />
          <Picker.Item label="Female" value="female" color="#000" />
          <Picker.Item label="Other" value="other" color="#000" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        placeholderTextColor="#000"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
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

export default PersonalInformationScreen;
