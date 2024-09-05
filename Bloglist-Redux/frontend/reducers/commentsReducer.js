import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../src/services/blogs";

const CommentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    commentB: (state, action) => {
      return state.map((blog) => {
        blog.id !== action.payload.id
          ? blog
          : { ...blog, comments: action.payload.content };
      });
    },
    setComments: (state, action) => {
      return action.payload;
    },
  },
});

export const commentABlog = (comment) => {
  const id = comment.id;
  const content = comment.content;
  console.log(content);
  return async (dispatch) => {
    const commentBlog = await blogsServices.comment(id, content);
    dispatch(commentB({ id, commentBlog }));
  };
};

export const getComments = (id) => {
  return async (dispatch) => {
    const getCommentsofBlog = await blogsServices.getComments(id);
    dispatch(setComments(getCommentsofBlog));
  };
};

export const { commentB, setComments } = CommentsSlice.actions;
export default CommentsSlice.reducer;
