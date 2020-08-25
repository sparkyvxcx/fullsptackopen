import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, addBlogComment } from "../reducers/blogReducer";

const BlogView = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const onLikeHanlde = () => {
    blog.likes++;
    dispatch(updateBlog(blog));
    // updateBlog(blog);
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(addBlogComment(blog.id, { content: comment }));
    setComment("");
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
        <div>
          <form onSubmit={addComment}>
            <input
              id="comment"
              name="comment"
              type="text"
              value={comment}
              onChange={({ target }) => {
                setComment(target.value);
              }}
            />
            <button type="submit">add comment</button>
          </form>
        </div>
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
