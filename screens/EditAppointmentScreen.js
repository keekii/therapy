import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import PatientList from "../components/PatientList";
import PostureList from "../components/PostureList";
import { fontFamily } from "../constants/Theme";
import { Context as CalendarContext } from "../context/CalendarContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

const EditAppointmentScreen = ({ navigation }) => {
  const {
    removePosture,
    getPatientList,
    state,
    setSelectedPatient,
    setInitial,
    editAppointment,
  } = useContext(CalendarContext);

  const { patients, selectedPatient, selected, appointmentData } = state;

  const {
    key,
    topic,
    date,
    start_time,
    end_time,
    patient,
    postures,
  } = appointmentData;

  const [_topic, setTopic] = useState(topic);
  const [_date, setDate] = useState(date);
  const [_startTime, setStartTime] = useState(start_time);
  const [_endTime, setEndTime] = useState(end_time);
  const [input, setInput] = useState("");
  const [initDate, _setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateTimeStatus, setDateTimeStatus] = useState(false);
  const [startTimeStatus, setStartTimeStatus] = useState(false);
  const [endTimeStatus, setEndTimeStatus] = useState(false);

  console.log(patients);

  useEffect(() => {
    let initPatient = [];
    initPatient = patient;
    setInitial(initPatient, postures);
    console.log(patients);
  }, []);

  const onDateTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || initDate;
    let date = currentDate;
    let correctDate = moment(date, "YYYY-MM-DDTHH: HH:mm").format("YYYY-MM-DD");
    setShow(Platform.OS === "ios");
    setDate(correctDate);
    _setDate(currentDate);
  };

  const onStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || initDate;
    let date = currentDate;
    let correctDate = moment(date, "YYYY-MM-DDTHH: HH:mm").format("HH.mm");
    correctDate;
    setShow(Platform.OS === "ios");
    setStartTime(correctDate);
    _setDate(currentDate);
  };

  const onEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || initDate;
    let date = currentDate;
    let correctDate = moment(date, "YYYY-MM-DDTHH: HH:mm").format("HH.mm");

    setShow(Platform.OS === "ios");
    setEndTime(correctDate);
    _setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDateTimepicker = () => {
    showMode("date");
    setDateTimeStatus(!dateTimeStatus);
  };

  const showStartTimepicker = () => {
    showMode("time");
    setEndTimeStatus(false);
    setStartTimeStatus(!startTimeStatus);
  };

  const showEndTimepicker = () => {
    showMode("time");
    setStartTimeStatus(false);
    setEndTimeStatus(!endTimeStatus);
  };

  const clickHandle = () => {
    _topic &&
    _date &&
    _startTime &&
    _endTime &&
    selectedPatient.length !== 0 &&
    selected
      ? editAppointment(
          key,
          _topic,
          _date,
          _startTime,
          _endTime,
          selectedPatient,
          selected
        )
      : Alert.alert("Error", "Please fill all form");
  };

  return (
    <>
      <View style={styles.topBox}>
        <Text style={styles.topLabel}>EDIT APPOINTMENTS</Text>
        <Text style={styles.topTitle}>Topic</Text>
        <TextInput
          style={styles.topInput}
          value={_topic}
          onChangeText={setTopic}
        ></TextInput>
        <View style={styles.topBorder}></View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.midBox}>
          <Text style={styles.label}> DATE </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}> {_date} </Text>
            <TouchableOpacity onPress={showDateTimepicker}>
              <AntDesign style={{ marginRight: 5 }} name="calendar" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.borderLine}></View>
          {dateTimeStatus && (
            <DateTimePicker
              testID="dateTimePicker"
              value={initDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onDateTimeChange}
            />
          )}
          <View style={styles.timeBox}>
            <View style={{ width: "50%", paddingRight: 20 }}>
              <Text style={styles.label}> START TIME </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}> {_startTime} </Text>
                <TouchableOpacity onPress={showStartTimepicker}>
                  <AntDesign
                    style={{ marginRight: 5 }}
                    name="calendar"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.borderLine}></View>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.label}> START TIME </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}> {_endTime} </Text>
                <TouchableOpacity onPress={showEndTimepicker}>
                  <AntDesign
                    style={{ marginRight: 5 }}
                    name="calendar"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.borderLine}></View>
            </View>
          </View>

          {startTimeStatus && (
            <DateTimePicker
              testID="dateTimePicker"
              value={initDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onStartTimeChange}
            />
          )}

          {endTimeStatus && (
            <DateTimePicker
              testID="dateTimePicker"
              value={initDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onEndTimeChange}
            />
          )}
          <PatientList
            result={patients}
            value={input}
            onChange={setInput}
            onSubmit={() => getPatientList(input, 5)}
            selected={setSelectedPatient}
          />
          {patients.length === 0 ? <Text>{state.errorMessage}</Text> : null}

          <PostureList
            value={selected}
            onRemove={removePosture}
            removeEnabled={true}
            textEnabled={true}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBox}>
        <TouchableOpacity
          style={styles.submitContainer}
          title="Submit"
          onPress={() => clickHandle()}
        >
          <Text style={styles.submitText}>Save</Text>
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
    flex: 1,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
  },
  inputContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
});

export default EditAppointmentScreen;
