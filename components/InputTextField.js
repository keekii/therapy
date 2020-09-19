import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { fontFamily } from "../constants/Theme";

const InputTextField = ({ label, data, edit, onChange }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        editable={edit}
        onChangeText={onChange}
        value={data}
      ></TextInput>
      <View style={styles.borderLine}></View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#1D2029",
    fontSize: 14,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
  },
  input: {
    paddingVertical: 12,
    color: "#1D2029",
    fontSize: 14,
    fontFamily,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
  },
});

export default InputTextField;
