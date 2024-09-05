import { useState } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import "./styles.css";
import { setNotification } from "../reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";
import { loginWith, logoutWith } from "../reducers/loginReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Home} from "./components/Home.jsx";
import {User} from './components/User.jsx'
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

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

  return (
    <Router>
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
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
