import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PatientScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>AppointmentDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontSize: 36,
  },
});

export default PatientScreen;
