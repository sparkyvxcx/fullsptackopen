import React, { useState } from "react";

const Blog = ({ blog, uid, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [show, setShow] = useState(false);

  const showDetail = { display: show ? "" : "none" };
  let showRemove = { display: "none" };

  if (blog.user) {
    const buid = blog.user.id || blog.user;
    showRemove = { display: buid === uid ? "" : "none" };
  }

  const onClickHanlde = () => {
    setShow(!show);
  };

  const onLikeHanlde = () => {
    blog.likes++;
    updateBlog(blog);
  };

  const onRemoveHandle = () => {
    const message = `Remove blog ${blog.title} by ${blog.author}?`;
    const result = window.confirm(message);
    if (result) {
      removeBlog(blog.id);
    }
  };

  return (
    <div id="blog-item" style={blogStyle}>
      <div className="blogTitleAuthor">
        {blog.title} {blog.author}
        <button onClick={onClickHanlde}>{show ? "hide" : "view"}</button>
      </div>
      <div style={showDetail} className="detailContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button className="likeButton" onClick={onLikeHanlde}>
            like
          </button>
        </div>
        <div className="blogAuthor">{blog.author}</div>
        <button style={showRemove} onClick={onRemoveHandle}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
