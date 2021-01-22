import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import { Context as TherapyPostureContext } from "../context/TherapyPostureContext";
import Theme, { fontFamily } from "../constants/Theme";
import { ScrollView } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const AdminTherapyPostureDetailScreen = ({ navigation }) => {
  const { state, deleteTherapyPostureById2 } = useContext(TherapyPostureContext);
  const [therapyPosture, setTherapyPosture] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const data = navigation.getParam("data");
    setTherapyPosture(data);
  }, []);

  const setModalVisible = (visible) => {
    setModal(visible);
  };

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <View style={{ height: 224, marginBottom: 10 }}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri: therapyPosture.therapy_posture_video,
            }}
          />
        </View>

        <View>
          <Text
            style={{
              color: "#555555",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily,
              marginBottom: 12,
            }}
          >
            Therapy posture name
          </Text>
          <View
            style={{
              backgroundColor: "#F0EDED",

              alignItems: "left",
              justifyContent: "center",
              padding: 16,
              marginBottom: 12,
            }}
          >
            <Text>{therapyPosture.therapy_posture_name}</Text>
          </View>
          <Text
            style={{
              color: "#555555",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily,
              marginBottom: 12,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              color: "#555555",
              fontSize: 14,
              fontFamily,
              marginBottom: 8,
            }}
          >
            {therapyPosture.therapy_posture_description}
          </Text>

          <View style={styles.bottomBox}>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={() => navigation.navigate('EditTherapyPostureDetail', { data: therapyPosture })}
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
        </View>
      </View>
    </ScrollView>
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
             Do you want to delete this therapy posture ?
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
                 deleteTherapyPostureById2(therapyPosture['key']);
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

AdminTherapyPostureDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 24,
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#FFF",
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

export default AdminTherapyPostureDetailScreen;
