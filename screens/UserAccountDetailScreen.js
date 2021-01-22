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
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

const UserAccountDetailScreen = ({ navigation }) => {
  const { clearErrorMessage, storeUserAccount } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = navigation.getParam("data");
    setName(data['name']);
    setSurname(data['surname']);
    setId(data['id']);
    setPhone(data['phone']);
    setAddress(data['address']);
    setDob(data['dob']);
    setGender(data['gender']);
    setUser(data)
  }, []);

  const setModalVisible = (visible) => {
    setModal(visible);
  };

  return (

    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={styles.logoContainer}>
        <Text style={styles.text}>USER ACCOUNT DETAILS</Text>
      </View>
      <ScrollView>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Input name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>
        <Text style={styles.inputTitle}>Surname</Text>
        <TextInput
          style={styles.input}
          placeholder="Input surname"
          value={surname}
          onChangeText={setSurname}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>
        <Text style={styles.inputTitle}>ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Input id"
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={13}
          editable={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Input phone number"
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Input address"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Date of birth</Text>
        <TextInput
          style={styles.input}
          placeholder="Input date of birth"
          value={dob}
          onChangeText={setDob}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>
        <Text style={styles.inputTitle}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Input gender"
          value={gender}
          onChangeText={setGender}
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <View style={styles.bottomBox}>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => navigation.navigate('EditUserAccountDetail', { data: user })}
          >
            <Text style={styles.submitText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteContainer}
            title="Delete"
            onPress={() => navigation.pop()}
          >
            <Text style={styles.deleteText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    marginTop: 10
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
export default UserAccountDetailScreen;
