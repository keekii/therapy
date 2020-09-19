import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { fontFamily } from "../constants/Theme";
import { List } from "react-native-paper";

const PostureList = ({ navigation, value, onClickk, add }) => {
  const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState([]);

  const onClick = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <TouchableOpacity onPress={add}>
        <Text style={styles.link}>Add therapy posture</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Posture")}>
        <Text style={styles.link}>Posture List</Text>
      </TouchableOpacity>
      <List.Section>
        <List.Accordion
          title="Selected postures"
          style={{ backgroundColor: "#F0EDED" }}
          expanded={collapse}
          onPress={onClick}
        >
          {value.map((item) => (
            <View key={item.key} style={styles.postureContainer}>
              <List.Item title={item.posture_name} />
              {/* {console.log(item.posture_id)} */}
              <View style={styles.itemContainer}>
                <Image
                  style={[styles.thumbnail, styles.inputIcon]}
                  source={require("../assets/thumbnail.jpg")}
                />
                <TouchableOpacity onPress={() => onClickk(item.posture_id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </List.Accordion>
      </List.Section>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    marginVertical: 24,
    fontSize: 14,
    fontWeight: "600",
    fontFamily,
    textDecorationLine: "underline",
  },
  inputIcon: {
    justifyContent: "center",
    marginLeft: 15,
  },
  thumbnail: {
    width: 99,
    height: 56,
  },
  postureContainer: {
    backgroundColor: "#F3F3F3",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#00CAD3",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  removeText: {
    fontSize: 12,
    textDecorationLine: "underline",
    textDecorationColor: "#555555",
    color: "#555555",
  },
});

export default withNavigation(PostureList);
