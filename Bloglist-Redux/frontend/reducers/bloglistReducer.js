import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../src/services/blogs";

const BlogSlice = createSlice({
  name: "bloglist",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlog: (state, action) => {
      return action.payload;
    },
    deleteB: (state, action) => {
      return state.slice().filter((blog) => blog.id !== action.payload.id);
    },
    voteB: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, likes: blog.likes + 1 },
      );
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsServices.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const create = await blogsServices.create(content);
    dispatch(appendBlog(create));
  };
};

export const deleteBlog = (id, content) => {
  return async (dispatch) => {
    await blogsServices.del(id);
    dispatch(deleteB(content));
  };
};

export const voteAblog = (id, content) => {
  return async (dispatch) => {
    const voteBlog = await blogsServices.update(id, content);
    dispatch(voteB({ id: id, likes: voteBlog.likes + 1 }));
  };
};

export const { setBlog, appendBlog, deleteB, voteB } = BlogSlice.actions;
export default BlogSlice.reducer;
