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
import ProtectedRoute from "./Components/routing/ProtectedRoute";
import UnitWrapper from "./Components/routing/unitWrapper";
import Index from "./Pages/Index";
import CoursesList from "./Pages/Courses/Courses";
import ProfessorsCard from "./Components/ProfessorsCard/ProfessorsCard";
import ProfessorDetails from "./Components/ProfessorDetails/ProfessorDetails";
import PostComment from "./Pages/PostComment/PostComment";
import ProfessorWrapper from "./Components/ProfessorDetails/ProfessorWrapper";



const routes = [
    { path: "/", element: <Index /> },

    { path: "/login", element: <Login /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "*", element: <NotFound /> },
    { path: "/reset-password", element: <Password /> },
    {
        path: "/unit/*", element: <ProtectedRoute><UnitWrapper /></ProtectedRoute>, children: [
            { path: "courses", element: <Courses /> },
            { path: "schedule", element: <Schedules /> },
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
                path: "popular/*", element: <ProfessorsCard />, 
            },

            {
                path: "most-visited", element: <ProfessorsCard />
            },
            {
                path: "last-comments", element: <ProfessorsCard />
            },
        ]
    },
    { path: "/poll/popular/ProfessorDetails", element: <ProfessorWrapper/> ,children : 
        [
            { path: "/poll/popular/ProfessorDetails/:professor", element: <ProfessorDetails/> }, // <- moved here
            { path: "/poll/popular/ProfessorDetails/:professor/:comment", element: <PostComment/> }, // <- moved here

        ]
     }, // <- moved here



]



export default routes;
