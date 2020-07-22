import React from "react";

const Input = ({ prefix, value, onChangeHandle, setter }) => {
  return (
    <div className="inputform">
      <p className="inputprefix">{prefix}</p>
      <input
        className="inputfield"
        value={value}
        onChange={onChangeHandle(setter)}
      />
    </div>
  );
};

const PersonForm = ({
  name,
  number,
  setName,
  setNumber,
  onSubmitHandle,
  onChangeHandle,
}) => {
  return (
    <form onSubmit={onSubmitHandle}>
      <Input
        prefix="Name: "
        value={name}
        onChangeHandle={onChangeHandle}
        setter={setName}
      />
      <Input
        prefix="Number: "
        value={number}
        onChangeHandle={onChangeHandle}
        setter={setNumber}
      />
      <div>
        <button id="submit-button" type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
