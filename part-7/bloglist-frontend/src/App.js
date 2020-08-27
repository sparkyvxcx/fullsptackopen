import React, { useEffect, useRef } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import BlogView from "./components/BlogView";
import UserView from "./components/UserView";
import Users from "./components/User";
import "./App.css";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "react-bootstrap";

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
import { userInit } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const users = useSelector((state) => state.user);
  const user = useSelector((state) => state.signeduser);

  console.log("user_init:", users);

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
      dispatch(initializeUsers());
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

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  const blogFormRef = useRef();

  const matchUser = useRouteMatch("/users/:id");
  const matchBlog = useRouteMatch("/blogs/:id");

  const userToShow = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const blogToShow = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const blogPage = () => (
    <div>
      <h2>Blogs app</h2>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <BlogView blog={blogToShow} />
        </Route>
        <Route path="/users/:id">
          <UserView user={userToShow} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlogTest} />
          </Togglable>
          <Table striped>
            <tbody>
              {sortedBlogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  uid={user.id}
                  updateBlog={updateBlogTest}
                  removeBlog={removeBlogTest}
                />
              ))}
            </tbody>
          </Table>
        </Route>
      </Switch>
    </div>
  );

  return (
    <div className="container">
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Menu username={user.name} />
          {blogPage()}
        </div>
      )}
    </div>
  );
};

export default App;
