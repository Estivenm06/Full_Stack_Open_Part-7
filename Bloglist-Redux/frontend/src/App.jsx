import { useState } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import "./styles.css";
import { setNotification } from "../reducers/notificationReducer.js";
import { useSelector, useDispatch } from "react-redux";
import { loginWith, logoutWith } from "../reducers/loginReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { Users, User } from "./components/Users.jsx";
import { initializeBlogs } from "../reducers/bloglistReducer.js";
import { initializeUsers } from "../reducers/usersReducer.js";
import { checkIflogged } from "../reducers/loginReducer";
import { useEffect } from "react";
import { Blog } from "./components/Blog.jsx";
import { Container } from "@mui/material";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    try {
      dispatch(checkIflogged());
    } catch (error) {
      console.error(error);
    }
  }, []);

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
      dispatch(setNotification("Wrong username or password", 5000, "error"));
    }
  };

  return (
    <Router>
      <Container>
        <div>
          <div className="header">
            <Link to={`/blogs`} id="item">
              blogs
            </Link>
            <Link to={`/users`} id="item">
              users
            </Link>
            {user === null ? (
              loginForm()
            ) : (
              <form onSubmit={handleLogout} id="item">
                {user.name} logged in <button type="submit">logout</button>
              </form>
            )}
          </div>
          <h2>Blogs</h2>
          <Notification />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
