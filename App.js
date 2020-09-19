import React from "react";
import { TouchableOpacity, Text, Button } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as CalendarContext } from "./context/CalendarContext";
import { Provider as PatientContext } from "./context/PatientContext";
import { setNavigator } from "./navigationRef";
import { Ionicons } from "@expo/vector-icons";

import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import CreateAppointmentScreen from "./screens/CreateAppointmentScreen";
import PostureScreen from "./screens/PostureScreen";
import PostureDetailScreen from "./screens/PostureDetailScreen";
import PatientScreen from "./screens/PatientScreen";
import PatientDetailScreen from "./screens/PatientDetailScreen";
import AppointmentDetailScreen from "./screens/AppointmentDetailScreen";
import EditAppointmentScreen from "./screens/EditAppointmentScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CalendarScreen from "./screens/CalendarScreen";
import LoadingScreen from "./screens/LoadingScreen";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
  }),

  mainFlow: createBottomTabNavigator({
    calendarFlow: createStackNavigator({
      Calendar: CalendarScreen,
      AppointmentsDetail: AppointmentDetailScreen,
      CreateAppointment: CreateAppointmentScreen,
      EditAppointment: EditAppointmentScreen,
      Posture: PostureScreen,
      PostureDetail: PostureDetailScreen,
    }),
    patientFlow: createStackNavigator({
      Patient: PatientScreen,
      PatientDetail: PatientDetailScreen,
    }),
    profileFlow: createStackNavigator({
      Profile: ProfileScreen,
      EditProfile: EditProfileScreen,
    }),
  }),
});

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

ProfileScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

EditProfileScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

CalendarScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

CreateAppointmentScreen.navigationOptions = () => {
  return {
    title: null,
    headerLeft: () => {
      <Text>Hi</Text>;
    },
    headerStyle: {
      backgroundColor: "#00CAD3",
      shadowColor: "transparent",
    },
  };
};

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <CalendarContext>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </CalendarContext>
    </AuthProvider>
  );
};
