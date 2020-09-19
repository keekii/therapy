import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Theme, { fontFamily } from "../constants/Theme";

const ProfileForm = ({ label, data, edit, onChange }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        editable={edit}
        onChangeText={onChange}
        value={data}
        autoCapitalize="none"
        autoCorrect={false}
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
    marginTop: 12,
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

export default ProfileForm;
