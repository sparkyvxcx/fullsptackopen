import React, { useState } from "react";
import ReactDOM from "react-dom";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>This app is used by pressing the buttons</p>
      </div>
    );
  }
  return (
    <div>
      <p>{props.allClicks.join(" ")}</p>
    </div>
  );
};

const Display = (props) => <div>{props.value}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  const [left, setLeftClicks] = useState(0);
  const [right, setRightClicks] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [value, setValue] = useState(10);

  const handleLeftClick = () => {
    setLeftClicks(left + 1);
    setAll(allClicks.concat("L"));
  };

  const handleRightClick = () => {
    setRightClicks(right + 1);
    setAll(allClicks.concat("R"));
  };

  const handZeroClick = () => {
    setLeftClicks(0);
    setRightClicks(0);
    setAll([]);
  };

  const hello = (who) => () => console.log("hello", who);
  const setToValue = (newValue) => () => setValue(newValue);

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text={"left"} />
        <Button onClick={handleRightClick} text={"right"} />
        {right}
      </div>
      <History allClicks={allClicks} />
      <Button onClick={handZeroClick} text="ZERO" />
      <div>
        <Display value={value} />
        <Button onClick={setToValue(1000)} text="Thousand" />
        <Button onClick={setToValue(0)} text="Reset" />
        <Button onClick={setToValue(value + 1)} text="Increament" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
