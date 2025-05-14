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
import PostCommentContainer from "./Pages/PostCommentContainer/PostCommentContainer";
import CommentSubmitted from "./Components/CommentSubmitted/CommentSubmitted";
import Revisions from "./Components/Correction/Revisions";



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
                path: "most-popular/*", element: <ProfessorsCard type={"most-popular"} />, 
            },

            {
                path: "most-viewed", element: <ProfessorsCard type={"most-viewed"} />
            },
            {
                path: "last-comments", element: <ProfessorsCard type={"last-comments"}  />
            },
        ]
    },
    {
        path: "/poll/popular/ProfessorDetails",
        element: <ProfessorWrapper />,
        children: [
          {
            path: ":professor",
            element: <ProfessorDetails />
          },
          {
            path: ":professor/revisions",
            element: <Revisions/>
          },

          {
            path: ":professor/:comment",
            element: <PostCommentContainer />,
            children: [
              {
                path: "",
                element: <PostComment />
              },
              {
                path: "submitted",
                element: <CommentSubmitted/>
              }
              
            ]
          }
        ]
      }
      


]



export default routes;
