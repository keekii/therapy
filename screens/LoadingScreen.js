import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import firebase from "../database/firebase";

const LoadingScreen = () => {
  const { tryLocalSignin, state } = useContext(AuthContext);
  const { role } = state;

  useEffect(() => {
    tryLocalSignin(role);
  }, []);
  return null;
};

export default LoadingScreen;
