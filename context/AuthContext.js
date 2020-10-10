import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import secondaryApp from "../database/firebase";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return { ...state, errorMessage: "" };
    case "get_user":
      return { ...state, userProfile: action.payload };
    case "clear_user":
      return {
        ...state,
        userProfile: {
          profile_pic:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        },
      };
    case "set_profile":
      return {
        ...state,
        userProfile: {
          ...state,
          userProfile: (state.userProfile.profile_pic = action.payload),
        },
      };
    default:
      return state;
  }
};

const tryLocalSignin = () => async () => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.displayName === "therapist") {
        navigate("therapistFlow");
      }
      if (user.displayName === "patient") {
        navigate("patientFlow");
      }
    } else {
      navigate("Signin");
    }
  });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const role = res.user.providerData[0].displayName;
        dispatch({ type: "set_role", payload: role });

        dispatch({ type: "signin" });
      });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something wrong !!!",
    });
  }
};

const signup = (dispatch) => async ({ email, password, name, role }) => {
  try {
    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const uid = res.user.uid;
        const ref = firebase.firestore().collection("users").doc(uid);
        const userObj = {
          name: name,
          dateOfBirth: "",
          phone: "",
          profile_pic: "https://bootdey.com/img/Content/avatar/avatar4.png",
          sex: "male",
          uid: uid,
          role: role,
        };
        res.user.updateProfile({
          displayName: role,
        });
        ref.set(userObj).then(() => {
          console.log("Success");

          navigate("Patient");
        });
      });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something wrong !!!",
    });
  }
};

const signout = (dispatch) => async () => {
  await firebase.auth().signOut();
  console.log("signout successful");
  navigate("Signin");
};

const getProfile = (dispatch) => async () => {
  try {
    const uid = await firebase.auth().currentUser.uid;
    const docRef = firebase.firestore().collection("users").doc(uid);
    docRef.get().then((doc) => {
      const { dateOfBirth, name, phone, profile_pic, sex } = doc.data();
      const userProfile = { dateOfBirth, name, phone, profile_pic, sex };
      dispatch({ type: "get_user", payload: userProfile });
    });
  } catch (err) {
    console.log(err);
  }
};

const clearUser = (dispatch) => () => {
  dispatch({ type: "clear_user" });
};

const updateProfile = (dispatch) => async (
  name,
  dateOfBirth,
  phone,
  img,
  sex
) => {
  const uid = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection("users").doc(uid);
  await docRef.update({ name, dateOfBirth, phone, profile_pic: img, sex });

  dispatch({ type: "set_profile", payload: img });
  navigate("Profile");
};

const patientUpdateProfile = (dispatch) => async (
  name,
  dateOfBirth,
  phone,
  img,
  sex
) => {
  const uid = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection("users").doc(uid);
  await docRef.update({ name, dateOfBirth, phone, profile_pic: img, sex });

  dispatch({ type: "set_profile", payload: img });
  navigate("PatientProfile");
};

const unsubscribe = () => () => {
  firebase.firestore();
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    tryLocalSignin,
    clearErrorMessage,
    updateProfile,
    getProfile,
    clearUser,
    patientUpdateProfile,
    unsubscribe,
  },
  {
    errorMessage: "",
    userProfile: {
      name: "",
      dateOfBirth: "",
      phone: "",
      profile_pic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  }
);
