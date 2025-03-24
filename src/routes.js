import { Children } from "react";
import Password from "./Pages/ChangePassword/Password";
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";
import Unit from "./Pages/Unit/Unit";
const routes = [
    {path:"/login" , element:<Login />},
    {path:"/sign-up" , element:<SignUp />},
    {path:"/password" , element:<Password />},
    {path:"/main" , element:<Main /> , Children :[
        {
            path :"/unit" , element : <Unit/>,
        },
        {
            // path :"/nazarsanji" , element : <Nazarsanji/>,
        }
    ]},
    
];

export default routes;
