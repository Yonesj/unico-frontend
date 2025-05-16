import React from 'react'
import MasterCard from "../MasterCard/MasterCard";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentCard from '../CommentCard/CommentCard';


const ProfessorsCard = ({ type }) => {

  const [professorList, setProfessorList] = useState([]);
  console.log(type);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch(`http://localhost:8000/professor-reviewer/professors/${type}/`, {
          method: "GET",
          headers: {
            "Accept-Language": "fa",
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProfessorList(data.results);
        } else {
          throw new Error(Object.values(data)[0] || "An error occurred");
        }

      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        console.log("finally");
      }
    };

    fetchProfessors();
  }, [type]);


    const [commentList, setCommentList] = useState([]);

   useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch(`http://localhost:8000/professor-reviewer/reviews/latest/`, {
          method: "GET",
          headers: {
            "Accept-Language": "fa",
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setCommentList(data.results);
        } else {
          throw new Error(Object.values(data)[0] || "An error occurred");
        }

      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        console.log("finally");
      }
    };

    fetchProfessors();
  }, []);

  console.log(commentList);
  
  return (
    <div>
      {type == "last-comments" ? 
      <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-[18px] h-[280px] overflow-hidden items-center'>

       <CommentCard first_name = {commentList[0]?.first_name} last_name = {commentList[0]?.last_name} id = {commentList[0]?.id} review_text = {commentList[0]?.review_text} profile_image = {commentList[0]?.profile_image} />
       <CommentCard first_name = {commentList[1]?.first_name} last_name = {commentList[1]?.last_name} id = {commentList[1]?.id} review_text = {commentList[1]?.review_text} profile_image = {commentList[1]?.profile_image} />
       <CommentCard first_name = {commentList[2]?.first_name} last_name = {commentList[2]?.last_name} id = {commentList[2]?.id} review_text = {commentList[2]?.review_text} profile_image = {commentList[2]?.profile_image} />
       <CommentCard first_name = {commentList[3]?.first_name} last_name = {commentList[3]?.last_name} id = {commentList[3]?.id} review_text = {commentList[3]?.review_text} profile_image = {commentList[3]?.profile_image} />


      </div>
       : 
      <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-[18px] h-[270px] overflow-hidden items-center'>
        <MasterCard first_name={professorList[0]?.first_name} last_name={professorList[0]?.last_name} id={professorList[0]?.id} reviews_count={professorList[0]?.reviews_count} overall_rating={professorList[0]?.overall_rating} courses={professorList[0]?.courses} />
        <MasterCard first_name={professorList[1]?.first_name} last_name={professorList[1]?.last_name} id={professorList[1]?.id} reviews_count={professorList[1]?.reviews_count} overall_rating={professorList[1]?.overall_rating} courses={professorList[1]?.courses} />
        <MasterCard first_name={professorList[2]?.first_name} last_name={professorList[2]?.last_name} id={professorList[2]?.id} reviews_count={professorList[2]?.reviews_count} overall_rating={professorList[2]?.overall_rating} courses={professorList[2]?.courses} />
        <MasterCard first_name={professorList[3]?.first_name} last_name={professorList[3]?.last_name} id={professorList[3]?.id} reviews_count={professorList[3]?.reviews_count} overall_rating={professorList[3]?.overall_rating} courses={professorList[3]?.courses} />


      </div>}


    </div>
  )
}

export default ProfessorsCard