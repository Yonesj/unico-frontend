import React from 'react'
import MasterCard from "../MasterCard/MasterCard";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentCard from '../CommentCard/CommentCard';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ProfessorsCard = ({ type }) => {

  const [professorList, setProfessorList] = useState([]);

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
        const res = await fetch(`http://localhost:8000/professor-reviewer/reviews/latest/?limit=10`, {
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

  console.log(commentList[0]);



  return (
    <div className='relative poll-swipper'>
      <button className="custom-swiper-button-prev absolute -left-10 top-1/2 -translate-y-1/2 z-10">
        {/* Your left arrow SVG */}
        <svg width="24" height="24" fill="none" stroke="#C9C9C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6L9 12L15 18" />
        </svg>
      </button>

      <button className="custom-swiper-button-next absolute -right-10 top-1/2 -translate-y-1/2 z-10">
        {/* Your right arrow SVG */}
        <svg width="24" height="24" fill="none" stroke="#C9C9C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6L15 12L9 18" />
        </svg>
      </button>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={18}
        navigation={{
          prevEl: '.custom-swiper-button-next',
          nextEl: '.custom-swiper-button-prev',
        }}

        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        breakpoints={{
          // when window width is >= 0px
          0: {
            slidesPerView: 1,
          },
          // when window width is >= 640px (sm)
          748: {
            slidesPerView: 2,
          },
          // when window width is >= 768px (md)
          1064: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px (lg)
          1300: {
            slidesPerView: 4,
          },
        }}


        className='w-[61vw]'
      >
        {type == "last-comments" ? commentList.map((professor) => {
          console.log(professor);
          
          return (

            <SwiperSlide>
              <CommentCard overall_rating={professor?.professor?.overall_rating} first_name={professor?.professor?.first_name} last_name={professor?.professor?.last_name} id={professor?.professor?.id} review_text={professor?.review_text} />
            </SwiperSlide>
          )

        }) : professorList.map((professor) => {

          return (
            <SwiperSlide>
              <MasterCard first_name={professor?.first_name} last_name={professor?.last_name} id={professor?.id} reviews_count={professor?.reviews_count} overall_rating={professor?.overall_rating} courses={professor?.courses} />
            </SwiperSlide>
          )
        })}

      </Swiper>
    </div>
  )
}

export default ProfessorsCard