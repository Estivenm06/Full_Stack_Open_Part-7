import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";
import "./styles.css";
import { setNotification } from "../reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  voteAblog,
} from "../reducers/bloglistReducer";
import { useSelector, useDispatch } from "react-redux";
import { loginWith, logoutWith, checkIflogged } from "../reducers/loginReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    );
  };

  const handleLogout = () => {
    try {
      dispatch(logoutWith());
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(loginWith({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification("Wrong username or password", 5000, "errorRed"));
    }
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
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <form onSubmit={handleLogout}>
            {user.name} logged in <button type="submit">logout</button>
          </form>
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
      )}
    </div>
  );
};

export default App;
