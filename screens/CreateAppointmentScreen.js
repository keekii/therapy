import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import InputTextField from "../components/InputTextField";
import PatientList from "../components/PatientList";
import PostureList from "../components/PostureList";
import { fontFamily } from "../constants/Theme";
import { Context as CalendarContext } from "../context/CalendarContext";

const CreateAppointmentScreen = ({ navigation }) => {
  const { addPosture, removePosture, getPatientList, state } = useContext(
    CalendarContext
  );

  const [input, setInput] = useState("");

  useEffect(() => {
    getPatientList(input);
  }, []);

  const add = () => {
    addPosture([
      {
        key: "1",
        posture_id: "1",
        thumbnail: "../assets/thumbnail.jpg",
        posture_name: "Posture 1",
      },
      {
        key: "2",
        posture_id: "2",
        thumbnail: "../assets/thumbnail.jpg",
        posture_name: "Posture 2",
      },
      {
        key: "3",
        posture_id: "3",
        thumbnail: "../assets/thumbnail.jpg",
        posture_name: "Posture 3",
      },
    ]);
  };

  const newItem = (id) =>
    state.postures.filter((item) => item.posture_id !== id);
  console.log("Result ", newItem("2"));

  return (
    <>
      <View style={styles.topBox}>
        <Text style={styles.topLabel}>Create new appointments</Text>
        <Text style={styles.topTitle}>Topic</Text>
        <TextInput style={styles.topInput}></TextInput>
        <View style={styles.topBorder}></View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.midBox}>
          <InputTextField label="DATE" />
          <View style={styles.timeBox}>
            <View style={{ width: "50%", paddingRight: 20 }}>
              <InputTextField label="START TIME" />
            </View>
            <View style={{ width: "50%" }}>
              <InputTextField label="END TIME" />
            </View>
          </View>
          <PatientList
            result={state.patients}
            value={input}
            onChange={setInput}
            onSubmit={() => getPatientList(input)}
          />
          <Text>{state.errorMessage}</Text>
          <PostureList
            value={state.postures}
            onClickk={removePosture}
            add={add}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBox}>
        <TouchableOpacity style={styles.submitContainer} title="Submit">
          <Text style={styles.submitText}>Create</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  topBox: {
    backgroundColor: "#00CAD3",
    paddingHorizontal: 24,
  },
  midBox: {
    flex: 1,
    paddingHorizontal: 24,
  },
  bottomBox: {
    backgroundColor: "#FFF",
    padding: 24,
  },
  topLabel: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginBottom: 16,
  },
  topTitle: {
    color: "#FFF",
    fontSize: 14,
    fontFamily,
    marginBottom: 16,
  },
  inputTitle: {
    color: "#1D2029",
    fontSize: 14,
    fontWeight: "600",
    fontFamily,
    marginTop: 12,
  },
  topInput: {
    color: "#FFF",
    fontSize: 14,
    fontFamily,
  },
  submitContainer: {
    backgroundColor: "#00CAD3",
    height: 56,
    paddingVertical: 12,

    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  topBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
    marginBottom: 30,
  },
  timeBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CreateAppointmentScreen;
