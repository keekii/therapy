// components/login.js

import React, { useContext, useState } from "react";
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
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({ navigation }) => {
  const { signup, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  return (
    // <View style={styles.container}>
    //   <NavigationEvents onWillFocus={clearErrorMessage} />
    //   <AuthForm
    //     headerText="Sign up to Therapy App"
    //     buttonText="Sign up"
    //     errorMessage={state.errorMessage}
    //     onSubmit={signup}
    //     linkText="Already have account ? Click here to sign in."
    //     route="Signin"
    //   />
    // </View>
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={styles.logoContainer}>
        <Text style={styles.text}>Sign up to Therapy App</Text>
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

        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>

        <Text style={styles.inputTitle}>Role</Text>
        <TextInput
          style={styles.input}
          placeholder="Role"
          value={role}
          onChangeText={setRole}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <View
          style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}
        ></View>
        {email && name && password && role ? (
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => signup({ email, password, name, role })}
          >
            <Text style={styles.submitText}>Sign up</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
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
});
export default SignupScreen;
