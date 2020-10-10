import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme, { fontFamily } from "../constants/Theme";

import { Context as ChatContext } from "../context/ChatContext";

const PatientCreateChatScreen = ({ navigation }) => {
  const {
    getTherapistListByName,
    state,
    getTherapistList,
    setSelected,
    createPatientChatRoom,
  } = useContext(ChatContext);
  const { userList, selectedUser } = state;
  const [input, setInput] = useState("");

  useEffect(() => {
    getTherapistList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>THERAPIST SEARCH</Text>
      <View style={styles.inputContainer}>
        <Image
          style={[styles.icon, styles.inputIcon]}
          source={require("../assets/search.png")}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Search"
          underlineColorAndroid="transparent"
          onChangeText={setInput}
          value={input}
          onEndEditing={() => getTherapistListByName(input)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => setSelected(item.uid)}>
              {console.log(item.isSelected)}
              <View
                style={
                  item.isSelected === false
                    ? styles.notificationBox
                    : styles.notificationBoxSelected
                }
              >
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                  }}
                />

                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {selectedUser !== undefined ? (
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => createPatientChatRoom(selectedUser)}
        >
          <Text style={styles.submitText}>Create</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Theme.COLORS.INPUT_BG,
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: Theme.COLORS.WHITE,
    flex: 1,
  },
  inputIcon: {
    justifyContent: "center",
    marginLeft: 15,
  },
  notificationBox: {
    paddingVertical: 10,

    backgroundColor: Theme.COLORS.LIST_BG,
    flexDirection: "row",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.PRIMARY,
  },

  notificationBoxSelected: {
    paddingVertical: 10,

    backgroundColor: Theme.COLORS.LIST_BG,
    flexDirection: "row",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "red",
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
  submitContainer: {
    backgroundColor: "#62D3D9",
    height: 56,
    paddingVertical: 12,
    marginVertical: 12,

    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  title: {
    color: "#1D2029",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginTop: 20,
  },
});
export default PatientCreateChatScreen;
