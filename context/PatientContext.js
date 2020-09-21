import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import { navigate } from "../navigationRef";

const patientReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload, patients: [] };
    case "clear_patient":
      return { ...state, patients: [] };
    case "get_patient":
      return { ...state, patients: action.payload, errorMessage: "" };
    case "clear_person":
      return { ...state, person: [] };
    default:
      return state;
  }
};

const getPatientList = (dispatch) => async (text) => {
  const firestoreRef = await firebase.firestore().collection("users").limit(5);
  const query = await firestoreRef
    .orderBy("name")
    .startAt(text)
    .endAt(text + "\uf8ff");
  // const query = await firestoreRef.where("name", "==", text);
  const usersArr = [];
  try {
    if (text) {
      dispatch({ type: "clear_patient" });
      getCollection = (querySnapshot) => {
        querySnapshot.forEach((res) => {
          const { name, profile_pic } = res.data();
          usersArr.push({
            key: res.id,
            name,
            profile_pic,
          });
        });

        usersArr.length
          ? dispatch({ type: "get_patient", payload: usersArr })
          : dispatch({
              type: "add_error",
              payload: "Not found !!!",
            });
      };

      query.onSnapshot(getCollection);
    } else {
      dispatch({ type: "clear_patient" });
      dispatch({
        type: "add_error",
        payload: "Please enter something",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const clearPerson = (dispatch) => () => {
  dispatch({ type: "clear_person" });
};

export const { Provider, Context } = createDataContext(
  patientReducer,
  { getPatientList },
  { errorMessage: "", patients: [] }
);
