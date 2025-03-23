import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/api'

export const addSchedule = createAsyncThunk(
  'schedules/addSchedule',
  async (arg, thunkAPI) => {
    return await api.schedule
      .addSchedule()
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error))
  },
)

export const addCourseToSchedule = createAsyncThunk(
  'schedules/addCourseToSchedule',
  async (arg, thunkAPI) => {
    return await api.schedule
      .addCourseToSchedule({
        scheduleId: arg.scheduleId,
        data: { course: { id: arg.id } },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error))
  },
)

export const removeCourseFromSchedule = createAsyncThunk(
  'schedules/deleteCourseFromSchedule',
  async (arg, thunkAPI) => {
    return await api.schedule
      .deleteCourseFromSchedule({
        scheduleId: thunkAPI.getState().currentScheduleId,
        data: { course: { id: arg.id } },
      })
      .then((res) => res.data)
      .catch((error) => thunkAPI.rejectWithValue(error))
  },
)
