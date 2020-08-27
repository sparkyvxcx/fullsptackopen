import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const message = useSelector((state) => state.message);

  if (message[0] === undefined) {
    return null;
  }

  return message[1] === "error" ? (
    <Alert variant="danger">{message[0]}</Alert>
  ) : (
    <Alert variant="success">{message[0]}</Alert>
  );
};

export default Notification;
