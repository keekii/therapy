import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

import { fontFamily } from "../constants/Theme";
import NavLink from "./NavLink";

const AuthForm = ({
  headerText,
  buttonText,
  onSubmit,
  route,
  linkText,
  errorMessage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(errorMessage);
  return (
    <>
      <View style={styles.logoContainer}>
        <Text style={styles.text}>{headerText}</Text>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
      </View>
      <View>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          maxLength={15}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => onSubmit({ email, password })}
        >
          <Text style={styles.submitText}>{buttonText}</Text>
        </TouchableOpacity>
        <NavLink text={linkText} routeName={route} />
        <Text>{errorMessage}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily,
    fontSize: 20,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 46,
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
});

export default AuthForm;
