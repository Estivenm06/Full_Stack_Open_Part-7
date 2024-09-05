import {
  createBlog
} from "../../reducers/bloglistReducer";
import CreateForm from "./CreateForm";
import Togglable from "./Togglable";
import Blogs from "./Blogs";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";

export const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogslist);

  const blogFormRef = useRef();

  const addBlog = async (newObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createBlog(newObject));
      dispatch(
        setNotification(
          `a new blog ${newObject.title} by ${newObject.author}`,
          5000,
          "success",
        ),
      );
    } catch (error) {
      dispatch(setNotification(`${error}`, 5000, "errorRed"));
    }
  };

  const createForm = () => {
    return (
      <div>
        <Togglable buttonLabel={"create new"} ref={blogFormRef}>
          <CreateForm createBlog={addBlog} />
        </Togglable>
      </div>
    );
  };

  const blogsLikes = blogs.map((element) => element);
  const blogSorted = blogsLikes.sort((a, b) => {
    return b.likes - a.likes;
  });

  return (
    <div>
      {createForm()}
      {blogSorted.map((blog, id) => (
        <Blogs
          key={id}
          blog={blog}
        />
      ))}
    </div>
  );
};