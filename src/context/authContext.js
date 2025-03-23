import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn:false,
    accessToken:null,
    refreshToken:null,
    userInfos:null,
    login:()=>{},
    logout:()=>{}

})

export default AuthContext