import React from "react";

const Notification = ({ message }) => {
  if (message[0] === null) {
    return null;
  }
  const theme = `alert alert-${message[1]}`;
  const prompt =
    message[1] === "success" ? "Success!" : "It look like there was a problem.";
  return (
    <div className={theme}>
      <div className="alert-content">
        <h2 className="alert-title">{prompt}</h2>
        <div className="alert-body">
          <p>{message[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
