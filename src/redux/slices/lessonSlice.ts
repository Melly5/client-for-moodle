import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Service } from "../../utils/api/requests";
import { RootState } from "../store";

export interface LessonPageI {
  id: number;
  lessonid: number;
  prevpageid: number;
  nextpageid: number;
  qtype: number;
  qoption: number;
  timecreated: number;
  timemodified: number;
  title: string;
  contents: string;
  type: number;
  typeid: number;
  typestring: string;
}
export interface LessonPageAnswersI {
  id: number;
  answerfiles: [];
  responsefiles: [];
  jumpto: number;
  grade: number;
  score: number;
  flags: number;
  timecreated: number;
  timemodified: number;
  answer: string;
  answerformat: number;
  response: string;
  responseformat: number;
}

export interface LessonI {
  page: LessonPageI;
  answers: LessonPageAnswersI[];
}

interface LessonPageState {
  lessonPageItems: LessonI;
  status: string;
  error: string;
}

const InitialStatePage: LessonI = {
  page: {
    id: -1,
    lessonid: 0,
    prevpageid: 0,
    nextpageid: 0,
    qtype: 0,
    qoption: 0,
    timecreated: 0,
    timemodified: 0,
    title: "",
    contents: "",
    type: 0,
    typeid: 0,
    typestring: "",
  },
  answers: [
    {
      id: 0,
      answerfiles: [],
      responsefiles: [],
      jumpto: -1,
      grade: 0,
      score: 0,
      flags: 0,
      timecreated: 1684816957,
      timemodified: 0,
      answer: "Далее",
      answerformat: 1,
      response: "",
      responseformat: 1,
    },
  ],
};

const initialState: LessonPageState = {
  lessonPageItems: InitialStatePage,
  status: "idle",
  error: "",
};

export interface LessonProps {
  lessonid: number;
  startpageid: number;
}

export const getLessonPageContent = createAsyncThunk(
  "lesson/getLessonPageContent",
  async ({ lessonid, startpageid }: LessonProps) => {
    try {
      const response = await Service.getLessonPageContent(
        lessonid,
        startpageid
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLessonPageContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLessonPageContent.fulfilled, (state, action) => {
        state.status = "successful";
        state.lessonPageItems = action.payload;
      })
      .addCase(getLessonPageContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default lessonSlice.reducer;

export const selectAllLessonPageContent = (state: RootState) => state.lesson;
