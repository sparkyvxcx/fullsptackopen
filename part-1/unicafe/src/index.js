import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClickHandle, text }) => (
  <button onClick={onClickHandle}>{text}</button>
);

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad;
  let average = (1 * good + 0 * neutral + -1 * bad) / sum;
  let positive = good / sum;

  if (sum === 0) {
    return (
      <div>
        <h1>statistic</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistic</h1>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={sum} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive.toString() + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setClickHandle = (value, setFeedBack) => () => setFeedBack(value + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClickHandle={setClickHandle(good, setGood)} text="Good" />
      <Button
        onClickHandle={setClickHandle(neutral, setNeutral)}
        text="neutral"
      />
      <Button onClickHandle={setClickHandle(bad, setBad)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
