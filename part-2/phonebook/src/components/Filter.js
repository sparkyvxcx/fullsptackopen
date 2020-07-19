import React from "react";

const Filter = ({ onChangeHanlder }) => {
  return (
    <div style={{ display: "flex" }}>
      <p>Filter shown with</p>
      <input className="inputfield" onChange={onChangeHanlder} />
    </div>
  );
};

export default Filter;
