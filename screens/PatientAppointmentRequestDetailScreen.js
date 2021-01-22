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
import { Ionicons } from "@expo/vector-icons";
import { auth } from "firebase";

const PatientAppointmentRequestDetailScreen = ({ navigation }) => {
  const { state, deleteAppointmentRequestById } = useContext(
    CalendarContext
  );

  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const { data } = navigation.state.params;
    if (data) {
      setData(data)
    }
  }, []);

  const setModalVisible = (visible) => {
    setModal(visible);
  };

  return (
    <>
      <View style={styles.topBox}>
        <Text style={styles.topLabel}>APPOINTMENT REQUEST DETAILS</Text>
        <Text style={styles.topTitle}>Topic</Text>
        <TextInput style={styles.topInput} value={data['topic']}></TextInput>
        <View style={styles.topBorder}></View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.midBox}>
          <InputTextField label="DATE" data={data['date']} edit={false} />
          <View style={styles.timeBox}>
            <View style={{ width: "50%", paddingRight: 20 }}>
              <InputTextField
                label="START TIME"
                data={data['start_time']}
                edit={false}
              />
            </View>
            <View style={{ width: "50%" }}>
              <InputTextField label="END TIME" data={data['end_time']} edit={false} />
            </View>
          </View>
          <Text style={styles.title}>Patients</Text>
                  <View
                    style={styles.notificationBox}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: data['therapist'] && data['therapist']['profile_pic'] }}
                    />

                    <Text style={styles.name}>{data['therapist'] && data['therapist']['name']}</Text>
                  </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBox}>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => navigation.navigate("EditAppointmentRequest",{data})}
        >
          <Text style={styles.submitText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteContainer}
          title="Delete"
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Modal onRequestClose={() => setModalVisible(false)} visible={modal}>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 25,
              marginHorizontal: 25,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.modalText}>
                Do you want to delete this appointment request ?
              </Text>
              <Ionicons
                name="md-trash"
                size={30}
                color={Theme.COLORS.PRIMARY}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.modalDeleteContainer}
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalDeleteText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalSubmitContainer}
                  title="Submit"
                  onPress={() => {
                    setModalVisible(false);
                    deleteAppointmentRequestById(data['key']);
                  }}
                >
                  <Text style={styles.modalSubmitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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

export default PatientAppointmentRequestDetailScreen;
