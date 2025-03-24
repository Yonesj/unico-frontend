import { Children } from "react";
import Password from "./Pages/ChangePassword/Password";
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";

import NotFound from "./Pages/404";
import Exams from "./Pages/exams";
import Schedules from "./Pages/schedules";
const routes = [
    {path:"/login" , element:<Login />},
    {path:"/sign-up" , element:<SignUp />},
    {path:"/404" , element:<NotFound />},
    {path:"/reset-password" , element:<Password />},
    {path:"/" , element:<Exams />  ,
    },
export default routes;
