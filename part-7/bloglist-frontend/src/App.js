import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import "./App.css";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  removeBlog,
} from "./reducers/blogReducer";

import {
  createNotification,
  clearNotification,
} from "./reducers/notificationReducer";
import { userLogin, userLogout, userInit } from "./reducers/loginReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.signeduser);

  // load credentials from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON);
      dispatch(userInit(localUser));
    }
  }, [dispatch]);

  // fetch all bloglists from remote database
  useEffect(() => {
    console.log("user:", user);
    if (user !== null) {
      dispatch(initializeBlogs());
    }
  }, [dispatch, user]);

  const createBlogTest = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject));
      const content = `a new blog ${blogObject.title} by ${blogObject.author} added`;

      setTimeout(() => {
        dispatch(clearNotification());
      }, 8000);
      dispatch(createNotification([content, "notify"]));
    } catch (exception) {
      console.log("failed to create a new blog", exception);
      const content = "Network error: failed to create a new blog";

      setTimeout(() => {
        dispatch(clearNotification());
      }, 8000);
      dispatch(createNotification([content, "error"]));
    }
  };

  const updateBlogTest = (blogObject) => {
    try {
      dispatch(updateBlog(blogObject));

      const content = `like a blog post ${blogObject.title} by ${blogObject.author}`;
      setTimeout(() => {
        dispatch(clearNotification());
      }, 8000);
      dispatch(createNotification([content, "notify"]));
    } catch (exception) {
      console.log("failed to create a new blog", exception);
      const content = "Network error: failed to update this blog";

      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      dispatch(createNotification([content, "error"]));
    }
  };

  const removeBlogTest = (blogId) => {
    try {
      dispatch(removeBlog(blogId));
      const content = `delete a blog post`;
      setTimeout(() => {
        dispatch(clearNotification());
      }, 8000);
      dispatch(createNotification([content, "notify"]));
    } catch (exception) {
      console.log("failed to remove this blog", exception);
      const content = "Network error: failed to remove this blog";

      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      dispatch(createNotification([content, "error"]));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with", username, password);
    try {
      console.log("login succeed with", username, password);
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

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  const handleLogout = () => {
    console.log(`${user.name} log out`);
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(userLogout());
  };

  const blogFormRef = useRef();

  const loginForm = () => (
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

  const blogPage = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlogTest} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          uid={user.id}
          updateBlog={updateBlogTest}
          removeBlog={removeBlogTest}
        />
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogPage()}</div>;
};

export default App;
