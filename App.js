import React from "react";
import { TouchableOpacity, Text, Button } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as CalendarContext } from "./context/CalendarContext";
import { Provider as ChatContext } from "./context/ChatContext";
import { Provider as UserContext } from "./context/UserContext";
import { Provider as TaskContext } from "./context/TaskContext";
import { Provider as TherapyPostureContext } from "./context/TherapyPostureContext";
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
import EditAppointmentRequestScreen from "./screens/EditAppointmentRequestScreen";
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
import CreateAppointmentRequestScreen from "./screens/CreateAppointmentRequestScreen";
import PatientAppointmentRequestScreen from "./screens/PatientAppointmentRequestScreen";
import PatientAppointmentRequestDetailScreen from "./screens/PatientAppointmentRequestDetailScreen";
import AppointmentRequestScreen from "./screens/AppointmentRequestScreen";
import AppointmentRequestDetailScreen from "./screens/AppointmentRequestDetailScreen";
import TherapyPostureScreen from "./screens/TherapyPostureScreen";
import TherapyPostureDetailScreen from "./screens/TherapyPostureDetailScreen";
import EditTherapyPostureDetailScreen from "./screens/EditTherapyPostureDetailScreen";
import CreateTherapyPostureScreen from "./screens/CreateTherapyPostureScreen";
import AdminTherapyPostureScreen from "./screens/AdminTherapyPostureScreen";
import AdminTherapyPostureDetailScreen from "./screens/AdminTherapyPostureDetailScreen";
import AdminEditTherapyPostureDetailScreen from "./screens/AdminEditTherapyPostureDetailScreen";
import AdminCreateTherapyPostureScreen from "./screens/AdminCreateTherapyPostureScreen";
import UserAccountScreen from "./screens/UserAccountScreen";
import CreateUserAccountScreen from "./screens/CreateUserAccountScreen";
import EditUserAccountDetailScreen from "./screens/EditUserAccountDetailScreen";
import UserAccountDetailScreen from "./screens/UserAccountDetailScreen";
import AdminEditProfileScreen from "./screens/AdminEditProfileScreen";
import AdminProfileScreen from "./screens/AdminProfileScreen";

import { navigate } from "./navigationRef";
import AdminBar from "./components/AdminBar";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  adminFlow: createBottomTabNavigator({
    userFlow: createStackNavigator({
      UserAccount: UserAccountScreen,
      CreateUserAccount: CreateUserAccountScreen,
      EditUserAccountDetail: EditUserAccountDetailScreen,
      UserAccountDetail: UserAccountDetailScreen
    }),
    postureFlow: createStackNavigator({
      AdminTherapyPosture: AdminTherapyPostureScreen,
      AdminTherapyPostureDetail: AdminTherapyPostureDetailScreen,
      AdminCreateTherapyPosture: AdminCreateTherapyPostureScreen,
      AdminEditTherapyPostureDetail: AdminEditTherapyPostureDetailScreen
    }),
    profileFlow: createStackNavigator({
      AdminEditProfile: AdminEditProfileScreen,
      AdminProfile: AdminProfileScreen,
      
    }),
  },
    {
      tabBarComponent: (props) => {
        const { navigation } = props;

        return (
          <AdminBar
            selectedIndex={navigation.state.index}
            onStatusChanged={(index) => {
              switch (index) {
                case 0:
                  navigate("UserAccount");
                  break;
                case 1:
                  navigate("AdminTherapyPosture");
                  break;
                case 2:
                  navigate("AdminProfile");
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
  therapistFlow: createBottomTabNavigator(
    {
      calendarFlow: createStackNavigator({
        Calendar: CalendarScreen,
        AppointmentDetail: AppointmentDetailScreen,
        CreateAppointment: CreateAppointmentScreen,
        EditAppointment: EditAppointmentScreen,
        Posture: PostureScreen,
        PostureDetail: PostureDetailScreen,
        AppointmentRequest: AppointmentRequestScreen,
        AppointmentRequestDetail: AppointmentRequestDetailScreen,
      }),
      therapyPostureFlow: createStackNavigator({
        TherapyPosture: TherapyPostureScreen,
        TherapyPostureDetail: TherapyPostureDetailScreen,
        CreateTherapyPosture: CreateTherapyPostureScreen,
        EditTherapyPostureDetail: EditTherapyPostureDetailScreen
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
                  navigate("TherapyPosture");
                  break;
                case 2:
                  navigate("Patient");
                  break;
                case 3:
                  navigate("ChatRoom");
                  break;
                case 4:
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
        CreateAppointmentRequest: CreateAppointmentRequestScreen,
        EditAppointmentRequest: EditAppointmentRequestScreen,
        PatientAppointmentRequest: PatientAppointmentRequestScreen,
        PatientAppointmentRequestDetail: PatientAppointmentRequestDetailScreen,
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

AdminProfileScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

AdminEditProfileScreen.navigationOptions = () => {
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

TherapyPostureScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

CreateAppointmentRequestScreen.navigationOptions = () => {
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

PatientAppointmentRequestDetailScreen.navigationOptions = () => {
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

AppointmentRequestDetailScreen.navigationOptions = () => {
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

PatientAppointmentRequestScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

AppointmentRequestScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

EditAppointmentRequestScreen.navigationOptions = () => {
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

AdminCreateTherapyPostureScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

AdminEditTherapyPostureDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

AdminTherapyPostureDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

AdminTherapyPostureDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};


TherapyPostureDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

EditTherapyPostureDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

CreateTherapyPostureScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

CreateUserAccountScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

EditUserAccountDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

UserAccountDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

UserAccountScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

AdminTherapyPostureScreen.navigationOptions = () => {
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
          <TherapyPostureContext>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </TherapyPostureContext>
        </ChatContext>
      </CalendarContext>
    </AuthProvider>
  );
};
