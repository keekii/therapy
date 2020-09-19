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
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    //   response.user.updateProfile({
    //     displayName: displayName,
    //   });
    dispatch({ type: "signin" });
    navigate("calendarFlow");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something wrong !!!",
    });
  }
};

const signout = () => async () => {
  await firebase.auth().signOut();
  //   console.log("signout successful");
  navigate("Signin");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, tryLocalSignin, clearErrorMessage },
  { errorMessage: "" }
);
