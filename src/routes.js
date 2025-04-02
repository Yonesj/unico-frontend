import { Children } from "react";
import Password from "./Pages/ChangePassword/Password";
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";

import NotFound from "./Pages/404";
import Exams from "./Pages/exams";
import Schedules from "./Pages/schedules";
import ProtectedRoute from "./Components/ProtectedRoute";
const routes = [
    {path:"/login" , element:<Login />},
    {path:"/sign-up" , element:<SignUp />},
    {path:"*" , element:<NotFound />},
    {path:"/reset-password" , element:<Password />},

    {path:"/exams" , element:<ProtectedRoute>
        <Exams/>
    </ProtectedRoute>},
    {path:"/schedules" , element:<Schedules/>},


]


    },

export default routes;
