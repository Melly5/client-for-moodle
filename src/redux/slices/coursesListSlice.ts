import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Service } from "../../utils/api/requests";
import { RootState } from "../store";

export interface Course {
  id: number;
  fullname: string;
}

export interface CourseCardState {
  courseCards: Course[];
  status: string;
  error: string;
}

const initialState: CourseCardState = {
  courseCards: [],
  status: "idle",
  error: "",
};

export const getCourses = createAsyncThunk(
  "coursesList/getCourses",
  async () => {
    try {
      const response = await Service.getAllCourses();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const courseCardListSlice = createSlice({
  name: "courseCardList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.status = "successful";
        state.courseCards = state.courseCards.concat(action.payload);
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default courseCardListSlice.reducer;

export const selectAllCourses = (state: RootState) => state.coursesList;
/*
export const selectCourseById = (state: any, courseId: number) =>
  state.courseCardList.find((courseCard: Course) => courseCard.id === courseId);*/
