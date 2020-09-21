import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import firebase from "../database/firebase";

import Theme, { fontFamily } from "../constants/Theme";
import InputTextField from "../components/InputTextField";
import { TextInput } from "react-native-paper";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as CalendarContext } from "../context/CalendarContext";
import { NavigationEvents } from "react-navigation";

const EditProfileScreen = ({ navigation }) => {
  const { updateProfile, state } = useContext(AuthContext);
  const { name, dateOfBirth, phone } = state.userProfile;
  const [displayName, setDisplayName] = useState(name);
  const [email, setEmail] = useState("keekii@gmail.com");
  const [mobile, setMobile] = useState(phone);
  const [date, setDateOfBirth] = useState(dateOfBirth);
  const [sex, setSex] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Image
          style={styles.profilePic}
          source={{
            uri:
              "https://www.seekpng.com/png/full/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png",
          }}
        ></Image>
        <Text style={styles.fullName}>KEEKII</Text>
      </View>

      <View style={styles.bottomBox}>
        <Text style={styles.titleText}>User Details</Text>
        <ScrollView style={styles.detailBox}>
          <InputTextField
            label="USER ID"
            data={displayName}
            edit={true}
            onChange={setDisplayName}
          />
          <InputTextField
            label="EMAIL"
            data={email}
            edit={true}
            onChange={setEmail}
          />
          <InputTextField
            label="MOBILE"
            data={mobile}
            edit={true}
            onChange={setMobile}
          />
          <InputTextField
            label="DATE OF BIRTH"
            data={date}
            edit={true}
            onChange={setDateOfBirth}
          />
        </ScrollView>

        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => updateProfile(displayName, dateOfBirth, mobile)}
        >
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginTop: 40,
  },
  detailBox: {
    flex: 1,
    marginHorizontal: 15,
  },
  topBox: {
    flex: 3,
    backgroundColor: "#00CAD3",
    height: 250,
    alignItems: "center",
  },
  bottomBox: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    flex: 5,
    bottom: 20,
  },

  fullName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
    fontFamily,
    marginVertical: 24,
    textAlign: "center",
  },
  titleText: {
    color: "#1D2029",
    fontSize: 20,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
    textAlign: "center",
  },
  submitContainer: {
    backgroundColor: "#62D3D9",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default EditProfileScreen;
