import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClickHandle, text }) => (
  <button onClick={onClickHandle}>{text}</button>
);

const App = (props) => {
  const len = props.anecdotes.length;
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * props.anecdotes.length)
  );
  const [points, setPoints] = useState(new Array(len).fill(0));

  const setSelectedHandle = () => {
    let index = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(index);
  };

  const setVoteHandle = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const maxVote = Math.max(...points);
  const maxVoteIndex = points.indexOf(maxVote);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} vote</p>
      <Button onClickHandle={setVoteHandle} text="Vote" />
      <Button onClickHandle={setSelectedHandle} text="next anecdotes" />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxVoteIndex]}</p>
      <p>has {maxVote} vote</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
