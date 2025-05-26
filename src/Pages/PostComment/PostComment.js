import RatingSlider from '../../Components/RatingSlider'
import React, { useContext, useState, useEffect } from 'react'
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd';
import "./PostComment.css"
import { Flex, Radio, Modal } from 'antd';
import AddNewProfessor from '../../Components/AddNewProfessor/AddNewProfessor';
const options1 = [
  { label: 'حضور مهم است و تاثیر مستقیم دارد', value: 'mandatory_affects' },
  { label: 'حضور مهم نیست و تاثیر مثبت دارد', value: 'optional_positive' },
  { label: 'حضور و غیاب نمیکند', value: 'not_tracked' },
  { label: 'یادم نمیاد', value: 'unknown' },
];
const options2 = [
  { label: 'آره', value: 'yes' },
  { label: 'نه', value: 'no' },
];
const PostComment = () => {
  const navigate = useNavigate();
  const id = useParams().professor;
  const [options, setOptions] = useState([]);


  const [professorDetails, setProfessorDetails] = useState({});
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch(`http://localhost:8000/professor-reviewer/professors/${id}`, {
          method: "GET",
          headers: {
            "Accept-Language": "fa",
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          console.log("ok");
          setProfessorDetails(data);
          const courseOptions = data.courses.map(course => ({
            value: course.id, // or course.slug, etc.
            label: course.name
          }));

          setOptions([...courseOptions]);


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
  }, [id]);


  const [addCourseModal, setAddCourseModal] = useState(false);

  const [examDifficulty, setExamDifficulty] = useState(1);
  const [generalKnowledge, setGeneralKnowledge] = useState(1);
  const [teachingEngagement, setTeachingEngagement] = useState(1);
  const [homeworkDifficulty, setHomeworkDifficulty] = useState(1);
  const [grading, setGrading] = useState(1);

  const [course, setCourse] = useState(0);

  const [attendancePolicy, setAttendancePolicy] = useState("");
  const [receivedScore, setReceivedScore] = useState("");
  const [examResources, setExamResources] = useState("");
  const [wouldTakeAgain, setWouldTakeAgain] = useState(true);
  const [reviewText, setReviewText] = useState("");

  const postComment = async () => {
    try {
      const res = await fetch(`http://localhost:8000/professor-reviewer/reviews/`, {
        method: "POST",
        headers: {
          "Accept-Language": "fa",
          "Content-Type": "application/json",
          "Authorization": `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`
        },
        body: JSON.stringify({
          "course": course,
          "grading": grading,
          "exam_difficulty": examDifficulty,
          "general_knowledge": generalKnowledge,
          "homework_difficulty": homeworkDifficulty,
          "teaching_engagement": teachingEngagement,
          "exam_resources": examResources,
          "attendance_policy": attendancePolicy,
          "would_take_again": true,
          "received_score": receivedScore,
          "review_text": reviewText
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("ok");
        if (res.ok) {

          navigate("submitted", { state: { fromSubmit: true } });
        }

      } else {
        throw new Error(Object.values(data)[0] || "An error occurred");
      }

    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      console.log("finally");
    }
  };

  return (
    <>

      <div className='w-full bg-white rounded-lg mt-2.5 text-sm lg:text-base p-3 sm:p-8'>
        <div>
          <p>فرم ثبت نظر <span className="text-[#EF443C]">(اطلاعات شما مخفی خواهد ماند)</span></p>
        </div>
        <div className='flex flex-col gap-3.5 lg:flex-row lg:gap-8 mt-9 lg:mt-16 lg:items-center'>
          <p>چه درسی رو با این استاد داشتی <span className='text-[#EF443C]'>*</span> :</p>
          <div className='flex items-center gap-1.5 md:gap-2.5'>
            <div className='w-[190px] md:w-[214px]'>
              <Select
                className='border border-gray-500 border-solid font-iransansfa h-9 text-xs lg:text-[16px]' // Responsive font size
                defaultValue="درس مورد نظرت رو انتخاب کن"
                style={{ width: 186 }}
                options={options}
                suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#3B3B3B" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                </svg>}
                onChange={(e) => setCourse(e)}
              />
            </div>
            {/* <button onClick={() => setAddCourseModal(true)} className='px-3    bg-[#4CC6CB]  hover:bg-[#33BDC4] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm rounded-lg h-9 text-white'>
              <svg className='hidden lg:block' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7.46838 1.37598H6.53088C6.44755 1.37598 6.40588 1.41764 6.40588 1.50098V6.40723H1.75C1.66667 6.40723 1.625 6.44889 1.625 6.53223V7.46973C1.625 7.55306 1.66667 7.59473 1.75 7.59473H6.40588V12.501C6.40588 12.5843 6.44755 12.626 6.53088 12.626H7.46838C7.55172 12.626 7.59338 12.5843 7.59338 12.501V7.59473H12.25C12.3333 7.59473 12.375 7.55306 12.375 7.46973V6.53223C12.375 6.44889 12.3333 6.40723 12.25 6.40723H7.59338V1.50098C7.59338 1.41764 7.55172 1.37598 7.46838 1.37598Z" fill="white" />
              </svg>
              <p>افزودن درس</p>
            </button> */}
          </div>
        </div>
        <div className='bg-[#FAFAFA] rounded-xl mt-[52px] mb-[66px] p-6 sm:p-14 lg:p-6 pb-[18px] '>
          <div className='flex flex-col flex-wrap lg:flex-row justify-between'>
            <RatingSlider value={examDifficulty} label="سختی امتحان" onChange={(value) => setExamDifficulty(value)} />
            <RatingSlider value={homeworkDifficulty} label="سختی تکالیف" onChange={(value) => setHomeworkDifficulty(value)} />
            <RatingSlider value={grading} label="نمره دهی" onChange={(value) => setGrading(value)} />
            <RatingSlider value={generalKnowledge} label="دانش عمومی" onChange={(value) => setGeneralKnowledge(value)} />
            <RatingSlider value={teachingEngagement} label="جذابیت تدریس" onChange={(value) => setTeachingEngagement(value)} />
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
            <p>حضور غیاب : <span className='text-[#EF443C]'>*</span></p>
            <Radio.Group
              className='font-iransans'
              flex
              options={options1}
              defaultValue="hard"
              optionType="button"
              buttonStyle="solid"
              backgroundColor="red"
              onChange={(e) => setAttendancePolicy(e.target.value)}

            />
          </div>
          <div className='flex flex-col lg:flex-row gap-8  lg:gap-[20%]'>
            <div className='flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8'>
              <p>نمرت چند شد؟</p>
              <input
                type="text"
                placeholder="19"
                className="border border-solid border-[#D9D9D9] rounded-md w-[90px] h-[38px] px-3 font-iransansfa"
                onInput={(e) => {
                  const value = e.target.value;
                  // Allow empty or numbers from 0 to 20
                  if (/^(?:[0-9]|1[0-9]|20)?$/.test(value)) {
                    e.target.dataset.valid = "true";
                  } else {
                    e.target.dataset.valid = "false";
                    e.target.value = e.target.value.slice(0, -1); // remove last char
                  }
                }}
                onBlur={(e) => setReceivedScore(e.target.value)}
              />

            </div>
            <div className='flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8'>
              <p>منابع امتحان استاد :</p>
              <input onBlur={(e) => setExamResources(e.target.valid)} type="text" className='border border-solid border-[#D9D9D9] rounded-md w-full md:w-[399px] h-[40px] px-3 font-iransansfa' name="" id="" placeholder='منابع امتحانی رو وارد کن' />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
            <p> دوباره این استاد رو برمیداری؟  <span className='text-[#EF443C]'>*</span></p>
            <Radio.Group
              className='font-iransans'

              flex
              options={options2}
              defaultValue="yes"
              optionType="button"
              buttonStyle="solid"
              onChange={(e) => e.target.value == "yes" ? setWouldTakeAgain(true) : setWouldTakeAgain(false)}


            />
          </div>
        </div>
        <hr className='my-16' />
        <div>
          <div>
            <h4>نظر شما درباره این استاد چیه؟</h4>
            <p className='text-[#7A7E83] text-xs mt-0.5'>نظرت رو درباره تدریس و نحوه انتقال مطالب توسط استاد بنویس. سبک تدریسش چطوره؟ مطالب رو خوب توضیح می‌ده؟</p>
          </div>
          <div className='rounded-lg text-xs lg:text-sm bg-[#FAFAFA] p-4 my-2'>
            <p className='py-3'>چند نکته:</p>
            <div className='mr-5 mb-2'>
              <ul className='list-disc mb-2 flex flex-col gap-1   [&>li::marker]:text-xs font-normal'>
                <li>لطفاً از کلمات توهین‌آمیز یا نامناسب استفاده نکن، چون ممکنه نظرت حذف بشه.</li>
                <li>سعی کن دربارۀ تبعیض یا جانبداری استاد نسبت به دانشجویان قضاوت نکنی.</li>
                <li>قبل از ثبت نظر، یه بار دیگه متن رو بخون تا مطمئن بشی واضح و کامل نوشته شده.</li>
              </ul>
              <Link className='font-medium  underline underline-offset-4'>     مشاهده همه دستورالعمل‌ها  </Link>
            </div>
          </div>
          <div>
            <textarea onBlur={(e) => setReviewText(e.target.value)} maxLength={350} placeholder='به نظر تو، دانشجوهای دیگه باید درباره این استاد چه چیزهایی بدونن؟' className='h-[212px] w-full resize-none px-3 py-2 pb-16 border border-[#A7A9AD] rounded-lg' name="" id="">

            </textarea>
            <p className='text-left font-iransansfa text-xs text-[#64696F]'>0/350</p>
          </div>
          <button onClick={postComment} className='w-full mt-9 md:w-[293px] h-[52px] bg-[#4CC6CB]  hover:bg-[#33BDC4] transition-all rounded-xl py-2 px-4 text-white'>
            ثبت و ارسال نظر
          </button>
        </div>
        <Modal
          className="font-iransans addCourseModal"
          open={addCourseModal}
          onCancel={() => setAddCourseModal(false)}
          footer={[]}
          width={540}
          centered
        >
          <div className='w-full px-6 text-right text-[#383E46]'>
            <div>
              <p className='text-left text-[#383E46] font-medium'>افزودن درس جدید</p>
            </div>
            <div className='w-full h-0.5  bg-[#eee] mt-4 mb-[22px]'></div>
            <p>عنوان درس</p>
            <input type="text" placeholder='ریاضی 1'
              className='mt-2.5 mb-6 h-[52px] py-3 px-5 rounded-lg border border-solid border-[#A7A9AD] w-full' />
            <button className='w-full h-[52px] rounded-lg   bg-[#4CC6CB] hover:bg-[#33BDC4] transition-all text-white font-bold text-base'>افزودن</button>
          </div>
        </Modal>


      </div>

    </>

  )
}

export default PostComment