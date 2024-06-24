import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalorieTrackerScreen from "./screens/CalorieTrackerScreen";
import CameraScreen from "./screens/CameraScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/Login/Login";
import SignupScreen from "./screens/Signup/Signup";
import PersonalInformationScreen from "./screens/Goals/PersonalInformationScreen";
import FitnessGoalsScreen from "./screens/Goals/FitnessGoalsScreen";
import CaloriesScreen from "./screens/Goals/CaloriesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Nutrition Track" component={CalorieTrackerScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformationScreen}
        />
        <Stack.Screen name="FitnessGoals" component={FitnessGoalsScreen} />
        <Stack.Screen name="Calories" component={CaloriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
