import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, addBlogComment } from "../reducers/blogReducer";
import { Form, Button, Table } from "react-bootstrap";

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
        <Button className="likeButton" onClick={onLikeHanlde}>
          like
        </Button>
      </div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      <div>
        <h3>comments</h3>
        <div>
          <Form onSubmit={addComment} style={{ display: "flex" }}>
            <Form.Control
              id="comment"
              name="comment"
              type="text"
              value={comment}
              onChange={({ target }) => {
                setComment(target.value);
              }}
            ></Form.Control>
            <Button type="submit">comment</Button>
          </Form>
        </div>
        <Table striped>
          <tbody>
            {blog.comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BlogView;
