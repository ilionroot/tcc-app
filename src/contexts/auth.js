import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as RootNavigation from "../RootNavigation";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "igormelo2207",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const userStoraged = await AsyncStorage.getItem("$triforce_tracker_user");

    if (!!userStoraged) {
      setUser(userStoraged);
      return RootNavigation.navigate("App");
    }

    RootNavigation.navigate("Login");
  }

  function logIn(username, password) {
    return new Promise((resolve, reject) => {
      api
        .post("/mongo-db/login", {
          email: username,
          password,
        })
        .then(async (res) => {
          console.log(res);
          // await AsyncStorage.setItem("$triforce_tracker_user", res.data);
          // setUser(res.data);
          // RootNavigation.navigate("App");
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function logOut() {
    RootNavigation.navigate("Login");
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
