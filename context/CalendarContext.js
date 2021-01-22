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
          //console.log('set_selected ',{...item});
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
      //console.log(state.selected.filter((item) => item.key !== action.payload));
      return {
        ...state,
        selected: state.selected.filter((item) => item.key !== action.payload),
      };
    case "select_patient":
      return {
        ...state,
        patients: state.patients.map((item) => {
          state.patients.find((item) => { });
          if (item.key === action.payload) {
            item.isSelected = !item.isSelected;
          } else {
            if (item.isSelected === true) {
              item.isSelected = false;
            }
          }
          //console.log({...item});
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
    case "get_person_detail":
      return { ...state, person: action.payload };
    case "clear_person":
      return { ...state, person: [] };
    case "get_task_list":
      return { ...state, tasks: action.payload };
    case "set_current_posture":
      return { ...state, currentPosture: action.payload };
    case "set_evaluate_postures":
      return { ...state, evaluatePostures: action.payload };
    case "set_index":
      return { ...state, index: action.payload };
    case "get_patient_screen":
      return { ...state, patientScreen: action.payload };

    case "clear_task":
      return { ...state, currentPosture: {} };
    case "set_task_id":
      return { ...state, currentTaskId: action.payload };
    case "set_items":
      return { ...state, appointments: action.payload };
    case "update_calendar_form":
      return { ...state, [action.payload.key]: action.payload.value };
    case "set_therapist_list":
      return { ...state, therapistList: action.payload };
    case "set_selected_therapist":
      return { ...state, therapistList: [action.payload] };
    case "set_appointment_request_list":
      return { ...state, appointmentRequestList: action.payload };
    case "set_user_profile":
      return { ...state, userProfile: action.payload };
    case "clear_therapist_list":
      return { ...state, therapistList: [] };

    default:
      return state;

  }
};

const getPatientDetail = (dispatch) => (uid) => {
  let usersArr = [];
  const initialBoolean = true;
  const docRef = firebase.firestore().collection("appointments");
  const query = docRef.where("patient_uid", "==", uid);

  try {
    getCollection = (querySnapshot) => {
      usersArr = [];
      querySnapshot.forEach((res) => {
        const {
          date,
          end_time,
          patient,
          postures,
          start_time,
          topic,
          uid,
        } = res.data();
        usersArr.push({
          date,
          end_time,
          patient,
          postures,
          start_time,
          topic,
          uid,
        });
        dispatch({ type: "get_person_detail", payload: usersArr });
        //console.log("getPatientDetail ",usersArr);
      });
    };

    query.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const setInitial = (dispatch) => (patient, postures) => {
  console.log('setInitial ', patient, postures);
  dispatch({ type: "set_initial_postures", payload: postures });
  dispatch({ type: "set_initial_patient", payload: patient });
};

const getAppointmentById = (dispatch) => async (key) => {
  try {
    const dbRef = firebase.firestore().collection("appointments").doc(key);
    const response = dbRef.get();
    let appData = (await response).data();
    appData = { ...appData, key: key };
    //console.log('getAppointmentById ',appData)
    dispatch({ type: "get_appointment_data", payload: appData });
  } catch (err) { }
};

const storeAppointment = (dispatch) => async (
  topic,
  date,
  start,
  end,
  patient,
  postures,
) => {
  const uid = await firebase.auth().currentUser.uid;
  const dbRef = firebase.firestore().collection("appointments");
  const patient_uid = patient[0].key;

  try {
    dbRef
      .add({
        topic: topic,
        date: date,
        start_time: start,
        end_time: end,
        uid: uid,
        patient: patient,
        patient_uid: patient_uid,
        postures: postures,
      })
      .then(function (docRef) {
        const id = docRef.id;
        //console.log('storeAppointment ', docRef)
        const dbRef = firebase.firestore().collection("appointments").doc(id);
        dbRef.update({ key: id }).then(console.log("Success add id !!!"));
      });
    navigate("Calendar");
    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};

const acceptAppointmentRequest = (dispatch) => async (data) => {
  console.log(data)
  const { date, start_time, end_time, key, patient, patient_uid, therapist, therapist_uid, topic } = data;
  const uid = await firebase.auth().currentUser.uid;
  const dbRef = firebase.firestore().collection("appointments");

  try {
    dbRef
      .add({
        topic,
        date,
        start_time,
        end_time,
        patient,
        patient_uid,
        therapist_uid,
        therapist,
        uid
      })
      .then(function (docRef) {
        const id = docRef.id;
        //console.log('storeAppointment ', docRef)
        const dbRef = firebase.firestore().collection("appointments").doc(id);
        dbRef.update({ key: id }).then();
      });
    const dbRef2 = firebase.firestore().collection("requests").doc(key);
    dbRef2.update({
      status: 'accepted'
    }).then(console.log('Accepted the request'))
    navigate("AppointmentRequest");
    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};


const storeAppointmentRequest = (dispatch) => async (
  topic,
  date,
  start_time,
  end_time,
  therapist,
  patient
) => {
  const dbRef = firebase.firestore().collection("requests");
  const therapist_uid = therapist[0].uid;
  const { name, surname, uid, profile_pic } = patient;

  try {
    dbRef
      .add({
        topic,
        date,
        start_time,
        end_time,
        therapist_uid,
        therapist: therapist[0],
        patient_uid: uid,
        patient: { name, surname, uid, profile_pic },
        status: 'pending'
      })
      .then(function (docRef) {
        const id = docRef.id;
        //console.log('storeAppointment ', docRef)
        const dbRef = firebase.firestore().collection("requests").doc(id);
        dbRef.update({ key: id }).then(console.log("Success add id !!!"));
      });
    navigate("PatientCalendar");
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
  const uid = await firebase.auth().currentUser.uid;
  const dbRef = firebase.firestore().collection("appointments").doc(key);
  const patient_uid = patient[0].key;
  try {
    await dbRef.set({
      key,
      topic,
      date,
      start_time,
      end_time,
      uid,
      patient,
      postures,
      patient_uid: patient_uid,
    });
    navigate("Calendar");
    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};

const setSelectedPatient = (dispatch) => (key) => {
  //console.log('setSelectedPatient ', key);
  dispatch({ type: "select_patient", payload: key });
  dispatch({ type: "get_selectedPatient" });
};

const setSelected = (dispatch) => (key) => {
  //console.log('setSelected key' ,key);
  dispatch({ type: "set_selected", payload: key });
  dispatch({ type: "get_selected" });
};

const getPosture = (dispatch) => async () => {
  let data = [];
  const firestoreRef = await firebase.firestore().collection("postures");

  try {
    const getCollection = (querySnapshot) => {
      data = [];
      querySnapshot.forEach((res) => {
        const { therapy_posture_name, therapy_posture_description, therapy_posture_thumbnail_image, therapy_posture_video } = res.data();
        data.push({
          therapy_posture_name,
          therapy_posture_description,
          therapy_posture_thumbnail_image,
          therapy_posture_video,
          key: res.id,
          isSelected: false,
        });
      });
      //console.log('getPosture ',data)
      dispatch({ type: "get_posture", payload: data });
    };
    await firestoreRef.onSnapshot(getCollection);
    dispatch({ type: "set_loading", payload: false });
  } catch (err) { }
};

const removePosture = (dispatch) => (id) => {
  console.log('removePosture ', id);
  dispatch({ type: "remove_posture", payload: id });
};

const getItems = (dispatch) => async (day) => {
  let data = {};
  const uid = await firebase.auth().currentUser.uid;
  const firestoreRef = await firebase
    .firestore()
    .collection("appointments")
    .where("uid", "==", uid);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  try {
    const getCollection = async (querySnapshot) => {
      let count = 0;
      data = {};
      await querySnapshot.forEach((res) => {
        const {
          date,
          topic,
          start_time,
          end_time,
          patient,
          postures,
          uid,
        } = res.data();

        if (data[date]) {
          for (key in data) {
            if (key === date) {
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
            }
          }
        } else {
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
        }
      });

      setTimeout(() => {
        try {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            if (time) {
              const strTime = timeToString(time);
              if (!data[strTime]) {
                data[strTime] = [];
              }
            }
          }

          const newItems = {};
          Object.keys(data).forEach((key) => {
            newItems[key] = data[key];
          });
          dispatch({ type: "get_data", payload: newItems });
        } catch (err) {
          console.log(err);
        }
      }, 1000);
    };

    await firestoreRef.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const getPatientItems = (dispatch) => async (day) => {
  let data = {};
  const uid = await firebase.auth().currentUser.uid;
  const firestoreRef = await firebase
    .firestore()
    .collection("appointments")
    .where("patient_uid", "==", uid);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  try {
    const getCollection = async (querySnapshot) => {
      let count = 0;
      data = {};
      await querySnapshot.forEach((res) => {
        const {
          date,
          topic,
          start_time,
          end_time,
          patient,
          postures,
          uid,
        } = res.data();

        if (data[date]) {
          for (key in data) {
            if (key === date) {
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
            }
          }
        } else {
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
        }
      });

      setTimeout(() => {
        try {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            if (time) {
              const strTime = timeToString(time);
              if (!data[strTime]) {
                data[strTime] = [];
              }
            }
          }

          const newItems = {};
          Object.keys(data).forEach((key) => {
            newItems[key] = data[key];
          });
          dispatch({ type: "get_data", payload: newItems });
        } catch (err) {
          console.log(err);
        }
      }, 1000);
    };

    await firestoreRef.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

setItems = (dispatch) => (item) => {
  console.log('setItems ', item)
  dispatch({ type: "set_items", payload: item });
};

const getPatientList = (dispatch) => async (text, limit) => {
  let usersArr = [];
  const firestoreRef = await firebase
    .firestore()
    .collection("users")
    .limit(limit);
  const query = await firestoreRef
    .where("role", "==", "patient")
    .orderBy("name")
    .startAt(text)
    .endAt(text + "\uf8ff");

  try {
    if (text) {
      dispatch({ type: "clear_patient" });
      getCollection = (querySnapshot) => {
        usersArr = [];
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

const getPatientListScreen = (dispatch) => async (text, limit) => {
  let usersArr = [];
  const firestoreRef = await firebase
    .firestore()
    .collection("users")
    .limit(limit);
  const query = await firestoreRef
    .where("role", "==", "patient")
    .orderBy("name")
    .startAt(text)
    .endAt(text + "\uf8ff");

  try {
    if (text) {
      dispatch({ type: "clear_patient" });
      getCollection = (querySnapshot) => {
        usersArr = [];
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
          ? dispatch({ type: "get_patient_screen", payload: usersArr })
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

const clearPerson = (dispatch) => () => {
  //console.log('clearPerson')
  dispatch({ type: "clear_person" });
};

const getTaskList = (dispatch) => async () => {
  let taskArr = [];
  const uid = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection("appointments");
  const query = docRef.where("patient_uid", "==", uid);

  try {
    getCollection = (querySnapshot) => {
      taskArr = [];
      querySnapshot.forEach((res) => {
        const {
          date,
          end_time,
          key,
          patient,
          patient_uid,
          postures,
          start_time,
          topic,
          uid,
        } = res.data();

        taskArr.push({
          task_id: res.id,
          date,
          end_time,
          key,
          patient_uid,
          postures,
          start_time,
          topic,
          uid,
        });

        dispatch({ type: "get_task_list", payload: taskArr });
      });
    };
    await query.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const setCurrentPosture = (dispatch) => (posture) => {
  //console.log('setCurrentPosture ',posture)
  dispatch({ type: "set_current_posture", payload: posture });
};

const setEvaluateValue = (dispatch) => (postures, index) => {
  //console.log('setEvaluateValue', postures, index)
  dispatch({ type: "set_evaluate_postures", payload: postures });
  dispatch({ type: "set_index", payload: index });
};

const setCurrentTaskId = (dispatch) => (id) => {
  //console.log('setCurrentTaskId ', id);
  dispatch({ type: "set_task_id", payload: id });
}

const storeEvaluate = (dispatch) => async (postures, id) => {
  const docRef = firebase.firestore().collection("appointments").doc(id);
  // where key === (appointments key)
  await docRef.update({
    postures: postures,
  });
  navigate("PatientTask");
};

const clearCurrentTask = (dispatch) => () => {
  dispatch({ type: "clear_task" });
};

const clearPatient = (dispatch) => () => {
  dispatch({ type: "clear_patient" });
};

const unsubscribe = () => () => {
  firebase.firestore();
};

const updateCalendarForm = (dispatch) => (key, value) => {
  console.log('value ', key, ' value ', value);
  dispatch({ type: "update_calendar_form", payload: { key, value } });
}

const getTherapistList = (dispatch) => (name) => {
  const dbRef = firebase.firestore().collection("users");
  const uid = firebase.auth().currentUser.uid;
  const result = [];
  let filterResult = [];
  let filterResult2 = [];

  const query = dbRef

    .orderBy("name")
    .startAt(name)
    .endAt(name + "\uf8ff");

  query
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { uid, name, role, profile_pic } = doc.data();
        result.push({ uid, name, role, profile_pic });
      });
      filterResult = result.filter((item) => item.uid !== uid);
      filterResult2 = filterResult.filter((item) => item.role === "therapist");
      dispatch({ type: "set_therapist_list", payload: filterResult2 });
    })
    .catch((err) => console.log(err));
};

const setSelectedTherapist = (dispatch) => (item) => {
  dispatch({ type: "set_selected_therapist", payload: item });
};

const getPatientAppointmentRequestList = (dispatch) => async () => {
  let appointmentRequests = [];
  const uid = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection("requests");
  const query = docRef.where("patient_uid", "==", uid);

  try {
    getCollection = (querySnapshot) => {
      appointmentRequests = [];
      querySnapshot.forEach((res) => {
        const {
          date,
          end_time,
          key,
          start_time,
          topic,
          patient_uid,
          patient,
          therapist,
          therapist_uid,
          status
        } = res.data();

        appointmentRequests.push({
          date,
          end_time,
          key,
          start_time,
          topic,
          patient_uid,
          patient,
          therapist,
          therapist_uid,
          status
        });

        dispatch({ type: "set_appointment_request_list", payload: appointmentRequests });
      });
    };
    await query.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const getAppointmentRequestList = (dispatch) => async () => {
  let appointmentRequests = [];
  const uid = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection("requests");
  const query = docRef.where("therapist_uid", "==", uid);

  try {
    getCollection = (querySnapshot) => {
      appointmentRequests = [];
      querySnapshot.forEach((res) => {
        const {
          date,
          end_time,
          key,
          start_time,
          topic,
          patient_uid,
          patient,
          therapist,
          therapist_uid,
          status
        } = res.data();

        appointmentRequests.push({
          date,
          end_time,
          key,
          start_time,
          topic,
          patient_uid,
          patient,
          therapist,
          therapist_uid,
          status
        });

        console.log(appointmentRequests);

        dispatch({ type: "set_appointment_request_list", payload: appointmentRequests });
      });
    };
    await query.onSnapshot(getCollection);
  } catch (err) {
    console.log(err);
  }
};

const updateAppointmentRequest = (dispatch) => async (
  key,
  topic,
  date,
  start_time,
  end_time,
  therapist,
  patient_uid,
  patient
) => {

  const dbRef = firebase.firestore().collection("requests").doc(key);
  try {
    await dbRef.set({
      key,
      topic,
      date,
      start_time,
      end_time,
      therapist_uid: therapist[0]['uid'],
      therapist: therapist[0],
      patient_uid,
      patient,
      status: 'pending'
    });
    navigate("PatientAppointmentRequest");
    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};

const deleteAppointmentRequestById = (dispatch) => (key) => {
  const dbRef = firebase.firestore().collection("requests").doc(key);

  dbRef.delete().then((res) => {
    console.log("Item removed from database");
    navigate("PatientAppointmentRequest");
  });
};

const rejectAppointmentRequest = (dispatch) => (key) => {
  const dbRef = firebase.firestore().collection("requests").doc(key);
  dbRef.update({
    status: 'rejected'
  }).then(console.log('Rejected the request'))
  navigate("AppointmentRequest");

};

const getProfileById = (dispatch) => async (id) => {
  try {

    const docRef = firebase.firestore().collection("users").doc(id);
    docRef.get().then((doc) => {
      const { dob, name, phone, profile_pic, gender, uid } = doc.data();
      const userProfile = {
        dob: '',
        name,
        phone,
        profile_pic,
        gender: '',
        address: '',
        education: '',
        skill: '',
        surname: '',
        uid,
        gender: '',
      };
      dispatch({ type: "set_user_profile", payload: userProfile });
    });
  } catch (err) {
    console.log(err);
  }
};

const getProfile = (dispatch) => async () => {
  try {
    const uid = firebase.auth().currentUser.uid;
    const docRef = firebase.firestore().collection("users").doc(uid);
    docRef.get().then((doc) => {
      const { dob, name, phone, profile_pic, gender, uid } = doc.data();
      const userProfile = {
        dob: '',
        name,
        phone,
        profile_pic,
        gender: '',
        address: '',
        education: '',
        skill: '',
        surname: '',
        uid,
        gender: '',
      };
      dispatch({ type: "set_user_profile", payload: userProfile });
    });
  } catch (err) {
    console.log(err);
  }
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
    setSelectedTherapist,
    storeAppointment,
    getAppointmentById,
    setInitial,
    editAppointment,
    deleteAppointment,
    getPatientDetail,
    clearPerson,
    getTaskList,
    setCurrentPosture,
    storeEvaluate,
    setEvaluateValue,
    clearCurrentTask,
    clearPatient,
    getPatientListScreen,
    setCurrentTaskId,
    setItems,
    getPatientItems,
    unsubscribe,
    updateCalendarForm,
    getTherapistList,
    storeAppointmentRequest,
    getPatientAppointmentRequestList,
    updateAppointmentRequest,
    deleteAppointmentRequestById,
    rejectAppointmentRequest,
    getAppointmentRequestList,
    getProfileById,
    getProfile,
    acceptAppointmentRequest
  },
  {
    errorMessage: "",
    patientScreen: [],
    patients: [],
    patient: [{}],
    tasks: [],
    person: [],
    postures: [],
    selected: [],
    selectedPatient: [],
    appointments: {},
    appointmentData: {
      topic: "",
      date: "",
      start_time: "",
      end_time: "",
      patient: [],
      postures: [],
      currentPosture: {},
      evaluatePostures: [],
      index: 0,
    },
    currentTaskId: "",
    isLoading: true,
    therapistList: [],
    selected_therapist: {},
    appointmentRequestList: [],
    userProfile: {}
  }
);
