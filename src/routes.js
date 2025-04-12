import { Children } from "react";
import Password from "./Pages/ChangePassword/Password";
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";

import NotFound from "./Pages/404";
import Exams from "./Pages/exams";
import Schedules from "./Pages/schedules";
import Unit from "./Pages/Unit/Unit";
import SchedulesList from "./Pages/SchedulesList/SchedulesList";
import Courses from "./Pages/Courses/Courses";
import Poll from "./Pages/Poll/Poll";
import MasterCard from "./Components/MasterCard/MasterCard";
import ProtectedRoute from "./Components/ProtectedRoute";


const routes = [
    { path: "/login", element: <Login /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/*", element: <NotFound /> },
    { path: "/reset-password", element: <Password /> },
    {
        path: "/unit/*", element: <Unit />, children: [
            { path: "courses", element: <Courses /> },
            { path: "schedule", element: <Schedules/> },
            { path: "exams", element: <Exams /> },
            {
                path: "schedules/*", element: <SchedulesList />, children: [
                    { path: ":number", element: <SchedulesList /> },
                ]
            },

        ]
    },
    {
        path: "/poll/*", element: <Poll />, children: [
            {
                path: "popular", element: <div className='flex gap-[18px] items-center'>
                   
                    <MasterCard />
                    <MasterCard />
                    <MasterCard />
                    <MasterCard />

                </div>
            },
            {
                path: "most-visited", element: <div className='flex gap-[18px] items-center'>
                   
                    <MasterCard />
                    <MasterCard />
                    <MasterCard />
                    <MasterCard />

                </div>
            },
            {
                path: "last-comments", element: <div className='flex gap-[18px] items-center'>
                   
                    <MasterCard />
                    <MasterCard />
                    <MasterCard />
                    <MasterCard />


                </div>
            },
        ]
    },
]



export default routes;
