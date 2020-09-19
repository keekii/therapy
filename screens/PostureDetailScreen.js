import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import { Context as CalendarContext } from "../context/CalendarContext";
import Theme, { fontFamily } from "../constants/Theme";
import { ScrollView } from "react-native-gesture-handler";

const PostureDetailScreen = ({ navigation }) => {
  const { state } = useContext(CalendarContext);
  const postures = state.postures.find(
    (posture) => posture.key === navigation.getParam("id")
  );
  console.log(postures);
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <View style={{ height: 224, marginBottom: 10 }}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri: postures.vid,
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
            <Text>{postures.name}</Text>
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
            {postures.des}
          </Text>

          <TouchableOpacity
            style={styles.submitContainer}
            title="Save"
            onPress={() => navigation.navigate("Posture")}
          >
            <Text style={styles.submitText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

PostureDetailScreen.navigationOptions = () => {
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

export default PostureDetailScreen;
