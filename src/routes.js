import Password from "./Pages/ChangePassword/Password";
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";
const routes = [
    {path:"/login" , element:<Login />},
    {path:"/sign-up" , element:<SignUp />},
    {path:"/password" , element:<Password />},
];

export default routes;
