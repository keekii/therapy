Updateimport React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default class AdminBar extends Component {
  constructor(props) {
    super(props);

    this.buttons = [
      {
        up: "user",
        up_color: "#949494",
        selected: "user",
        selected_color: "#616161",
        text: "USER",
      },
      {
        up: "hearto",
        up_color: "#949494",
        selected: "hearto",
        selected_color: "#616161",
        text: "POSTURE",
      },
      {
        up: "profile",
        up_color: "#949494",
        selected: "profile",
        selected_color: "#616161",
        text: "PROFILE",
      },
    ];
    this.props.selectedIndex = 0;
  }

  handlePress = (selectedIndex) => {
    //console.log("handlePress: " + selectedIndex);
    if (this.props.onStatusChanged) {
      this.props.onStatusChanged(selectedIndex);
    }
  };

  render() {
    const i = this.props.selectedIndex;

    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 7,
        }}
      >
        {this.buttons.map((value, index) => {
          return (
            <TouchableOpacity
              style={styles.button}
              key={index}
              onPress={() => this.handlePress(index)}
            >
              <AntDesign
                name={i == index ? value.selected : value.up}
                size={30}
                color={i == index ? value.selected_color : value.up_color}
              />
              {i == index ? (
                <Text
                  style={{
                    color: value.selected_color,
                    fontWeight: "400",
                    fontSize: 12,
                  }}
                >
                  {value.text}
                </Text>
              ) : (
                <Text
                  style={{
                    color: value.up_color,
                    fontWeight: "400",
                    fontSize: 12,
                  }}
                >
                  {value.text}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
});
