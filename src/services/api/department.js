import dataFetcher from '../../services/dataFetcher'

const NAMESPACE = '/departments/'

const department = {
  fetchColleges(config) {
    return dataFetcher.get(NAMESPACE, config)
  },
  fetchCollegeCourses(config) {
    return dataFetcher.get(NAMESPACE + config.collegeId + '/courses/', config)
  },
}

export default department
