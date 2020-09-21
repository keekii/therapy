import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Image, Button } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Context as CalendarContext } from "../context/CalendarContext";
import { Context as AuthContext } from "../context/AuthContext";
import Theme, { fontFamily } from "../constants/Theme";
import { NavigationEvents } from "react-navigation";

const PatientScreen = ({ navigation }) => {
  const {
    getPatientList,
    state,
    clearPatient,
    getPatientListScreen,
  } = useContext(CalendarContext);
  const { signout } = useContext(AuthContext);
  const { patientScreen } = state;
  const [input, setInput] = useState("");

  // console.log("Patients ", state.patients);
  // console.log("Patients Screen ", patientScreen);
  useEffect(() => {
    getPatientListScreen("T", 10);
  }, [input]);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearPatient} />
      <Text style={styles.title}>PATIENT SEARCH</Text>

      <View style={styles.inputContainer}>
        <Image
          style={[styles.icon, styles.inputIcon]}
          source={require("../assets/search.png")}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Search"
          underlineColorAndroid="transparent"
          onChangeText={setInput}
          value={input}
          onEndEditing={() => getPatientList(input, 10)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={patientScreen}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.key + ":" + index}
              onPress={() =>
                navigation.navigate("PatientDetail", {
                  key: item.key,
                  name: item.name,
                  selected: item.isSelected,
                  profile: item.profile_pic,
                })
              }
            >
              <View style={styles.notificationBox}>
                <Image
                  style={styles.image}
                  source={{ uri: item.profile_pic }}
                />

                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Button title="Signout" onPress={signout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    flex: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
  },
  input: {
    paddingVertical: 12,
    color: "#1D2029",
    fontSize: 14,
    fontFamily,
  },
  title: {
    color: "#1D2029",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
  },
  inputContainer: {
    backgroundColor: Theme.COLORS.INPUT_BG,
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: Theme.COLORS.WHITE,
    flex: 1,
  },
  inputIcon: {
    justifyContent: "center",
    marginLeft: 15,
  },

  notificationBox: {
    paddingVertical: 10,

    backgroundColor: Theme.COLORS.LIST_BG,
    flexDirection: "row",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.PRIMARY,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    color: Theme.COLORS.LABEL,
    marginLeft: 10,
    alignSelf: "center",
  },
});

export default PatientScreen;
