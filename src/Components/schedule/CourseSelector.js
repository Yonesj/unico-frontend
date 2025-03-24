import CollegeCombobox from '../../Components/schedule/CollegeCombobox'
import BInput from '../../Components/dls/BInput'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import api from '../../services/api'
import Loading from '../../Components/Loading'
import messages from '../../constants/messages'
import { useToast } from '../../Components/dls/toast/ToastService'
import { courseMapper } from '../../utils/mappers'

export default function CourseSelector({
  colleges,
  mode = 'search',
  setCoursesOfSchedule,
  currentScheduleId,
  setSchedules,
}) {
  if (!['search', 'filter'].includes(mode)) {
    throw new Error('The mode should be either search or filter.')
  }

  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [courses, setCourses] = useState([])
  const filteredCourses =
    query === ''
      ? courses
      : courses.filter(
          (course) =>
            course.course_code.match(query) ||
            course.course_name.match(query) ||
            course.presented_by.match(query),
        )

  const fetchCollegeCourses = async (collegeId) => {
    setIsLoading(true)
    const data = await api.department
      .fetchCollegeCourses({ collegeId })
      .then((res) => res.data.data)
      .then((courses) => courses.map(courseMapper))
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          messages.ERROR_OCCURRED
        toast.open({ message, type: 'error' })
      })
    setCourses(data)
    setIsLoading(false)
  }

  const addCourseToSchedule = (course) => {
    api.schedule
      .addCourseToSchedule({
        scheduleId: currentScheduleId,
        data: { id: course.id },
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          messages.ERROR_OCCURRED
        toast.open({ message, type: 'error' })
      })
    addCourse(course)
  }

  const addCourse = (course) => {
    setCoursesOfSchedule((prev) => {
      const courseInSchedule = prev.find((c) => c.id === course.id)
      delete courseInSchedule.mode
      return [...prev, { ...courseInSchedule }]
    })
    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          return {
            ...schedule,
            courses: [...schedule.courses, course],
          }
        }
        return schedule
      }),
    )
  }

  const addCourseAsHover = (course) => {
    setCoursesOfSchedule((prev) => {
      const courseInSchedule = prev.find((c) => c.id === course.id)
      if (courseInSchedule) return prev
      return [...prev, { ...course, mode: 'hover' }]
    })
  }

  const removeCourse = (course) => {
    setCoursesOfSchedule((prev) => {
      const courseInSchedule = prev.find((c) => c.id === course.id)
      if (courseInSchedule.mode !== 'hover') return prev
      return prev.filter((c) => c.id !== course.id)
    })
  }

  return (
    <div className='min-w-[20rem] max-w-[20rem] space-y-4 rounded-xl bg-primary/50 p-4 backdrop-blur'>
      <CollegeCombobox
        colleges={colleges}
        onSelect={(id) => fetchCollegeCourses(id)}
      />
      <BInput
        value={query}
        icon={faSearch}
        placeholder='درس مورد نظر را جستجو کنید.'
        dir='rtl'
        wrapperClass='shadow-md'
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='max-h-[38.5rem] space-y-2 overflow-auto'>
        {isLoading ? (
          <Loading />
        ) : (
          filteredCourses.map((course, i) => (
            <div
              key={i}
              className='flex cursor-pointer items-center justify-between rounded bg-grey-300/60 px-2 py-1 text-primary-darker transition-all hover:bg-grey-300'
              onMouseEnter={() => addCourseAsHover(course)}
              onMouseLeave={() => removeCourse(course)}
              onClick={() => addCourseToSchedule(course)}
            >
              <span>{course.course_name}</span>
              {/*<span>{course.group}</span>*/}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
