import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from '@/features/schedules/scheduleSlice'

export const store = configureStore({
  reducer: {
    schedules: scheduleReducer,
  },
})

export default store
