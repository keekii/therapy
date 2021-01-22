import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import { navigate } from "../navigationRef";

const userReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "set_therapist_list":
            return { ...state, therapistList: action.payload };
        case "clear_therapist_list":
            return { ...state, therapistList: [] };
        default:
            return state;
    }
};

const getTherapistList = (dispatch) => async (text, limit) => {
    let usersArr = [];
    const firestoreRef = await firebase
        .firestore()
        .collection("users")
        .limit(limit);
    const query = await firestoreRef
        .where("role", "==", "therapist")
        .orderBy("name")
        .startAt(text)
        .endAt(text + "\uf8ff");

    try {
        if (text) {
            dispatch({ type: "clear_therapist" });
            getCollection = (querySnapshot) => {
                usersArr = [];
                querySnapshot.forEach((res) => {
                    const { name, profile_pic } = res.data();
                    usersArr.push({
                        key: res.id,
                        name,
                        profile_pic,
                    });
                });
                usersArr.length
                    ? dispatch({ type: "set_therapist", payload: usersArr })
                    : dispatch({
                        type: "add_error",
                        payload: "The system cannot find the input user",
                    });
            };
            query.onSnapshot(getCollection);
        } else {
            dispatch({ type: "clear_therapist" });
            dispatch({
                type: "set_error",
                payload: "This field cannot be empty. Please enter the therapist name again",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

export const { Provider, Context } = createDataContext(
    userReducer,
    { getTherapistList },
    {
        errorMessage: "",
        therapistList: [],
    }
);
