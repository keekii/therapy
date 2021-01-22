import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { fontFamily } from "../constants/Theme";
import { List } from "react-native-paper";

const PostureList = ({
  navigation,
  value,
  onRemove,
  removeEnabled,
  textEnabled,
}) => {
  const [collapse, setCollapse] = useState(true);

  const changeCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      {textEnabled === true ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Posture", { selected: value })}
        >
          <Text style={styles.link}>Posture List</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.title}>Posture List</Text>
      )}

      <List.Section>
        <List.Accordion
          title="Selected postures"
          style={{ backgroundColor: "#F0EDED" }}
          expanded={collapse}
          onPress={changeCollapse}
        >
          {value.map((item) => (
            <View key={item.key} style={styles.postureContainer}>
              <List.Item title={item.therapy_posture_name} />
              <View style={styles.itemContainer}>
                <Image
                  style={[styles.thumbnail, styles.inputIcon]}
                  source={{uri: item.therapy_posture_thumbnail_image}}
                />
                <TouchableOpacity onPress={() => onRemove(item.key)}>
                  {removeEnabled === true ? (
                    <Text style={styles.removeText}>Remove</Text>
                  ) : null}
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
    marginTop: 24,
    marginBottom: 10,
    fontSize: 16,
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
  title: {
    color: "#1D2029",
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
    marginBottom: 10,
  },
});

export default withNavigation(PostureList);
