import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Service } from "../../utils/api/requests";
import { RootState } from "../store";

export interface ForumDiscussion {
  id: number;
  name: string;
  userfullname: string;
  created: number;
  usermodifiedfullname: string;
  timemodified: number;
  numreplies: number;
}
export interface ForumDiscussionState {
  discussionItems: ForumDiscussion[];
  status: string;
  error: string;
}

const initialState: ForumDiscussionState = {
  discussionItems: [],
  status: "idle",
  error: "",
};

export const getForumDiscussions = createAsyncThunk(
  "forum/getForumDiscussions",
  async (forumid: number) => {
    try {
      const response = await Service.getForumDiscussions(forumid);
      return response.data.discussions;
    } catch (error) {
      console.error(error);
    }
  }
);

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getForumDiscussions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getForumDiscussions.fulfilled, (state, action) => {
        state.status = "successful";

        state.discussionItems = state.discussionItems.concat(action.payload);
        console.log(state.discussionItems);
      })
      .addCase(getForumDiscussions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export default forumSlice.reducer;

export const selectAllForumDiscussions = (state: RootState) => state.forum;
