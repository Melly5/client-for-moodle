import { configureStore } from "@reduxjs/toolkit";
import courseCardListReducer from "./slices/coursesListSlice";
import courseReducer from "./slices/courseSlice";
import forumReducer from "./slices/forumSlice";
import lessonReducer from "./slices/lessonSlice";
import webpageReducer from "./slices/webpageSlice";

export const store = configureStore({
  reducer: {
    coursesList: courseCardListReducer,
    course: courseReducer,
    forum: forumReducer,
    lesson: lessonReducer,
    webpage: webpageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
