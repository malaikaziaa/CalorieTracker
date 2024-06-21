import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalorieTrackerScreen from "./screens/CalorieTrackerScreen";
import CameraScreen from "./screens/CameraScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nutrition Track">
        <Stack.Screen name="Nutrition Track" component={CalorieTrackerScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
