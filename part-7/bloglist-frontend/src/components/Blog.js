import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  // let showRemove = { display: "none" };

  // if (blog.user) {
  //   const buid = blog.user.id || blog.user;
  //   showRemove = { display: buid === uid ? "" : "none" };
  // }

  // const onClickHanlde = () => {
  //   setShow(!show);
  // };

  // const onLikeHanlde = () => {
  //   blog.likes++;
  //   updateBlog(blog);
  // };

  // const onRemoveHandle = () => {
  //   const message = `Remove blog ${blog.title} by ${blog.author}?`;
  //   const result = window.confirm(message);
  //   if (result) {
  //     removeBlog(blog.id);
  //   }
  // };

  // return (
  //   <div id="blog-item" style={blogStyle}>
  //     <div className="blogTitleAuthor">
  //       <Link to={`/blogs/${blog.id}`}>
  //         {blog.title} {blog.author}
  //       </Link>
  //     </div>
  //   </div>
  // );

  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td>{blog.author}</td>
    </tr>
  );
};

export default Blog;
