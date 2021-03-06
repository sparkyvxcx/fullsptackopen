import React from "react";

const UserView = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
        <li>Placeholder for testing</li>
      </ul>
    </div>
  );
};

export default UserView;
