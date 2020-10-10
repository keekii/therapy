import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";

import Theme, { fontFamily } from "../constants/Theme";
import InputTextField from "../components/InputTextField";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

import firebase from "../database/firebase";

const PatientEditProfileScreen = ({ navigation }) => {
  const { patientUpdateProfile, state, clearUser, signout } = useContext(
    AuthContext
  );
  const { name, dateOfBirth, phone, profile_pic, sex } = state.userProfile;
  const [displayName, setDisplayName] = useState(name);
  const [mobile, setMobile] = useState(phone);
  const [date, setDateOfBirth] = useState(dateOfBirth);
  const [_date, _setDate] = useState(new Date(1598051730000));
  const [_sex, setSex] = useState(sex);
  const [image, setImage] = useState(profile_pic);
  const [realUrl, setRealUrl] = useState(profile_pic);
  const [dateTimeStatus, setDateTimeStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [switchMaleVal, setMaleSwitchVal] = useState(false);
  const [switchFemaleVal, setFemaleSwitchVal] = useState(false);

  useEffect(() => {
    _sex === "Male" ? setMaleSwitchVal(true) : setFemaleSwitchVal(true);
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onDateTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || _date;
    let date = currentDate;
    let correctDate = moment(date, "YYYY-MM-DDTHH: HH:mm").format("YYYY-MM-DD");
    setShow(Platform.OS === "ios");
    setDateOfBirth(correctDate);
    _setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDateTimepicker = () => {
    showMode("date");
    setDateTimeStatus(!dateTimeStatus);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.uri);
    const uid = firebase.auth().currentUser.uid;

    if (result.cancelled === false) {
      uploadImage(result.uri, uid).then((res) => {});
      const ref = firebase
        .storage()
        .ref()
        .child("images/" + uid);
      await ref.getDownloadURL().then((i) => setRealUrl(i));
    }
  };

  const toggleMaleSwitch = () => {
    setMaleSwitchVal(!switchMaleVal);
    setFemaleSwitchVal(false);
    setSex("Male");
  };

  const toggleFemaleSwitch = () => {
    setFemaleSwitchVal(!switchFemaleVal);
    setMaleSwitchVal(false);
    setSex("Female");
  };

  const uploadImage = async (uri, name) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child("images/" + name);

    return ref.put(blob);
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearUser} />
      <View style={styles.topBox}>
        <TouchableOpacity onPress={() => pickImage()}>
          <Image
            style={styles.profilePic}
            source={{
              uri: image,
            }}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBox}>
        <Text style={styles.titleText}>Edit Details</Text>
        <ScrollView style={styles.detailBox}>
          <InputTextField
            label="DISPLAY NAME :"
            data={displayName}
            edit={true}
            onChange={setDisplayName}
          />
          <InputTextField
            label="MOBILE :"
            data={mobile}
            edit={true}
            onChange={setMobile}
          />
          <Text style={styles.label}> DATE : </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.input}> {date} </Text>
            <TouchableOpacity onPress={showDateTimepicker}>
              <AntDesign style={{ marginRight: 5 }} name="calendar" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.borderLine}></View>
          {dateTimeStatus && (
            <DateTimePicker
              testID="dateTimePicker"
              value={_date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onDateTimeChange}
            />
          )}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: 30,

              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#1D2029",
                fontSize: 14,
                fontWeight: "600",
                fontFamily,
                marginRight: 15,
              }}
            >
              SEX :
            </Text>
            <Text
              style={{
                color: "#1D2029",
                fontSize: 14,
                fontWeight: "600",
                fontFamily,
                marginRight: 10,
              }}
            >
              Male
            </Text>
            <Switch value={switchMaleVal} onValueChange={toggleMaleSwitch} />
            <Text
              style={{
                color: "#1D2029",
                fontSize: 14,
                fontWeight: "600",
                fontFamily,
                marginHorizontal: 10,
              }}
            >
              Female
            </Text>
            <Switch
              value={switchFemaleVal}
              onValueChange={toggleFemaleSwitch}
            />
          </View>
        </ScrollView>

        <View style={styles._bottomBox}>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() =>
              patientUpdateProfile(displayName, date, mobile, realUrl, _sex)
            }
          >
            <Text style={styles.submitText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteContainer}
            title="Delete"
            onPress={signout}
          >
            <Text style={styles.deleteText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 100,
    marginTop: 30,
  },
  detailBox: {
    flex: 1,
    marginHorizontal: 15,
  },
  topBox: {
    flex: 3,
    backgroundColor: "#00CAD3",
    height: 250,
    alignItems: "center",
  },
  bottomBox: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    flex: 7,
    bottom: 20,
  },

  fullName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
    fontFamily,
    marginVertical: 15,
    textAlign: "center",
  },
  titleText: {
    color: "#1D2029",
    fontSize: 20,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,

    textAlign: "center",
  },
  submitContainer: {
    flex: 1,
    backgroundColor: "#62D3D9",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  label: {
    color: "#1D2029",
    fontSize: 14,
    fontWeight: "600",
    fontFamily,
    marginTop: 24,
  },
  input: {
    paddingVertical: 12,
    color: "#1D2029",
    fontSize: 14,
    fontFamily,
    flex: 1,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8",
  },
  inputContainer: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  _bottomBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  deleteContainer: {
    flex: 1,
    backgroundColor: Theme.COLORS.BUTTON_CANCEL,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  deleteText: {
    color: Theme.COLORS.CANCEL,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default PatientEditProfileScreen;
