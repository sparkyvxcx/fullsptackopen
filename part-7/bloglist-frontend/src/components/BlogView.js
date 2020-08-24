import React from "react";
import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogReducer";

const BlogView = ({ blog }) => {
  const dispatch = useDispatch();

  console.log("blogview:", blog);
  if (!blog) {
    return null;
  }

  const onLikeHanlde = () => {
    blog.likes++;
    dispatch(updateBlog(blog));
    // updateBlog(blog);
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button className="likeButton" onClick={onLikeHanlde}>
          like
        </button>
      </div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
    </div>
  );
};

export default BlogView;
