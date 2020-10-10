import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Modal } from "react-native-paper";
import InputTextField from "../components/InputTextField";
import PostureList from "../components/PostureList";
import Theme, { fontFamily } from "../constants/Theme";
import { Context as CalendarContext } from "../context/CalendarContext";

const PatientAppointmentDetailScreen = ({ navigation }) => {
  const { state, getAppointmentById, deleteAppointment } = useContext(
    CalendarContext
  );
  const { appointmentData } = state;
  const {
    key,
    topic,
    date,
    start_time,
    end_time,
    patient,
    postures,
  } = appointmentData;

  console.log(patient);

  useEffect(() => {
    getAppointmentById(navigation.getParam("key"));
  }, []);

  const setModalVisible = (visible) => {
    setModal(visible);
  };

  return (
    <>
      <View style={styles.topBox}>
        <Text style={styles.topLabel}>APPOINTMENTS DETAIL</Text>
        <Text style={styles.topTitle}>Topic</Text>
        <TextInput style={styles.topInput} value={topic}></TextInput>
        <View style={styles.topBorder}></View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.midBox}>
          <InputTextField label="DATE" data={date} edit={false} />
          <View style={styles.timeBox}>
            <View style={{ width: "50%", paddingRight: 20 }}>
              <InputTextField
                label="START TIME"
                data={start_time}
                edit={false}
              />
            </View>
            <View style={{ width: "50%" }}>
              <InputTextField label="END TIME" data={end_time} edit={false} />
            </View>
          </View>
          <Text style={styles.title}>Patients</Text>
          {patient
            ? patient.map((item, index) => {
                return (
                  <View
                    key={item.profile_pic + ":" + index}
                    style={styles.notificationBox}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: item.profile_pic }}
                    />

                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                );
              })
            : null}

          <PostureList
            value={postures}
            removeEnabled={false}
            textEnabled={false}
          />
        </View>
      </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FFF",
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
    backgroundColor: Theme.COLORS.PRIMARY,
    height: 56,
    width: "47%",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteContainer: {
    backgroundColor: Theme.COLORS.BUTTON_CANCEL,
    height: 56,
    width: "47%",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: Theme.COLORS.CANCEL,
    fontWeight: "600",
    fontSize: 16,
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
  title: {
    color: "#1D2029",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
    marginBottom: 10,
  },

  modalSubmitContainer: {
    backgroundColor: Theme.COLORS.PRIMARY,
    height: 56,
    width: "47%",
    padding: 12,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubmitText: {
    color: Theme.COLORS.WHITE,
    fontWeight: "600",
    fontSize: 16,
  },
  modalDeleteContainer: {
    backgroundColor: Theme.COLORS.BUTTON_CANCEL,
    height: 56,
    width: "47%",
    padding: 12,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  modalDeleteText: {
    color: Theme.COLORS.CANCEL,
    fontWeight: "600",
    fontSize: 16,
  },
  modalText: {
    color: Theme.COLORS.LABEL,
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginBottom: 12,
    textAlign: "center",
  },
});

export default PatientAppointmentDetailScreen;
