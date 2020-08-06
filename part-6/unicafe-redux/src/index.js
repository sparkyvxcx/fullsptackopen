import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

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
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const neutral = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <Statistics
        good={store.getState().good}
        neutral={store.getState().ok}
        bad={store.getState().bad}
      />
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
