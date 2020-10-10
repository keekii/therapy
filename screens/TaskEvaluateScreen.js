import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Theme, { fontFamily } from "../constants/Theme";
import { Context as CalendarContext } from "../context/CalendarContext";
import { Rating, AirbnbRating } from "react-native-ratings";
import { TextInput } from "react-native-paper";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskEvaluateScreen = ({ navigation }) => {
  const { state, setEvaluateValue, storeEvaluate } = useContext(
    CalendarContext
  );
  const _comment = navigation.getParam("comment");
  const _key = navigation.getParam("key");
  const _name = navigation.getParam("name");
  const _rate = navigation.getParam("rate");
  const { tasks, evaluatePostures, index, currentTaskId } = state;
  const [rating, setRating] = useState(_rate);
  const [input, setInput] = useState(_comment);

  useEffect(() => {
    const testData = tasks.find((item) => item.key === currentTaskId);
    const newPosture = testData.postures;
    const eleIndex = newPosture.findIndex((e) => e.key === _key);
    setEvaluateValue(newPosture, eleIndex);
  }, []);

  const setValue = (rating, comment) => {
    let data = evaluatePostures;
    data[index] = {
      ...data[index],
      rate: rating,
      comment: comment,
    };
    setEvaluateValue(data);
    storeEvaluate(data, currentTaskId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>TASK EVALUATE</Text>
      <Text style={styles.subTitleText}>{_name}</Text>
      <Rating
        style={styles.rating}
        type="star"
        startingValue={rating}
        ratingColor="#f1c40f"
        ratingCount={5}
        imageSize={35}
        onFinishRating={setRating}
        ratingBackgroundColor="#F3F3F3"
      />
      <Text style={styles.subTitleText}>Comment:</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {rating && input ? (
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={() => setValue(rating, input)}
        >
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    color: "#1D2029",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginBottom: 10,
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
  input: {
    height: 150,
    marginTop: 10,
  },
  rating: {
    marginVertical: 30,
  },
  subTitleText: {
    color: "#1D2029",
    fontSize: 14,

    fontFamily,
  },
});
export default TaskEvaluateScreen;
