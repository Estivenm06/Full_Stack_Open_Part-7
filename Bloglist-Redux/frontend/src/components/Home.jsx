import {
  initializeBlogs,
  createBlog,
  voteAblog,
} from "../../reducers/bloglistReducer";
import { checkIflogged } from "../../reducers/loginReducer";
import CreateForm from "./CreateForm";
import Togglable from "./Togglable";
import Blog from "./Blog";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogslist);
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    try {
      dispatch(checkIflogged());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const blogFormRef = useRef();

  const addBlog = async (newObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createBlog(newObject));
      dispatch(
        setNotification(
          `a new blog ${newObject.title} by ${newObject.author}`,
          5000,
          "errorGreen",
        ),
      );
    } catch (error) {
      dispatch(setNotification(`${error}`, 5000, "errorRed"));
    }
  };

  const createForm = () => {
    return (
      <div>
        <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
          <CreateForm createBlog={addBlog} />
        </Togglable>
      </div>
    );
  };

  const handleLikes = (id) => {
    const blogIndex = blogs.find((n) => n.id === id);
    dispatch(voteAblog(id, blogIndex));
  };

  const blogsLikes = blogs.map((element) => element);
  const blogSorted = blogsLikes.sort((a, b) => {
    return b.likes - a.likes;
  });
  return (
    <div>
      {createForm()}
      {blogSorted.map((blog, id) => (
        <Blog
          key={id}
          id={blog.id}
          blog={blog}
          blogs={blogs}
          user={user}
          handleLikes={() => handleLikes(blog.id)}
          buttonLabel="view"
        />
      ))}
    </div>
  );
};