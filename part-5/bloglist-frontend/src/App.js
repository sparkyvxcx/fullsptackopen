import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // load credentials from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // fetch all bloglists from remote database
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      console.log(returnedBlog);
      setBlogs(blogs.concat(returnedBlog));
      const content = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`;
      setErrorMessage([content, "notify"]);
      setTimeout(() => {
        setErrorMessage([]);
      }, 8000);
    } catch (exception) {
      console.log("failed to create a new blog", exception);
      const content = "Network error: failed to create a new blog";
      setErrorMessage([content, "error"]);
      setTimeout(() => {
        setErrorMessage([]);
      }, 8000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      setBlogs(
        blogs.map((blog) => (blog.id === blogObject.id ? blogObject : blog))
      );
      await blogService.update(blogObject);
      // setBlogs(
      //   blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      // );
    } catch (exception) {
      console.log("failed to create a new blog", exception);
      const content = "Network error: failed to update this blog";
      setErrorMessage([content, "error"]);
      setTimeout(() => {
        setErrorMessage([]);
      }, 5000);
    }
  };

  const removeBlog = async (blogId) => {
    try {
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      await blogService.remove(blogId);
    } catch (exception) {
      console.log("failed to remove this blog", exception);
      const content = "Network error: failed to remove this blog";
      setErrorMessage([content, "error"]);
      setTimeout(() => {
        setErrorMessage([]);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with", username, password);
    try {
      console.log("login succeed with", username, password);
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage([]);
    } catch (exception) {
      console.log("Wrong credentials");
      const content = "wrong username or password";
      setErrorMessage([content, "error"]);
      setTimeout(() => {
        setErrorMessage([]);
      }, 8000);
    }
  };

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  const handleLogout = () => {
    console.log(`${user.name} log out`);
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const blogFormRef = useRef();

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification message={errorMessage} />
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
      <Notification message={errorMessage} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          uid={user.id}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogPage()}</div>;
};

export default App;
