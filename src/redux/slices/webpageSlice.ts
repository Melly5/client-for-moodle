import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Service } from "../../utils/api/requests";
import { RootState } from "../store";

export interface PageContent {
  id: number;
  name: string;
  timemodified: number;
  content: string;
}

const InitialWebpageState: PageContent = {
  id: 0,
  name: "",
  timemodified: 0,
  content: "",
};

interface WebpageState {
  webpageContent: PageContent;
  status: string;
  error: string;
}

const initialState: WebpageState = {
  webpageContent: InitialWebpageState,
  status: "idle",
  error: "",
};
export interface webpageProps {
  courseid: string;
  lessonid: number;
}

export const getWebpageContent = createAsyncThunk(
  "lesson/getWebpageContent",
  async ({ courseid, lessonid }: webpageProps) => {
    try {
      const response = await Service.getWebpageContent(courseid);
      console.log(response.data.pages);
      const data: PageContent = getPageContent(response.data.pages, lessonid);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const getPageContent = (data: any, id: number) => {
  const temp = data.filter((item: PageContent) => item.id === id);
  return temp[0];
};

export const webpageSlice = createSlice({
  name: "webpage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWebpageContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWebpageContent.fulfilled, (state, action) => {
        state.status = "successful";
        state.webpageContent = action.payload as PageContent;
      })
      .addCase(getWebpageContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default webpageSlice.reducer;

export const selectAllWebpageContent = (state: RootState) => state.webpage;
