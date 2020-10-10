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

import { fontFamily } from "../constants/Theme";
import InputTextField from "../components/InputTextField";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const PatientProfileScreen = ({ navigation }) => {
  const { getProfile, state, clearUser } = useContext(AuthContext);
  const { name, dateOfBirth, phone, profile_pic, sex } = state.userProfile;

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={getProfile} />
      <NavigationEvents onWillFocus={clearUser} />
      <View style={styles.topBox}>
        <Image
          style={styles.profilePic}
          source={{
            uri: profile_pic,
          }}
        ></Image>
        <Text style={styles.fullName}>{name}</Text>
      </View>

      <View style={styles.bottomBox}>
        <Text style={styles.titleText}>User Details</Text>
        <ScrollView style={styles.detailBox}>
          <InputTextField label="USER ID" data={name} edit={false} />
          <InputTextField label="MOBILE" data={phone} edit={false} />
          <InputTextField
            label="DATE OF BIRTH"
            data={dateOfBirth}
            edit={false}
          />
          <InputTextField label="SEX" data={sex} edit={false} />
        </ScrollView>

        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => navigation.navigate("PatientEditProfile")}
        >
          <Text style={styles.submitText}>Edit</Text>
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
    height: 120,
    width: 120,
    borderRadius: 100,
    marginTop: 30,
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
    marginVertical: 15,
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

export default PatientProfileScreen;
