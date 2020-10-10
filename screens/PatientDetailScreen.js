import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import Theme, { fontFamily } from "../constants/Theme";
import { ListItem } from "react-native-elements";
import { navigate } from "../navigationRef";
import { Context as CalendarContext } from "../context/CalendarContext";
import { FlatList } from "react-native-gesture-handler";
import { NavigationEvents } from "react-navigation";

const PatientDetailScreen = ({ navigation }) => {
  useEffect(() => {
    const key = navigation.getParam("key");
    getPatientDetail(key);
  }, []);

  const { getPatientDetail, state, clearPerson } = useContext(CalendarContext);
  const { person } = state;

  return (
    <>
      <NavigationEvents onWillFocus={clearPerson} />
      <View style={styles.container}>
        <Text style={styles.patientTitle}>Patient Details</Text>
        {person.length !== 0 ? (
          <View style={styles.listContainer}>
            <List.Section>
              <FlatList
                data={person}
                keyExtractor={(item) => {
                  return item.key;
                }}
                renderItem={({ item, index }) => {
                  return (
                    <List.Accordion
                      key={item.date + ":" + index}
                      title={item.date}
                      style={styles.headerContainer}
                    >
                      {item.postures &&
                        item.postures.map((posture, i) => (
                          <View
                            key={posture.key + ":" + i}
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
                                readonly={true}
                              />
                            </View>
                            <Text style={styles.commentTitle}>Comment:</Text>
                            <View style={styles.commentContainer}>
                              <Text style={styles.commentText}>
                                {posture.comment}
                              </Text>
                            </View>
                          </View>
                        ))}
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
});

export default PatientDetailScreen;
