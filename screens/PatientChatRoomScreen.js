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

const PatientChatRoomScreen = ({ navigation }) => {
  const { getPatientChatRoom, state } = useContext(ChatContext);
  const { chatRoom } = state;
  useEffect(() => {
    getPatientChatRoom();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>CHAT ROOM</Text>
        {/* <View style={styles.inputContainer}>
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
            onEndEditing={() => searchChatRoom(input)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View> */}
        <FlatList
          data={chatRoom}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PatientChat", {
                    key: item.key,
                    patient_name: item.patient_name,
                    therapist_name: item.therapist_name,
                    patient_uid: item.patient_uid,
                    therapist_uid: item.therapist_uid,
                  })
                }
              >
                <View style={styles.notificationBox}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                    }}
                  />

                  <Text style={styles.name}>{item.therapist_name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => navigation.navigate("PatientCreateChat")}
          >
            <Text style={styles.submitText}>Start new chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 20,
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
    marginBottom: 10,
  },
});
export default PatientChatRoomScreen;
