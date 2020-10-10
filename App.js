import React from "react";
import { TouchableOpacity, Text, Button } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as CalendarContext } from "./context/CalendarContext";
import { Provider as ChatContext } from "./context/ChatContext";
import { setNavigator } from "./navigationRef";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "./components/BottomBar";
import PatientBar from "./components/PatientBar";

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
import TaskEvaluateScreen from "./screens/TaskEvaluateScreen";
import TaskScreen from "./screens/TaskScreen";
import LoadingScreen from "./screens/LoadingScreen";
import TaskPostureDetailScreen from "./screens/TaskPostureDetailScreen";
import PatientAppointmentDetailScreen from "./screens/PatientAppointmentDetailScreen";
import PatientCalendarScreen from "./screens/PatientCalendarScreen";
import PatientProfileScreen from "./screens/PatientProfile";
import PatientEditProfileScreen from "./screens/PatientEditProfile";
import ChatScreen from "./screens/ChatScreen";
import PatientChatScreen from "./screens/PatientChatScreen";
import ChatRoomScreen from "./screens/ChatRoomScreen";
import PatientChatRoomScreen from "./screens/PatientChatRoomScreen";
import CreateChatScreen from "./screens/CreateChatScreen";
import PatientCreateChatScreen from "./screens/PatientCreateChatScreen";
import { navigate } from "./navigationRef";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  therapistFlow: createBottomTabNavigator(
    {
      calendarFlow: createStackNavigator({
        Calendar: CalendarScreen,
        AppointmentDetail: AppointmentDetailScreen,
        CreateAppointment: CreateAppointmentScreen,
        EditAppointment: EditAppointmentScreen,
        Posture: PostureScreen,
        PostureDetail: PostureDetailScreen,
      }),
      patientFlow: createStackNavigator({
        Patient: PatientScreen,
        PatientDetail: PatientDetailScreen,
        Signup: SignupScreen,
      }),
      chatFlow: createStackNavigator({
        ChatRoom: ChatRoomScreen,
        Chat: ChatScreen,
        CreateChat: CreateChatScreen,
      }),
      profileFlow: createStackNavigator({
        Profile: ProfileScreen,
        EditProfile: EditProfileScreen,
      }),
    },
    {
      tabBarComponent: (props) => {
        const { navigation } = props;

        return (
          <BottomBar
            selectedIndex={navigation.state.index}
            onStatusChanged={(index) => {
              switch (index) {
                case 0:
                  navigate("Calendar");
                  break;
                case 1:
                  navigate("Patient");
                  break;
                case 2:
                  navigate("ChatRoom");
                  break;
                case 3:
                  navigate("Profile");
                  break;
                default:
                  break;
              }
            }}
          />
        );
      },
      tabBarPosition: "bottom",
      animationEnabled: false,
      swipeEnabled: false,
    }
  ),
  patientFlow: createBottomTabNavigator(
    {
      patientCalendarFlow: createStackNavigator({
        PatientCalendar: PatientCalendarScreen,
        PatientAppointmentDetail: PatientAppointmentDetailScreen,
      }),
      patientTaskFlow: createStackNavigator({
        PatientTask: TaskScreen,
        PatientTaskEvaluate: TaskEvaluateScreen,
        PatientTaskPostureDetail: TaskPostureDetailScreen,
      }),
      patientChatFlow: createStackNavigator({
        PatientChatRoom: PatientChatRoomScreen,
        PatientChat: PatientChatScreen,
        PatientCreateChat: PatientCreateChatScreen,
      }),
      patientProfileFlow: createStackNavigator({
        PatientProfile: PatientProfileScreen,
        PatientEditProfile: PatientEditProfileScreen,
      }),
    },
    {
      tabBarComponent: (props) => {
        const { navigation } = props;

        return (
          <PatientBar
            selectedIndex={navigation.state.index}
            onStatusChanged={(index) => {
              //console.log(index);
              switch (index) {
                case 0:
                  navigate("PatientCalendar");
                  break;
                case 1:
                  navigate("PatientTask");
                  break;
                case 2:
                  navigate("PatientChatRoom");
                  break;
                case 3:
                  navigate("PatientProfile");
                  break;
                default:
                  break;
              }
            }}
          />
        );
      },
      tabBarPosition: "bottom",
      animationEnabled: false,
      swipeEnabled: false,
    }
  ),
});

PatientAppointmentDetailScreen.navigationOptions = () => {
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
PatientCalendarScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

CalendarScreen.navigationOptions = () => {
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

PatientScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

PatientDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

ProfileScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

PatientProfileScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

PatientEditProfileScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

TaskScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

TaskEvaluateScreen.navigationOptions = () => {
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

AppointmentDetailScreen.navigationOptions = () => {
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

EditAppointmentScreen.navigationOptions = () => {
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

ChatRoomScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

CreateChatScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

ChatScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

PatientChatRoomScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

PatientCreateChatScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

PatientChatScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <CalendarContext>
        <ChatContext>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </ChatContext>
      </CalendarContext>
    </AuthProvider>
  );
};
