import "./App.css";
import { AnimatePresence, motion } from 'framer-motion'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import ToastProvider from '../src/Components/dls/toast/ToastProvider'
import React, { useCallback, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./context/authContext";

import Sidebar from "./Components/Sidebar/Sidebar";
import {TimerToastProvider} from "./Components/dls/toast/TimerToastContext";
function App() {
  const router = useRoutes(routes);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [refreshToken, setRefreshToken] = useState(false);
  const [userInfos, setUserInfos] = useState(null);
  const login =(userInfos, accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("accessToken", JSON.stringify({ accessToken }));
    localStorage.setItem("refreshToken", JSON.stringify({ refreshToken }));
  }
  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserInfos({});
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
  }, []);

  // useEffect(() => {
  //   const AccessToken = JSON.parse(localStorage.getItem("AccessToken"));
  //   if (AccessToken) {
  //     fetch(`http://localhost:8000/auth/uesrs/me/`, {
  //       headers: {
  //         Authorization: `Bearer ${AccessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((userData) => {
  //         setIsLoggedIn(true);
  //         setUserInfos(userData);
  //       });
  //   }
  //   else{
  //     setIsLoggedIn(false)
  //   }
  // }, [login , logout]);

 //useEffect(() => {
  // const access = JSON.parse(localStorage.getItem("access"));
  // if (!accessToken) {
  //   const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  //   if(refreshToken){
  //     fetch(`localhost:8000/auth/jwt/refresh/`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((access) => {
  //         localStorage.setItem(access);})}
  //       
  //   }
 //  }}
 //  else {
 //    fetch(`localhost:8000/auth/uesrs/me/`, {
 //      headers: {
 //        Authorization: `JWT ${localStorageData.token}`,
 //      },
 //    }
 //      .then((res) => res.json())
 //      .then((userData) => {
 //        setIsLoggedIn(true);
 //        setUserInfos(userData);
 //      });
 //  }
 //  else{
 //    setIsLoggedIn(false)
 //  }
 //}, [login , logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        accessToken,
        refreshToken,
        userInfos,
        login,
        logout,
      }}
    >
        <TimerToastProvider>

        <ToastProvider>

          <div className='min-h-screen  font-iransans'>
            <AnimatePresence initial={false} mode='wait'>
              <motion.div
                key={router.asPath}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='flex h-full min-h-[calc(100vh-3.75rem)] flex-col justify-center'
              >
                <div className="flex">
                {isLoggedIn ? <Sidebar/> : null}
                <div className="w-full   h-screen overflow-auto">{router}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ToastProvider>
        </TimerToastProvider>

    </AuthContext.Provider>
  );
}

export default App;
