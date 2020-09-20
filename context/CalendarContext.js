import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import { navigate } from "../navigationRef";
import { app } from "firebase";

const calendarReducer = (state, action) => {
  switch (action.type) {
    case "set_selected":
      return {
        ...state,
        postures: state.postures.map((item) => {
          if (item.key === action.payload) {
            item.isSelected = !item.isSelected;
          }
          return { ...item };
        }),
      };
    case "get_selected":
      return {
        ...state,
        selected: state.postures.filter((item) => item.isSelected === true),
      };
    case "get_selectedPatient":
      return {
        ...state,
        selectedPatient: state.patients.filter(
          (item) => item.isSelected === true
        ),
      };
    case "set_loading":
      return { ...state, isLoading: action.payload };
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
    case "get_appointment_data":
      return { ...state, appointmentData: action.payload };
    case "remove_posture":
      return {
        ...state,

        selected: state.selected.filter((item) => item.key !== action.payload),
      };
    case "select_patient":
      return {
        ...state,
        patients: state.patients.map((item) => {
          state.patients.find((item) => {});
          if (item.key === action.payload) {
            item.isSelected = !item.isSelected;
          } else {
            if (item.isSelected === true) {
              item.isSelected = false;
            }
          }
          return { ...item };
        }),
      };
    case "set_initial_postures":
      return {
        ...state,
        selected: action.payload,
      };
    case "set_initial_patient":
      return {
        ...state,

        selectedPatient: action.payload,
        patients: action.payload,
      };
    case "clear_key":
      return { ...state, appointmentData: action.payload };
    default:
      return state;
  }
};

const getPatientDetail = (dispatch) => (key, isSelected, name, profile_pic) => {
  try {
    const docRef = firebase.firestore().collection("appointments");
    const query = docRef.where("patient", "array-contains", {
      key,
      isSelected,
      name,
      profile_pic,
    });
    const usersArr = [];
    getCollection = (querySnapshot) => {
      querySnapshot.forEach((res) => {
        console.log(res.data());
        //const { name, profile_pic } = res.data();
        // usersArr.push({
        //   key: res.id,
        //   name,
        //   profile_pic,
        //   isSelected: false,
        // });
      });
    };

    query.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const setInitial = (dispatch) => (patient, postures) => {
  dispatch({ type: "set_initial_postures", payload: postures });
  dispatch({ type: "set_initial_patient", payload: patient });
};

const getAppointmentById = (dispatch) => async (key) => {
  try {
    const dbRef = firebase.firestore().collection("appointments").doc(key);
    const response = dbRef.get();
    let appData = (await response).data();
    appData = { ...appData, key: key };
    dispatch({ type: "get_appointment_data", payload: appData });
  } catch (err) {}
};

const storeAppointment = (dispatch) => async (
  topic,
  date,
  start,
  end,
  patient,
  postures
) => {
  try {
    const uid = await firebase.auth().currentUser.uid;
    const dbRef = firebase.firestore().collection("appointments");

    await dbRef.add({
      topic: topic,
      date: date,
      start_time: start,
      end_time: end,
      uid: uid,
      patient: patient,
      postures: postures,
    });
    navigate("Calendar");
    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};

const editAppointment = (dispatch) => async (
  key,
  topic,
  date,
  start_time,
  end_time,
  patient,
  postures
) => {
  try {
    const uid = await firebase.auth().currentUser.uid;
    const dbRef = firebase.firestore().collection("appointments").doc(key);
    await dbRef.set({
      key,
      topic,
      date,
      start_time,
      end_time,
      uid,
      patient,
      postures,
    });
    navigate("Calendar");
    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};

const setSelectedPatient = (dispatch) => (key) => {
  dispatch({ type: "select_patient", payload: key });
  dispatch({ type: "get_selectedPatient" });
};

const setSelected = (dispatch) => (key) => {
  dispatch({ type: "set_selected", payload: key });
  dispatch({ type: "get_selected" });
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
          isSelected: false,
        });
      });
      dispatch({ type: "get_posture", payload: data });
    };
    await firestoreRef.onSnapshot(getCollection);
    dispatch({ type: "set_loading", payload: false });
  } catch (err) {}
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
        const {
          date,
          topic,
          start_time,
          end_time,
          patient,
          postures,
          uid,
        } = res.data();
        data[date] = [];
        data[date].push({
          key: res.id,
          date,
          topic,
          start_time,
          end_time,
          patient,
          postures,
          uid,
        });
      });
    };
    dispatch({ type: "get_data", payload: data });

    await firestoreRef.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const getPatientList = (dispatch) => async (text, limit) => {
  try {
    const firestoreRef = await firebase
      .firestore()
      .collection("users")
      .limit(limit);
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
            isSelected: false,
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

const deleteAppointment = (dispatch) => (key) => {
  const dbRef = firebase.firestore().collection("appointments").doc(key);

  dbRef.delete().then((res) => {
    console.log("Item removed from database");
    navigate("Calendar");
  });
};

export const { Provider, Context } = createDataContext(
  calendarReducer,
  {
    getItems,
    removePosture,
    getPatientList,
    getPosture,
    setSelected,
    setSelectedPatient,
    storeAppointment,
    getAppointmentById,
    setInitial,
    editAppointment,
    deleteAppointment,
    getPatientDetail,
  },
  {
    errorMessage: "",
    patient: [
      {
        profile_pic:
          "https://www.eng.chula.ac.th/wp-content/uploads/2016/11/profile-pic-768x576.jpeg",
        name: "",
      },
    ],
    postures: [],
    selected: [],
    appointmentData: {
      topic: "",
      date: "",
      start_time: "",
      end_time: "",
      patient: [
        {
          profile_pic:
            "https://www.eng.chula.ac.th/wp-content/uploads/2016/11/profile-pic-768x576.jpeg",
          name: "",
        },
      ],
      postures: [],
    },

    isLoading: true,
  }
);
