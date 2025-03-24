import { getDaysOfWeek } from '../utils/helpers'

export const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

export const iPhoneNumbers = ['٠', '١', '٢', '٣', '۴', '۵', '۶', '٧', '٨', '٩']

export const weekDays = [
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه',
  'شنبه',
]

export const examsTableHeaders = [
  {
    key: 'course_code',
    value: 'کد',
  },
  {
    key: 'course_name',
    value: 'نام درس',
  },
  {
    key: 'group',
    value: 'گروه',
  },
  {
    key: 'credit',
    value: 'واحد',
  },
  {
    key: 'presented_by',
    value: 'استاد',
  },
  {
    key: 'examDate',
    value: 'زمان امتحان',
  },
  // {
  //   key: 'remove',
  //   value: 'حذف',
  // },
]

export const coursesMockData = [
  {
    id: 1,
    course_code: '40101',
    course_name: 'برنامه‌سازی وب',
    presented_by: 'محمدرضا محمدی',
    daysOfWeek: getDaysOfWeek([1, 3]),
    startTime: '13:30',
    endTime: '15:00',
    group: 1,
    credit: '3',
  },
  {
    id: 2,
    course_code: '40102',
    course_name: 'یادگیری ماشین',
    presented_by: 'ابولفضل مطهری',
    daysOfWeek: getDaysOfWeek([0, 2]),
    startTime: '09:00',
    endTime: '10:30',
    group: 1,
    credit: '3',
  },
  {
    id: 3,
    course_code: '40103',
    course_name: 'طراحی پایگاه داده‌ها',
    presented_by: 'مهدی آخی',
    daysOfWeek: getDaysOfWeek([0, 2]),
    startTime: '13:30',
    endTime: '15:00',
    group: 1,
    credit: '3',
  },
  {
    id: 4,
    course_code: '40104',
    course_name: 'مهندسی نرم‌اقزار',
    presented_by: 'ریواده',
    daysOfWeek: getDaysOfWeek([1, 3]),
    startTime: '09:00',
    endTime: '10:30',
    group: 1,
    credit: '3',
  },
  {
    id: 5,
    course_code: '40105',
    course_name: 'طراحی پایگاه داده‌ها',
    presented_by: 'محمدرضا محمدی',
    daysOfWeek: getDaysOfWeek([1, 3]),
    startTime: '13:30',
    endTime: '15:00',
    group: 1,
    credit: '3',
  },
  {
    id: 6,
    course_code: '40106',
    course_name: 'طراحی پایگاه داده‌ها',
    presented_by: 'ابولفضل مطهری',
    daysOfWeek: getDaysOfWeek([0, 2]),
    startTime: '09:00',
    endTime: '10:30',
    group: 2,
    credit: '3',
  },
]

export const schedules = [
  {
    id: 1,
    courses: [
      {
        id: 1,
        course_code: '40101',
        course_name: 'برنامه‌سازی وب',
        presented_by: 'محمدرضا محمدی',
        daysOfWeek: getDaysOfWeek([1, 3]),
        startTime: '13:30',
        endTime: '15:00',
        group: 1,
        examDate: '2023-12-23T13:00',
        credit: '3',
      },
      {
        id: 2,
        course_code: '40102',
        course_name: 'یادگیری ماشین',
        presented_by: 'ابولفضل مطهری',
        daysOfWeek: getDaysOfWeek([0, 2]),
        startTime: '09:00',
        endTime: '10:30',
        group: 1,
        examDate: '2023-12-23T13:00',
        credit: '3',
      },
    ],
  },
  {
    id: 2,
    courses: [
      {
        id: 3,
        course_code: '40103',
        course_name: 'طراحی پایگاه داده‌ها',
        presented_by: 'مهدی آخی',
        daysOfWeek: getDaysOfWeek([0, 2]),
        startTime: '13:30',
        endTime: '15:00',
        group: 1,
        examDate: '2023-12-23T13:00',
        credit: '3',
      },
      {
        id: 4,
        course_code: '40104',
        course_name: 'مهندسی نرم‌اقزار',
        presented_by: 'ریواده',
        daysOfWeek: getDaysOfWeek([1, 3]),
        startTime: '09:00',
        endTime: '10:30',
        group: 1,
        examDate: '2023-12-23T13:00',
        credit: '3',
      },
    ],
  },
]
