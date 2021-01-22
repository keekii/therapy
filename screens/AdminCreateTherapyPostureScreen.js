// components/login.js

import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

import Theme, { fontFamily } from "../constants/Theme";
import { Context as TherapyPostureContext } from "../context/TherapyPostureContext";
import { NavigationEvents } from "react-navigation";

const AdminCreateTherapyPostureScreen = ({ navigation }) => {
  const { storeTherapyPosture2, clearErrorMessage } = useContext(TherapyPostureContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");


  return (

    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={styles.logoContainer}>
        <Text style={styles.text}>Create new therapy posture</Text>
      </View>
      <View>
        <Text style={styles.inputTitle}>Therapy posture name</Text>
        <TextInput
          style={styles.input}
          placeholder="Input therapy posture name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Therapy posture description</Text>
        <TextInput
         style={styles.input}
         placeholder="Input therapy posture description"
         value={description}
         onChangeText={setDescription}
         autoCapitalize="none"
         autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Therapy posture thumbnail image</Text>
        <TextInput
          style={styles.input}
          placeholder="Input therapy posture thumbnail image source"
          value={thumbnail}
          onChangeText={setThumbnail}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Therapy posture thumbnail video</Text>
        <TextInput
          style={styles.input}
          placeholder="Input therapy posture video source"
          value={video}
          onChangeText={setVideo}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>
        
          
          <View style={styles.bottomBox}>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => storeTherapyPosture2(name,description,thumbnail,video)}
        >
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteContainer}
          title="Delete"
          onPress={() => navigation.pop()}
        >
          <Text style={styles.deleteText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    marginTop:10
  },
  text: {
    fontFamily,
    fontSize: 20,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 10,
  },
  logo: {
    height: 154,
    width: 154,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  submitContainer: {
    backgroundColor: "#62D3D9",
    height: 56,
    paddingVertical: 12,
    marginTop: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  logoContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  inputTitle: {
    color: "#1D2029",
    fontSize: 14,
    fontWeight: "600",
    fontFamily,
    marginTop: 32,
  },
  input: {
    paddingVertical: 12,
    color: "#1D2029",
    fontSize: 14,
    fontFamily,
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
});
export default AdminCreateTherapyPostureScreen;
