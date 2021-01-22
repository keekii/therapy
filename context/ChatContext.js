import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import { navigate } from "../navigationRef";

const chatReducer = (state, action) => {
  switch (action.type) {
    case "set_selected":
      return {
        ...state,
        userList: state.userList.map((item) => {
          if (item.isSelected === true && item.uid !== action.payload) {
            item.isSelected = false;
          }
          if (item.uid === action.payload) {
            item.isSelected = !item.isSelected;
          }
          return { ...item };
        }),
      };
    case "get_chat_room":
      return { ...state, chatRoom: action.payload };
    case "get_user_list":
      return { ...state, userList: action.payload };
    case "get_selected_user":
      return {
        ...state,
        selectedUser: state.userList.find((item) => item.isSelected === true),
      };
    case "set_message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const getPatientChatRoom = (dispatch) => async () => {
  const dbRef = firebase.firestore().collection("threads");
  const uid = await firebase.auth().currentUser.uid;
  console.log(uid);
  const query = dbRef.where("patient_uid", "==", uid);
  const chatRoomArr = [];
  query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const {
        key,
        patient_name,
        therapist_name,
        therapist_uid,
        patient_uid,
      } = doc.data();
      chatRoomArr.push({
        key,
        patient_name,
        therapist_name,
        therapist_uid,
        patient_uid,
      });
    });
    dispatch({ type: "get_chat_room", payload: chatRoomArr });
  });
};

const getChatRoom = (dispatch) => async () => {
  const dbRef = firebase.firestore().collection("threads");
  const uid = await firebase.auth().currentUser.uid;
  const chatRoomArr = [];
  const query = dbRef.where("uid", "==", uid);
  dbRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const {
        key,
        patient_name,
        therapist_name,
        therapist_uid,
        patient_uid,
      } = doc.data();
      chatRoomArr.push({
        key,
        patient_name,
        therapist_name,
        therapist_uid,
        patient_uid,
      });
    });
    dispatch({ type: "get_chat_room", payload: chatRoomArr });
  });
};

const getUserListByName = (dispatch) => (name) => {
  console.log("Name ", name);
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
        const { uid, name, role } = doc.data();
        result.push({ uid, name, role, isSelected: false });
      });
      filterResult = result.filter((item) => item.uid !== uid);
      filterResult2 = filterResult.filter((item) => item.role === "patient");
      dispatch({ type: "get_user_list", payload: filterResult2 });
    })
    .catch((err) => console.log(err));
};

const getTherapistListByName = (dispatch) => (name) => {
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
        const { uid, name, role } = doc.data();
        result.push({ uid, name, role, isSelected: false });
      });
      filterResult = result.filter((item) => item.uid !== uid);
      filterResult2 = filterResult.filter((item) => item.role === "therapist");
      dispatch({ type: "get_user_list", payload: filterResult2 });
    })
    .catch((err) => console.log(err));
};

const getUserList = (dispatch) => () => {
  const dbRef = firebase.firestore().collection("users");
  const uid = firebase.auth().currentUser.uid;
  const result = [];

  const query = dbRef.where("uid", "!=", uid).where("role", "==", "patient");
  query
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { uid, name, role } = doc.data();
        result.push({ uid, name, role, isSelected: false });
      });
      console.log(result);
      dispatch({ type: "get_user_list", payload: result });
    })
    .catch((err) => console.log(err));
};

const setSelected = (dispatch) => (key) => {
  console.log('setSelected ',key)
  dispatch({ type: "set_selected", payload: key });
  dispatch({ type: "get_selected_user" });
};

const getTherapistList = (dispatch) => () => {
  const dbRef = firebase.firestore().collection("users");
  const uid = firebase.auth().currentUser.uid;
  const result = [];

  const query = dbRef.where("uid", "!=", uid).where("role", "==", "therapist");
  query
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { uid, name, role } = doc.data();
        result.push({ uid, name, role, isSelected: false });
      });
      console.log(result);
      dispatch({ type: "get_user_list", payload: result });
    })
    .catch((err) => console.log(err));
};

