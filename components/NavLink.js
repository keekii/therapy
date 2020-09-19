import React from "react";
import { Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <>
      <Text style={styles.text} onPress={() => navigation.navigate(routeName)}>
        {text}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
});

export default withNavigation(NavLink);
