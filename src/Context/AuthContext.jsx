import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token)

}, []);

const login = (token) => {
  localStorage.setItem('authToken', token);
  setIsLoggedIn(true)
}

const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
}
  return (
    <AuthContext.Provider value={{isLoggedIn, logout, login}}>
        {children}
    </AuthContext.Provider>
  )
}


