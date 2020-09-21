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
  const {
    removePosture,
    getPatientList,
    state,
    setSelectedPatient,
    storeAppointment,
  } = useContext(CalendarContext);

  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [input, setInput] = useState("");

  const { patients, selectedPatient, selected } = state;

  useEffect(() => {
    getPatientList(input, 5);
  }, []);

  return (
    <>
      <View style={styles.topBox}>
        <Text style={styles.topLabel}>CREATE NEW APPOINTMENTS</Text>
        <Text style={styles.topTitle}>Topic</Text>
        <TextInput
          style={styles.topInput}
          value={topic}
          onChangeText={setTopic}
        ></TextInput>
        <View style={styles.topBorder}></View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.midBox}>
          <InputTextField label="DATE" data={date} onChange={setDate} />
          <View style={styles.timeBox}>
            <View style={{ width: "50%", paddingRight: 20 }}>
              <InputTextField
                label="START TIME"
                data={startTime}
                onChange={setStartTime}
              />
            </View>
            <View style={{ width: "50%" }}>
              <InputTextField
                label="END TIME"
                data={endTime}
                onChange={setEndTime}
              />
            </View>
          </View>
          <PatientList
            result={patients}
            value={input}
            onChange={setInput}
            onSubmit={() => getPatientList(input, 5)}
            selected={setSelectedPatient}
          />
          <Text>{state.errorMessage}</Text>
          <PostureList
            value={selected}
            onRemove={removePosture}
            textEnabled={true}
            removeEnabled={true}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBox}>
        <TouchableOpacity
          style={styles.submitContainer}
          title="Submit"
          onPress={() =>
            storeAppointment(
              topic,
              date,
              startTime,
              endTime,
              selectedPatient,
              selected
            )
          }
        >
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
