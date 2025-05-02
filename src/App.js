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
import { TimerToastProvider } from "./Components/dls/toast/TimerToastContext";
import SidebarContext from "./Components/SidbarContext/SidbarContext";
function App() {
  const router = useRoutes(routes);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [AccessToken, setAccessToken] = useState(false);
  const [RefreshToken, setRefreshToken] = useState(false);
  const [userInfos, setUserInfos] = useState(null);
  const login = (userInfos, accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("AccessToken", JSON.stringify(accessToken));
    localStorage.setItem("RefreshToken", JSON.stringify(refreshToken));
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          AccessToken,
          RefreshToken,
          userInfos,
          login,
          logout,
        }}
      >
        <TimerToastProvider>

          <ToastProvider>
            <div className='min-h-screen font-iransans'>
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
                    {isLoggedIn && <Sidebar isSidebarOpen={isSidebarOpen} />}
                    {isSidebarOpen && (
                      <div
                        className="lg:hidden fixed top-0 left-0 w-full h-full backdrop-blur-[5px] z-[49]"
                        onClick={() => setIsSidebarOpen(false)} // Clicking outside closes it
                        style={{ backgroundColor: "rgba(209, 209, 209, 0.31)" }}
                      />
                    )}
                    <div className={`w-full h-screen overflow-auto ${isSidebarOpen ? "overflow-hidden lg:overflow-auto pointer-events-none select-none " : ""} `}>{router}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ToastProvider>
        </TimerToastProvider>

      </AuthContext.Provider>
    </SidebarContext.Provider>
  );
}

export default App;