const createChatRoom = () => async (user) => {
  const creator_uid = await firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(creator_uid);
  let therapist_name = "";

  await userRef.get().then((res) => {
    const { name } = res.data();
    therapist_name = name;
  });
  const { name, uid } = user;
  const dbRef = firebase.firestore().collection("threads");
  let result = {};
  const query = dbRef
    .where("patient_uid", "==", uid)
    .where("therapist_uid", "==", creator_uid);
  await query
    .get()
    .then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const {
            key,
            patient_uid,
            therapist_uid,
            therapist_name,
            patient_name,
          } = doc.data();
          result = {
            key,
            patient_uid,
            therapist_uid,
            therapist_name,
            patient_name,
          };
        });
      }
    })
    .catch((err) => console.log(err));

  if (result.hasOwnProperty("key") === false) {
    console.log("Result not exist");
    dbRef
      .add({
        patient_uid: uid,
        therapist_uid: creator_uid,
        therapist_name,
        patient_name: name,
      })
      .then((res) => {
        console.log("Create chatroom success");
        dbRef
          .doc(res.id)
          .update({
            key: res.id,
            message: [
              {
                _id: 0,
                text: "New room created.",
                createdAt: new Date().getTime(),
                system: true,
              },
            ],
          })
          .then(
            navigate("Chat", {
              key: res.id,
              patient_name: name,
              therapist_name,
              patient_uid: uid,
              therapist_uid: creator_uid,
            })
          );
      });
  } else if (result.hasOwnProperty("key") === true) {
    console.log("set error");
    navigate("Chat", {
      key: result.key,
      patient_name: result.patient_name,
      therapist_name: result.therapist_name,
      patient_uid: result.patient_uid,
      therapist_uid: result.therapist_uid,
    });
  }
};

const createPatientChatRoom = () => async (user) => {
  const creator_uid = await firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(creator_uid);
  let _patientName = "";

  await userRef.get().then((res) => {
    const { name } = res.data();
    _patientName = name;
  });
  const { name, uid } = user;
  const dbRef = firebase.firestore().collection("threads");
  let result = {};
  const query = dbRef
    .where("patient_uid", "==", creator_uid)
    .where("therapist_uid", "==", uid);
  await query
    .get()
    .then((querySnapshot) => {
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const {
            key,
            patient_uid,
            therapist_uid,
            therapist_name,
            patient_name,
          } = doc.data();
          result = {
            key,
            patient_uid,
            therapist_uid,
            therapist_name,
            patient_name,
          };
        });
      }
    })
    .catch((err) => console.log(err));

  if (result.hasOwnProperty("key") === false) {
    console.log("Result not exist");
    dbRef
      .add({
        patient_uid: creator_uid,
        therapist_uid: uid,
        therapist_name: name,
        patient_name: _patientName,
      })
      .then((res) => {
        console.log("Create chatroom success");
        dbRef
          .doc(res.id)
          .update({
            key: res.id,
            message: [
              {
                _id: 0,
                text: "New room created.",
                createdAt: new Date().getTime(),
                system: true,
              },
            ],
          })
          .then(
            navigate("PatientChat", {
              key: res.id,
              patient_name: _patientName,
              therapist_name: name,
              patient_uid: creator_uid,
              therapist_uid: uid,
            })
          );
      });
  } else if (result.hasOwnProperty("key") === true) {
    console.log("set error");
    navigate("PatientChat", {
      key: result.key,
      patient_name: result.patient_name,
      therapist_name: result.therapist_name,
      patient_uid: result.patient_uid,
      therapist_uid: result.therapist_uid,
    });
  }
};

const getMessage = (dispatch) => (roomId) => {
  const dbRef = firebase.firestore().collection("threads").doc(roomId);
  const resultArr = [];
  dbRef.get().then((res) => {
    const { message } = res.data();
    for (var i in message) {
      const time = message[i].createdAt;
      const result = "";
      try {
        result = time.toDate();
      } catch (error) {
        //console.log(error);
      }

      resultArr.push({
        text: message[i].text,
        user: message[i].user,
        _id: message[i]._id,
        createdAt: result,
        system: message[i].system,
      });

      dispatch({ type: "set_message", payload: resultArr });
    }
  });
};

const storeMessage = () => (message, roomId) => {
  const dbRef = firebase.firestore().collection("threads").doc(roomId);
  dbRef.update({ message }).then(console.log("Success !!!"));
};

const searchChatRoom = (dispatch) => (input) => {
  dispatch({ type: "search_chat_room", payload: input });
};

export const { Provider, Context } = createDataContext(
  chatReducer,
  {
    getChatRoom,
    getUserListByName,
    getUserList,
    setSelected,
    createChatRoom,
    getMessage,
    storeMessage,
    searchChatRoom,
    getTherapistList,
    getPatientChatRoom,
    createPatientChatRoom,
    getTherapistListByName,
  },
  {
    chatRoom: [],
    searchResult: [],
    userList: [],
    selectedUser: {},
    message: [],
  }
);
