import React, { createContext, useState } from 'react'
import { useContext } from 'react';
import Cookies from 'js-cookie'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const rawUser = Cookies.get("jwt") || localStorage.getItem("messenger");
  const [authUser, setAuthUser] = useState(() => {
    try {
      return rawUser ? JSON.parse(rawUser) : undefined;
    } catch (e) {
      console.error("Error parsing auth user", e);
      return undefined;
    }
  });

  return (
    <>
      <AuthContext.Provider value={[authUser, setAuthUser]}>{children}</AuthContext.Provider>
    </>
  )
}

export const useAuth = () => useContext(AuthContext);



