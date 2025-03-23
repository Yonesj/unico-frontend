import dataFetcher from '../../services/dataFetcher'

const NAMESPACE = '/schedules/'

const schedule = {
  fetchSchedules(config) {
    return dataFetcher.get(NAMESPACE, config)
  },
  addSchedule(config) {
    return dataFetcher.post(NAMESPACE + 'add/', config)
  },
  deleteSchedule(config) {
    return dataFetcher.delete(NAMESPACE + config.scheduleId + '/', config)
  },
  addCourseToSchedule(config) {
    return dataFetcher.post(
      NAMESPACE + config.scheduleId + '/addCourse/',
      config,
    )
  },
  deleteCourseFromSchedule(config) {
    return dataFetcher.delete(
      NAMESPACE + config.scheduleId + '/deleteCourse/',
      config,
    )
  },
}

export default schedule
