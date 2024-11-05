import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
// import {
//   sendMessageLoginSuccess,
//   sendMessageSignOut,
// } from "../socketUser/socketClient.js";

const AuthContext = createContext();
export const url = "http://localhost:5000";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ isLog: false });

  async function login(userData) {
    try {
      const result = await axios
        .post(url + "/api/login", userData)
        .then((response) => {
          if (response.data.success) {
            const id = response.data.id;
            //sau khi success, gui di thong diep login thanh cong cho server
            // sendMessageLoginSuccess(id);
            localStorage.setItem(
              "login",
              JSON.stringify({
                login: true,
                token: response.data.token,
                id: response.data.id,
              })
            );
            setAuth({
              isLog: true,
            });
            return true;
          } else {
            setAuth({ isLog: false });
            return false;
          }
        });
      return result;
    } catch (err) {
      console.error("Login failed: ", err.response.data);
      setAuth({ isLog: false });
      return false;
    }
  }

  function logout() {
    try {
      localStorage.removeItem("login");
      setAuth({ isLog: false });
      // sendMessageSignOut();
    } catch (err) {
      console.error("Error: ", err.response.data);
    }
  }

  function setLogin(userData) {
    localStorage.setItem(
      "login",
      JSON.stringify({
        login: true,
        token: userData.token,
        id: userData.id,
      })
    );
    setAuth({
      isLog: true,
    });
  }

  useEffect(() => {
    if (localStorage.length !== 0) {
      setAuth({
        isLog: localStorage.getItem("login"),
      });
    } else {
      setAuth({
        isLog: false,
      });
    }
  }, [localStorage.getItem("login")]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
