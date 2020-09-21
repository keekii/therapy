import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, List } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import Theme, { fontFamily } from "../constants/Theme";
import { Context as CalendarContext } from "../context/CalendarContext";
import { FlatList } from "react-native-gesture-handler";

const TaskScreen = ({ navigation }) => {
  const { state, getTaskList, getPosture } = useContext(CalendarContext);
  const { tasks } = state;

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.patientTitle}>TASK DETAIL</Text>
        {tasks.length !== 0 ? (
          <View style={styles.listContainer}>
            <List.Section>
              <FlatList
                data={tasks}
                keyExtractor={(item) => {
                  return item.key;
                }}
                renderItem={({ item, index }) => {
                  return (
                    <List.Accordion
                      key={item.key + ":" + index}
                      title={item.date}
                      style={styles.headerContainer}
                    >
                      {item.postures &&
                        item.postures.map((posture, i) => {
                          if (posture) {
                            return (
                              <View
                                key={posture.name + ":" + i}
                                style={styles.postureContainer}
                              >
                                <List.Item title={posture.name} />
                                <View style={styles._itemContainer}>
                                  <Image
                                    style={[styles.thumbnail, styles.inputIcon]}
                                    source={require("../assets/thumbnail.jpg")}
                                  />
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate("TaskPostureDetail", {
                                        id: posture.key,
                                      })
                                    }
                                  >
                                    <Text style={styles.removeText}>View</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            );
                          } else {
                            return (
                              <View
                                key={posture + ":" + i}
                                style={styles.itemContainer}
                              >
                                <View style={styles.itemTitleContainer}>
                                  <Text style={styles.postureTitle}>
                                    {posture.name}
                                  </Text>

                                  <Rating
                                    type="star"
                                    startingValue={posture.rate}
                                    ratingColor="#f1c40f"
                                    ratingCount={5}
                                    imageSize={18}
                                    ratingBackgroundColor="#F3F3F3"
                                  />
                                </View>
                                <Text style={styles.commentTitle}>
                                  Comment:
                                </Text>
                                <View style={styles.commentContainer}>
                                  <Text style={styles.commentText}>
                                    {posture.comment}
                                  </Text>
                                </View>
                              </View>
                            );
                          }
                        })}
                    </List.Accordion>
                  );
                }}
              />
            </List.Section>
          </View>
        ) : (
          <Text>Hi edok not found baby</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: { backgroundColor: "#F0EDED", fontFamily },

  itemContainer: {
    backgroundColor: "#F3F3F3",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#00CAD3",
  },
  itemTitleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    //paddingRight: 16,
  },

  patientTitle: {
    color: "#1D2029",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginBottom: 10,
  },
  postureTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555555",
    fontFamily,
  },
  commentTitle: {
    fontSize: 12,
    color: "#555555",
    fontFamily,
  },
  commentContainer: {
    marginHorizontal: 18,
    marginVertical: 12,
    padding: 16,
    backgroundColor: "#FFF",
    height: 75,
  },
  commentText: {
    fontSize: 12,
    color: "#555555",
    fontFamily,
  },
  listContainer: {
    flex: 1,
  },

  postureContainer: {
    backgroundColor: "#F3F3F3",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#00CAD3",
  },
  _itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  inputIcon: {
    justifyContent: "center",
    marginLeft: 15,
  },
  thumbnail: {
    width: 99,
    height: 56,
  },
});

export default TaskScreen;
