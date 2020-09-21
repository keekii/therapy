import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import { Context as CalendarContext } from "../context/CalendarContext";
import Theme, { fontFamily } from "../constants/Theme";
import { ScrollView } from "react-native-gesture-handler";

const TaskPostureDetailScreen = ({ navigation }) => {
  const { state } = useContext(CalendarContext);
  const postures = state.tasks[0].postures;
  const currentPosture = postures.find(
    (posture) => posture.key === navigation.getParam("id")
  );
  const { comment, rate, key, name } = currentPosture;

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <View style={{ height: 224, marginBottom: 10 }}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri: currentPosture.vid,
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
            Posture name
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
            <Text>{currentPosture.name}</Text>
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
            {currentPosture.des}
          </Text>

          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() =>
              navigation.navigate("TaskEvaluate", {
                comment,
                key,
                name,
                rate,
              })
            }
          >
            <Text style={styles.submitText}>Next Step</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

TaskPostureDetailScreen.navigationOptions = () => {
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
  submitContainer: {
    backgroundColor: "#62D3D9",
    height: 56,
    paddingVertical: 12,
    marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default TaskPostureDetailScreen;
