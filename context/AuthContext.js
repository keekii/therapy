import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return { errorMessage: "" };
    case "get_user":
      return { ...state, userProfile: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = () => async () => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigate("calendarFlow");
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
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: "signin" });
    navigate("calendarFlow");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something wrong !!!",
    });
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const uid = res.user.uid;
        const ref = firebase.firestore().collection("users").doc(uid);
        const userObj = {
          name: "",
          dateOfBirth: "",
          phone: "",
          profile_pic: "https://bootdey.com/img/Content/avatar/avatar4.png",
          sex: "male",
          uid: uid,
          role: "therapist",
        };
        ref.set(userObj).then(console.log("success"));
      });
    // const uid = await firebase.auth().currentUser.uid;
    // const docRef = firebase.firestore().collection("users").doc(uid);
    // docRef
    //   .set({
    //     dateOfBirth: "",
    //     name: "",
    //     phone: "",
    //     profile_pic:
    //       "https://www.eng.chula.ac.th/wp-content/uploads/2016/11/profile-pic-768x576.jpeg",
    //     sex: "",
    //     uid: uid,
    //   })
    //   .then((res) => {
    //     console.log(res.data());
    //   });

    //dispatch({ type: "signin" });
    //navigate("calendarFlow");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something wrong !!!",
    });
  }
};

const signout = () => async () => {
  await firebase.auth().signOut();
  console.log("signout successful");
  navigate("Signin");
};

const getProfile = (dispatch) => async () => {
  try {
    const uid = await firebase.auth().currentUser.uid;
    const docRef = firebase.firestore().collection("users").doc(uid);
    docRef.get().then((doc) => {
      const { dateOfBirth, name, phone } = doc.data();
      const userProfile = { dateOfBirth, name, phone };
      dispatch({ type: "get_user", payload: userProfile });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = () => async (name, dateOfBirth, phone) => {
  const uid = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection("users").doc(uid);
  await docRef.update({ name, dateOfBirth, phone });
  navigate("Profile");
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
  },
  { errorMessage: "", userProfile: {} }
);
