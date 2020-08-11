import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const notification = useSelector((state) => state.message);

  console.log("-----------------------------", notification);

  return <div style={style}>{notification[0]}</div>;
};

export default Notification;
