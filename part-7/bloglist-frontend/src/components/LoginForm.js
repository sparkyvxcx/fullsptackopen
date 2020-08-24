import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Notification from "../components/Notification";
import { userLogin } from "../reducers/loginReducer";
import {
  createNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Logging in with", username, password);
    try {
      dispatch(userLogin(username, password));
      setUsername("");
      setPassword("");
      dispatch(clearNotification);
    } catch (exception) {
      console.log("Wrong credentials");
      const content = "wrong username or password";
      setTimeout(() => {
        dispatch(clearNotification());
      }, 8000);
      dispatch(createNotification([content, "error"]));
    }
  };

  return (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
