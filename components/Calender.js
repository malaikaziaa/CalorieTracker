import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import moment from "moment";

const days = ["S", "M", "T", "W", "T", "F", "S"];

const Calendar = ({ selectedDate, onDateSelect }) => {
  const today = moment();
  const dates = Array.from({ length: 30 }, (_, i) => today.clone().add(i, "days"));

  return (
    <FlatList
      horizontal
      data={dates}
      keyExtractor={(item) => item.format("YYYY-MM-DD")}
      renderItem={({ item }) => {
        const isSelected = item.isSame(selectedDate, "day");
        return (
          <TouchableOpacity
            onPress={() => onDateSelect(item)}
            style={[styles.dateContainer, isSelected && styles.selectedDate]}
          >
            <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
              {days[item.day()]}
            </Text>
            <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
              {item.format("D")}
            </Text>
          </TouchableOpacity>
        );
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.calendarContainer}
    />
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    paddingVertical: 10,
  },
  dateContainer: {
    alignItems: "center",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  selectedDate: {
    backgroundColor: "#1E90FF",
  },
  dayText: {
    color: "#000",
  },
  dateText: {
    color: "#000",
    fontSize: 16,
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedDateText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Calendar;
