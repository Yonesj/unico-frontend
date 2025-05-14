import React from 'react'
import MasterCard from "../MasterCard/MasterCard";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';


const ProfessorsCard = ({type}) => {

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
          console.log(data.results); // use data directly here
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
  
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-[18px] h-[270px] overflow-hidden items-center'>

        <MasterCard first_name={professorList[0]?.first_name} last_name={professorList[0]?.last_name} id={professorList[0]?.id} reviews_count={professorList[0]?.reviews_count} overall_rating={professorList[0]?.overall_rating}  courses={professorList[0]?.courses} />
        <MasterCard first_name={professorList[1]?.first_name} last_name={professorList[1]?.last_name} id={professorList[1]?.id} reviews_count={professorList[1]?.reviews_count} overall_rating={professorList[1]?.overall_rating}  courses={professorList[1]?.courses} />
        <MasterCard first_name={professorList[2]?.first_name} last_name={professorList[2]?.last_name} id={professorList[2]?.id} reviews_count={professorList[2]?.reviews_count} overall_rating={professorList[2]?.overall_rating}  courses={professorList[2]?.courses} />
        <MasterCard first_name={professorList[3]?.first_name} last_name={professorList[3]?.last_name} id={professorList[3]?.id} reviews_count={professorList[3]?.reviews_count} overall_rating={professorList[3]?.overall_rating}  courses={professorList[3]?.courses} />
        

      </div>

    </div>
  )
}

export default ProfessorsCard