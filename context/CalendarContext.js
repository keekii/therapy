import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import { navigate } from "../navigationRef";

const calendarReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload, patients: [] };
    case "clear_patient":
      return { ...state, patients: [] };
    case "get_patient":
      return { ...state, patients: action.payload, errorMessage: "" };
    case "get_data":
      return { ...state, appointments: action.payload };
    case "get_posture":
      return { ...state, postures: action.payload };
    case "add_posture":
      return { ...state, postures: action.payload };
    case "remove_posture":
      return {
        ...state,

        postures: state.postures.filter(
          (item) => item.posture_id !== action.payload
        ),
      };

    default:
      return state;
  }
};

const getPosture = (dispatch) => async () => {
  try {
    const firestoreRef = await firebase.firestore().collection("postures");
    const data = [];
    const getCollection = (querySnapshot) => {
      querySnapshot.forEach((res) => {
        const { des, name, thumbnail, vid } = res.data();
        data.push({
          des,
          name,
          thumbnail,
          vid,
          key: res.id,
        });
      });
      dispatch({ type: "get_posture", payload: data });
    };
    await firestoreRef.onSnapshot(getCollection);

    console.log(data);
  } catch (err) {}
};

const addPosture = (dispatch) => (item) => {
  dispatch({
    type: "add_posture",
    payload: item,
  });
};

const removePosture = (dispatch) => (id) => {
  dispatch({ type: "remove_posture", payload: id });
};

const getItems = (dispatch) => async () => {
  try {
    const firestoreRef = await firebase.firestore().collection("appointments");
    const data = {};
    const getCollection = (querySnapshot) => {
      querySnapshot.forEach((res) => {
        const { date, topic, start_time, end_time, patient } = res.data();
        data[date] = [];
        data[date].push({
          date,
          topic,
          start_time,
          end_time,
          patient,
        });
      });
    };
    dispatch({ type: "get_data", payload: data });
    await firestoreRef.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const getPatientList = (dispatch) => async (text) => {
  try {
    const firestoreRef = await firebase
      .firestore()
      .collection("users")
      .limit(5);
    const query = await firestoreRef
      .orderBy("name")
      .startAt(text)
      .endAt(text + "\uf8ff");

    const usersArr = [];
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

export const { Provider, Context } = createDataContext(
  calendarReducer,
  { getItems, removePosture, getPatientList, addPosture, getPosture },
  {
    errorMessage: "",
    patients: [],
    postures: [],
  }
);
