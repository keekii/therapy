import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import { Context as CalendarContext } from "../context/CalendarContext";
import Theme, { fontFamily } from "../constants/Theme";
import { ScrollView } from "react-native-gesture-handler";

const TaskPostureDetailScreen = ({ navigation }) => {
  const { state, setCurrentTaskId, getPosture } = useContext(CalendarContext);

  useEffect(() => {
    getPosture();
    const task_id = navigation.getParam("task_id");
    setCurrentTaskId(task_id);
  }, []);

  const currentPosture = state.postures.find(
    (posture) => posture.key === navigation.getParam("id")
  );

  return (
    <ScrollView style={styles.container}>
      {currentPosture ? (
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
                navigation.navigate("PatientTaskEvaluate", {
                  name: currentPosture.name,
                  key: currentPosture.key,
                })
              }
            >
              <Text style={styles.submitText}>Next Step</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
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
