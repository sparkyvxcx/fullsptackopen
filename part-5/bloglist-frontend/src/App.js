import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const NoteForm = ({
  blog,
  createBlog,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
}) => (
  <div>
    <h3>create new</h3>
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={onTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="autho"
          value={blog.author}
          onChange={onAuthorChange}
        />
      </div>
      <div>
        url:
        <input type="text" name="url" value={blog.url} onChange={onUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
);

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const onChangeFactory = (setter) => (event) => setter(event.target.value);

  const createBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    // console.log("create a new Blog with", { title, author, url });
    try {
      setTitle("");
      setAuthor("");
      setUrl("");
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      console.log("failed to create a new blog", exception);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Logging in with", username, password);
    try {
      console.log("login succeed with", username, password);
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
    }
  };

  const handleLogout = () => {
    console.log(`${user.name} log out`);
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogPage = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      <NoteForm
        blog={{ title, author, url }}
        createBlog={createBlog}
        onTitleChange={onChangeFactory(setTitle)}
        onAuthorChange={onChangeFactory(setAuthor)}
        onUrlChange={onChangeFactory(setUrl)}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogPage()}</div>;
};

export default App;
