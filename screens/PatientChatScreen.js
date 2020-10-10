import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
//import { useFocusEffect } from "react-navigation";
import { Context as ChatContext } from "../context/ChatContext";

const PatientChatScreen = ({ navigation }) => {
  const { state, getMessage, storeMessage } = useContext(ChatContext);
  const [id, setId] = useState("");
  const [patient_name, setPName] = useState("");
  const [therapist_name, setTName] = useState("");
  const [patient_uid, setPUId] = useState("");
  const [therapist_uid, setTUId] = useState("");
  const { message } = state;

  function handleSend(newMessage = []) {
    storeMessage(GiftedChat.append(message, newMessage), id);
  }

  useEffect(() => {
    const chatId = navigation.getParam("key");
    const patientName = navigation.getParam("patient_name");
    const therapistName = navigation.getParam("therapist_name");
    const patientUid = navigation.getParam("patient_uid");
    const therapistUid = navigation.getParam("therapist_uid");
    setId(chatId);
    setPName(patientName);
    setTName(therapistName);
    setPUId(patientUid);
    setTUId(therapistUid);

    getMessage(chatId);
  }, [message]);

  return (
    <>
      {/* <NavigationEvents
        onDidFocus={() => getMessage(navigation.getParam("key"))}
      /> */}

      <GiftedChat
        messages={message}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{ _id: patient_uid, name: patient_name }}
      />
    </>
  );
};

export default PatientChatScreen;
