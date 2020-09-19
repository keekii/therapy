import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { List } from "react-native-paper";
import Theme, { fontFamily } from "../constants/Theme";

export default class PosturesList extends Component {
  render() {
    return (
      <List.Section>
        <List.Accordion
          title="Selected postures"
          style={{ backgroundColor: Theme.COLORS.INPUT_BG }}
          expanded={true}
        >
          <View
            style={{
              backgroundColor: Theme.COLORS.LIST_BG,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: Theme.COLORS.PRIMARY,
            }}
          >
            <FlatList
              style={styles.notificationList}
              data={this.state.usersArr}
              keyExtractor={(item) => {
                return item.key;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("PatientDetails", {
                        patientKey: item.key,
                        appointments: item.appointments,
                      });
                    }}
                  >
                    <View style={styles.notificationBox}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.profile_pic }}
                      />

                      <Text style={styles.name}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <List.Item title="1. Posture One" />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 16,
              }}
            >
              <Image
                style={[styles.thumbnail, styles.inputIcon]}
                source={require("../assets/thumbnail.jpg")}
              />
            </View>
          </View>
        </List.Accordion>
      </List.Section>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",

    backgroundColor: Theme.COLORS.WHITE,
  },
  topContainer: {
    marginTop: 60,
    marginHorizontal: 24,
  },
  bottomContainer: {
    margin: 24,
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
  topTitleText: {
    color: Theme.COLORS.WHITE,
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginBottom: 16,
  },
  topicText: {
    color: Theme.COLORS.WHITE,
    fontSize: 14,
    fontFamily,
    marginBottom: 16,
  },
  inputTitle: {
    color: Theme.COLORS.TITLE,
    fontSize: 14,
    fontWeight: "600",
    fontFamily,
    marginTop: 12,
  },
  input: {
    color: Theme.COLORS.WHITE,
    fontSize: 14,
    fontFamily,
  },
  submitContainer: {
    backgroundColor: Theme.COLORS.PRIMARY,
    height: 56,
    paddingVertical: 12,
    marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: Theme.COLORS.WHITE,
    fontWeight: "600",
    fontSize: 16,
  },
  inputBot: {
    paddingVertical: 12,
    color: Theme.COLORS.TITLE,
    fontSize: 14,
    fontFamily,
  },
  patientTitle: {
    color: Theme.COLORS.TITLE,
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
  },
  formContent: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: Theme.COLORS.INPUT_BG,
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginBottom: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: Theme.COLORS.WHITE,
    flex: 1,
  },
  inputIcon: {
    justifyContent: "center",
    marginLeft: 15,
  },
  thumbnail: {
    width: 99,
    height: 56,
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingVertical: 10,

    backgroundColor: Theme.COLORS.LIST_BG,
    flexDirection: "row",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.PRIMARY,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    color: Theme.COLORS.LABEL,
    marginLeft: 10,
    alignSelf: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  topContainer: {
    marginTop: 60,
    marginHorizontal: 24,
  },
  bottomContainer: {
    margin: 24,
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },

  modalText: {
    color: Theme.COLORS.LABEL,
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginBottom: 12,
    textAlign: "center",
  },

  inputTitle: {
    color: Theme.COLORS.TITLE,
    fontSize: 14,
    fontWeight: "600",
    fontFamily,
    marginTop: 12,
  },
  input: {
    color: Theme.COLORS.WHITE,
    fontSize: 14,
    fontFamily,
  },
  submitContainer: {
    backgroundColor: Theme.COLORS.PRIMARY,
    height: 56,
    width: "47%",
    padding: 12,
    marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: Theme.COLORS.WHITE,
    fontWeight: "600",
    fontSize: 16,
  },
  deleteContainer: {
    backgroundColor: Theme.COLORS.BUTTON_CANCEL,
    height: 56,
    width: "47%",
    padding: 12,
    marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: Theme.COLORS.CANCEL,
    fontWeight: "600",
    fontSize: 16,
  },
  inputBot: {
    paddingVertical: 12,
    color: Theme.COLORS.TITLE,
    fontSize: 14,
    fontFamily,
  },
  patientTitle: {
    color: Theme.COLORS.TITLE,
    fontSize: 16,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
  },
  formContent: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: Theme.COLORS.INPUT_BG,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginBottom: 16,
    padding: 14,
  },
  inputDetailsContainer: {
    backgroundColor: Theme.COLORS.INPUT_BG,
    height: 100,
    flexDirection: "row",
    flex: 1,
    marginBottom: 16,
    padding: 14,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: Theme.COLORS.WHITE,
    flex: 1,
  },
  inputIcon: {
    justifyContent: "center",
    marginLeft: 15,
  },
  thumbnail: {
    width: 99,
    height: 56,
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingVertical: 10,

    backgroundColor: Theme.COLORS.LIST_BG,
    flexDirection: "row",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.PRIMARY,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    color: Theme.COLORS.LABEL,
    marginLeft: 10,
    alignSelf: "center",
  },
  popup: {
    backgroundColor: Theme.COLORS.WHITE,
    marginTop: 140,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    //marginTop: 30,
  },
  popupContent: {
    //alignItems: 'center',
    margin: 36,
  },
  popupHeader: {
    marginBottom: 45,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
  },
  popupButton: {
    flex: 1,
    marginVertical: 16,
  },

  modalInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubmitContainer: {
    backgroundColor: Theme.COLORS.PRIMARY,
    height: 56,
    width: "47%",
    padding: 12,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  modalSubmitText: {
    color: Theme.COLORS.WHITE,
    fontWeight: "600",
    fontSize: 16,
  },
  modalDeleteContainer: {
    backgroundColor: Theme.COLORS.BUTTON_CANCEL,
    height: 56,
    width: "47%",
    padding: 12,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  modalDeleteText: {
    color: Theme.COLORS.CANCEL,
    fontWeight: "600",
    fontSize: 16,
  },
});
