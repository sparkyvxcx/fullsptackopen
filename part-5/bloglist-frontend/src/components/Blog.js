import React, { useState } from "react";
const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [show, setShow] = useState(false);

  const showDetail = { display: show ? "" : "none" };

  const onClickHanlde = () => {
    setShow(!show);
  };

  const onLikeHanlde = () => {
    blog.likes++;
    updateBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={onClickHanlde}>{show ? "hide" : "view"}</button>
      </div>
      <div style={showDetail}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={onLikeHanlde}>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;
