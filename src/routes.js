import { Children } from "react";
import Password from "./Pages/ChangePassword/Password";
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";

import NotFound from "./Pages/404";
import Exams from "./Pages/exams";
import Schedules from "./Pages/schedules";
import Unit from "./Pages/Unit/Unit";
import SchedulesLists from "./Pages/SchedulesLists/SchedulesLists";
import Courses from "./Pages/Courses/Courses";
import Poll from "./Pages/Poll/Poll";
import MasterCard from "./Components/MasterCard/MasterCard";
import ProtectedRoute from "./Components/routing/ProtectedRoute";
import UnitWrapper from "./Components/routing/unitWrapper";
import Index from "./Pages/Index";
import CoursesList from "./Pages/Courses/Courses";

import Notification from "./Pages/Notification/Notification"

import ProfessorsCard from "./Components/ProfessorsCard/ProfessorsCard";
import ProfessorDetails from "./Components/ProfessorDetails/ProfessorDetails";
import PostComment from "./Pages/PostComment/PostComment";
import ProfessorWrapper from "./Components/ProfessorDetails/ProfessorWrapper";
import PostCommentContainer from "./Pages/PostCommentContainer/PostCommentContainer";
import CommentSubmitted from "./Components/CommentSubmitted/CommentSubmitted";
import Revisions from "./Components/Revisions/Revisions";
import AddNewProfessor from "./Components/AddNewProfessor/AddNewProfessor";
import CompareProfessor from "./Pages/CompareProfessor/CompareProfessor";
import Home from "./Pages/Home/Home";

import Ticket from "./Pages/Ticket/Ticket";
import NewTicket from "./Pages/Ticket/NewTicket/NewTicket";
import ChatPage from "./Pages/Ticket/Chat/Chat";

import AboutUs from "./Pages/AboutUs/AboutUs";
import Rules from "./Pages/Rules/Rules";
import ProfileWrapper from "./Pages/ProfileWrapper/ProfileWrapper";
import MyComments from "./Pages/MyComments/MyComments";
import Notifications from "./Pages/Notifications/Notifications";




const routes = [
    { path: "/", element: <Index /> },

    { path: "/ticket", element: <Ticket /> },
    { path: "/new-ticket", element: <NewTicket /> },
    { path: "/chat/:id", element: <ChatPage /> },
    
    { path: "/login", element: <Login /> },
    { path: "/Notification", element: <Notification /> },

    { path: "/sign-up", element: <SignUp /> },
    { path: "*", element: <NotFound /> },
    { path: "/reset-password", element: <Password /> },
    {
        path: "/unit/*",   element: <ProtectedRoute><UnitWrapper /></ProtectedRoute>, desktop:true , children: [
            { path: "courses", element: <Courses /> , desktop:true },
            { path: "schedule", element: <Schedules/> , desktop:true },
            { path: "exams", element: <Exams />  , desktop:true},

            {
                path: "schedules/*", element: <SchedulesLists />
            },

        ]
    },
    {
        path: "/poll/*", element: <Poll />, children: [
            {
                path: "most-popular/*", element: <ProfessorsCard type={"most-popular"} />,
            },

            {
                path: "most-viewed", element: <ProfessorsCard type={"most-viewed"} />
            },
            {
                path: "last-comments", element: <ProfessorsCard type={"last-comments"} />
            }

        ]
    },
    {
        path: "/poll/ProfessorDetails",
        element: <ProfessorWrapper />,
        children: [
            {
                path: ":professor",
                element: <ProfessorDetails />
            },
            {
                path: ":professor/revisions",
                element: <Revisions />
            },
            {
                path: ":professor/compare",
                element: <CompareProfessor />
            },

            {
                path: ":professor/comment",
                element: <PostCommentContainer />,
                children: [
                    {
                        path: "",
                        element: <PostComment />
                    },
                    {
                        path: "submitted",
                        element: <CommentSubmitted />
                    }

                ]
            }
        ]
    },
    {
        path: "/poll/add-new-professor", element: <ProfessorWrapper />, children:
            [
                {
                    path: "",
                    element: <AddNewProfessor />
                },
            ]
    },
        { path: "/home", element: <Home/> },
        { path: "/about-us", element: <AboutUs/> },
        { path: "/rules", element: <Rules/> },
        { path: "/profile/*", element: <ProfileWrapper/>  , children : [
                { path: "userComments", element: <MyComments/>},
                { path: "notifications", element: <Notifications/>},
        ]},





]



export default routes;
