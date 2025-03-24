import { getDaysOfWeek } from '../utils/helpers'

export const courseMapper = (cls) => ({
  ...cls,
  daysOfWeek: getDaysOfWeek(cls.day_of_week),
  startTime: cls.start_time,
  endTime: cls.end_time,
  credit: cls.unit_count || 3,
  examDate: cls.exam_date,
})
