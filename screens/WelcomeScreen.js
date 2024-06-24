import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/welcomeImage.png")}
        style={styles.logo}
      />
      <Text style={styles.appName}>FAST APP</Text>
      <Text style={styles.appDes}>
        The wave of fitness and healthy living is here, and it's not just a
        trend - it's a lifestyle shift. In today's world, fitness apps have made
        healthy lifestyles more accessible and engaging than ever before.
      </Text>
      <View style={styles.optionsView}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.Regtext}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.Regtext}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    color: "black",
  },
  appDes: {
    fontSize: 20,
    color: "black",
    textAlign: "auto",
  },
  optionsView: {
    marginTop: 40,
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Regtext: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  button: {
    width: "40%",
    height: 70,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
