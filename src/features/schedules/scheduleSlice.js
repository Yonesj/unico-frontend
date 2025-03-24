import { createSlice } from '@reduxjs/toolkit'

export const scheduleSlice = createSlice({
  name: 'schedules',
  initialState: {
    schedules: [],
    currentScheduleId: 1,
  },
  reducers: {
    setSchedules(state, action) {
      state.schedules = action.payload
    },
    setCurrentScheduleId(state, action) {
      state.currentScheduleId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('schedules/addSchedule/fulfilled', (state, action) => {
        state.schedules.push(action.payload)
      })
      .addCase('schedules/addCourseToSchedule/fulfilled', (state, action) => {
        state.schedules = state.schedules.map((schedule) => {
          if (schedule.id === action.payload.id) {
            return action.payload
          }
          return schedule
        })
      })
      .addCase(
        'schedules/removeCourseFromSchedule/fulfilled',
        (state, action) => {
          state.schedules = state.schedules.map((schedule) => {
            if (schedule.id === action.payload.id) {
              return action.payload
            }
            return schedule
          })
        },
      )
  },
})

export const selectSchedules = (state) => state.schedules.schedules
export const selectCurrentScheduleId = (state) =>
  state.schedules.currentScheduleId
export const { setSchedules, setCurrentScheduleId, addSchedule } =
  scheduleSlice.actions
export default scheduleSlice.reducer
