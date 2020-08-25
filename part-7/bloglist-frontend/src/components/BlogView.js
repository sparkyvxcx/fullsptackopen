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
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button className="likeButton" onClick={onLikeHanlde}>
          like
        </button>
      </div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogView;
