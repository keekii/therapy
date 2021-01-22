import createDataContext from "./createDataContext";
import firebase from "../database/firebase";
import { navigate } from "../navigationRef";

const therapyPostureReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "clear_error_message":
            return { ...state, errorMessage: "" };
        case "set_therapy_posture_list":
            return { ...state, therapyPostureList: action.payload };
        case "clear_therapy_posture_list":
            return { ...state, therapyPostureList: [] };
        default:
            return state;
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: "clear_error_message" });
};

const getTherapyPostureList = (dispatch) => async () => {
    let therapyPostureList = [];
    const docRef = firebase.firestore().collection("postures").get()

    try {
        docRef.then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const {
                    key,
                    therapy_posture_description,
                    therapy_posture_name,
                    therapy_posture_thumbnail_image,
                    therapy_posture_video } = doc.data()

                therapyPostureList.push({
                    key,
                    therapy_posture_description,
                    therapy_posture_name,
                    therapy_posture_thumbnail_image,
                    therapy_posture_video
                })
            });
            dispatch({ type: "set_therapy_posture_list", payload: therapyPostureList });
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    } catch (err) {
        console.log(err);
    }
};

const storeTherapyPosture = () => async (name, des, thumbnail, vdo) => {
    const dbRef = firebase.firestore().collection("postures");
    try {
        dbRef
            .add({
                therapy_posture_name: name,
                therapy_posture_description: des,
                therapy_posture_thumbnail_image: thumbnail,
                therapy_posture_video: vdo,
            })
            .then(function (docRef) {
                const id = docRef.id;
                const dbRef = firebase.firestore().collection("postures").doc(id);
                dbRef.update({ key: id }).then(console.log("Success add id !!!"));
            });
        getTherapyPostureList();
        navigate("TherapyPosture");
    } catch (err) {
        console.log(err);
    }
};

const updateTherapyPostureById = (dispatch) => async (
    key,
    name, des, thumbnail, vdo
) => {

    const dbRef = firebase.firestore().collection("postures").doc(key);
    try {
        await dbRef.update({
            therapy_posture_name: name,
            therapy_posture_description: des,
            therapy_posture_thumbnail_image: thumbnail,
            therapy_posture_video: vdo,
        });
        getTherapyPostureList();
        navigate("TherapyPosture");
        console.log("Success");
    } catch (err) {
        console.log(err);
    }
};

const deleteTherapyPostureById = (dispatch) => (key) => {
    const dbRef = firebase.firestore().collection("postures").doc(key);

    dbRef.delete().then((res) => {
        console.log("Item removed from database");
        getTherapyPostureList();
        navigate("TherapyPosture");
    });
};

const storeTherapyPosture2 = () => async (name, des, thumbnail, vdo) => {
    const dbRef = firebase.firestore().collection("postures");
    try {
        dbRef
            .add({
                therapy_posture_name: name,
                therapy_posture_description: des,
                therapy_posture_thumbnail_image: thumbnail,
                therapy_posture_video: vdo,
            })
            .then(function (docRef) {
                const id = docRef.id;
                const dbRef = firebase.firestore().collection("postures").doc(id);
                dbRef.update({ key: id }).then(console.log("Success add id !!!"));
            });
        getTherapyPostureList();
        navigate("AdminTherapyPosture");
    } catch (err) {
        console.log(err);
    }
};

const updateTherapyPostureById2 = (dispatch) => async (
    key,
    name, des, thumbnail, vdo
) => {

    const dbRef = firebase.firestore().collection("postures").doc(key);
    try {
        await dbRef.update({
            therapy_posture_name: name,
            therapy_posture_description: des,
            therapy_posture_thumbnail_image: thumbnail,
            therapy_posture_video: vdo,
        });
        getTherapyPostureList();
        navigate("AdminTherapyPosture");
        console.log("Success");
    } catch (err) {
        console.log(err);
    }
};

const deleteTherapyPostureById2 = (dispatch) => (key) => {
    const dbRef = firebase.firestore().collection("postures").doc(key);

    dbRef.delete().then((res) => {
        console.log("Item removed from database");
        getTherapyPostureList();
        navigate("AdminTherapyPosture");
    });
};

export const { Provider, Context } = createDataContext(
    therapyPostureReducer,
    {
        getTherapyPostureList,
        storeTherapyPosture,
        deleteTherapyPostureById,
        updateTherapyPostureById,
        storeTherapyPosture2,
        deleteTherapyPostureById2,
        updateTherapyPostureById2,
        clearErrorMessage
    },
    {
        errorMessage: "",
        therapyPostureList: [],

    }
);
