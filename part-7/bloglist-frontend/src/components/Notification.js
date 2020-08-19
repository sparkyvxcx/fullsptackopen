import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.message);

  if (message[0] === undefined) {
    return null;
  }

  return message[1] === "error" ? (
    <div className="error">{message[0]}</div>
  ) : (
    <div className="notify">{message[0]}</div>
  );
};

export default Notification;
