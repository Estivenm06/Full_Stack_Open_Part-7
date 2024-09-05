import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import { getAll, create, setToken, update } from "./services/blogs";
import { login } from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotification } from "./reducers/notificationReducer";
import { createUser } from "./reducers/UserReducer";
import { useContext } from "react";
import "./styles.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, dispatch] = useContext(createNotification);
  const [user, dispatchUser] = useContext(createUser);

  useEffect(() => {
    try {
      checkIfLogged();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const blogFormRef = useRef();

  const addBlog = async (noteObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      createNewBlog.mutate(noteObject);
      dispatch({
        type: "set_notification",
        payload: {
          message: `a new blog ${noteObject.title} by ${noteObject.author}`,
          className: "errorGreen",
        },
      });
      setTimeout(() => {
        dispatch({ type: "delete_notification" });
      }, 5000);
    } catch (error) {
      dispatch({
        type: "set_notification",
        payload: {
          message: `${error}`,
          className: "errorRed",
        },
      });
      setTimeout(() => {
        dispatch({ type: "delete_notification" });
      }, 5000);
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
      window.localStorage.removeItem("loggedUserBlog");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginWith({ username, password });
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch({
        type: "set_notification",
        payload: {
          message: "Wrong username or password",
          className: "errorRed",
        },
      });
      setTimeout(() => {
        dispatch({ type: "delete_notification" });
      }, 5000);
    }
  };

  const handleLikes = async (id) => {
    const blogIndex = blogs.find((n) => n.id === id);
    const blogToUpdate = { ...blogIndex, likes: blogIndex.likes + 1 };
    likeBlog(id, blogToUpdate);
  };
  //Query
  const queryClient = useQueryClient();
  //Blogs
  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
    initialData: [],
  });
  //Loading
  if (blogsLoading) return <div>Loading blogs...</div>;
  //Blogs Requests
  const createNewBlog = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    refetchOnWindowFocus: false,
  });
  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    refetchOnWindowFocus: false,
  });
  const likeBlog = (id, blog) => {
    updateBlogMutation.mutate({ id, blog });
  };
  //User request
  const loginWith = async (credentials) => {
    const user = await login(credentials);
    window.localStorage.setItem("loggedUserBlog", JSON.stringify(user));
    setToken(user.token);
    dispatchUser({ type: "login", payload: user });
  };
  const checkIfLogged = () => {
    const localStorage = window.localStorage.getItem("loggedUserBlog");
    if (localStorage) {
      const user = JSON.parse(localStorage);
      setToken(user.token);
      dispatchUser({ type: "check", payload: JSON.parse(localStorage) });
    }
  };
  const blogSorted = blogs.sort((a, b) => {
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
