import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Service } from "../../utils/api/requests";
import { RootState } from "../store";

export interface CourseInfo {
  id: number;
  name: string;
  modules: [];
}

export interface CourseCardState {
  courseItems: CourseInfo[];
  status: string;
  error: string;
}

const initialState: CourseCardState = {
  courseItems: [],
  status: "idle",
  error: "",
};

export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (courseid: string) => {
    try {
      const response = await Service.getCourseContent(courseid);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.status = "successful";

        state.courseItems = state.courseItems.concat(action.payload);
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default courseSlice.reducer;

export const selectAllCourseContent = (state: RootState) => state.course;
