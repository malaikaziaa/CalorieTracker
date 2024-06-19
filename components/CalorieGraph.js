import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const CalorieGraph = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: "rgba(47, 79, 79, 1)", // Dark Slate Gray background
    backgroundGradientFromOpacity: 0.3,
    backgroundGradientTo: "rgba(47, 79, 79, 1)",
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(210, 240, 240, ${opacity})`,
    // White for bars
    strokeWidth: 5,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontSize: 12,
      color: "rgba(0, 0, 139, 1)", // Dark Blue for labels
      fontWeight: "bold",
    },
    propsForVerticalLabels: {
      fontSize: 13,
      color: "rgba(255, 255, 255, 1)", // White for vertical labels
      fontWeight: "bold",
    },
    propsForHorizontalLabels: {
      fontSize: 12,
      color: "rgba(255, 255, 255, 1)", // White for horizontal labels
      fontWeight: "bold",
    },
  };

  return (
    <BarChart
      data={data}
      width={screenWidth * 0.9}
      height={220}
      chartConfig={chartConfig}
      fromZero
      showValuesOnTopOfBars
    />
  );
};

export default CalorieGraph;
