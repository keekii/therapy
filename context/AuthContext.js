import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import secondaryApp from "../database/firebase";
import { navigate } from "../navigationRef";


// errorMessage
// loading

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
    case "set_user_list":
      return { ...state, userList: action.payload };
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
      if (user.displayName === "admin") {
        navigate("adminFlow");
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
        console.log(res);
        console.log("signin success")
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
        console.log("Signup success ", res);
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
      console.log("get profile ", doc.data());
      const { name, surname, phone, address, dob, gender, education, skill, profile_pic,role } = doc.data();
      const userProfile = { name, surname, phone, address, dob, gender, education, skill, profile_pic,role };
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
  name,surname,phone,address,dob, gender,education,skill,profile_pic
) => {
  console.log(name,surname,phone,address,dob, gender,education,skill,profile_pic)
  const uid = firebase.auth().currentUser.uid;
  const docRef = firebase.firestore().collection("users").doc(uid);
  await docRef.update({ name,surname,phone,address,dob, gender,education,skill,profile_pic }).then((res) => {
    //console.log("Update result ",res.data());
  });
  dispatch({ type: "set_profile", payload: profile_pic });
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

const storeUserAccount = (dispatch) => async (name, surname, email, password, id, phone, address, dob, gender, role) => {
  try {
    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Signup success ", res);
        const uid = res.user.uid;
        const ref = firebase.firestore().collection("users").doc(uid);
        const userObj = {
          name,
          surname,
          email,
          password,
          id,
          phone,
          address,
          dob,
          gender,
          role,
          profile_pic: "https://bootdey.com/img/Content/avatar/avatar4.png",
          uid: uid,
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

const getUserAccountList = (dispatch) => async () => {
  let userList = [];
  const docRef = firebase.firestore().collection("users").get()

  try {
    docRef.then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const {
          name,
          surname,
          email,
          password,
          id,
          phone,
          address,
          dob,
          gender,
          role,
          profile_pic,
          uid
        } = doc.data();

        userList.push({
          name,
          surname,
          email,
          password,
          id,
          phone,
          address,
          dob,
          gender,
          role,
          profile_pic,
          uid
        })
      });
      console.log(userList)
      dispatch({ type: "set_user_list", payload: userList });
    })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

  } catch (err) {
    console.log(err);
  }
};

const updateUserAccount = (dispatch) => async (key, data) => {
  const docRef = firebase.firestore().collection("users").doc(key);
  const user = {
    name: data['name'],
    surname: data['surname'],
    id: data['id'],
    phone: data['phone'],
    address: data['address'],
    dob: data['dob'],
    gender: data['gender'],
  }
  console.log('user ',user)
  await docRef.update(user).then((res) => {
    console.log("Update result ");
  });

  navigate("UserAccount");
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
    storeUserAccount,
    getUserAccountList,
    updateUserAccount
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
    userList: []
  }
);
