import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateVote } from "../reducers/anecdoteReducer";
import { voteNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const searchTerm = useSelector((state) => state.term);
  let anecdotes = useSelector(({ anecdotes }) =>
    anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1))
  );
  const dispatch = useDispatch();
  anecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.search(searchTerm) >= 0;
  });

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(generateVote(anecdote));
    // dispatch(voteNotification(anecdote.content));
    dispatch(voteNotification(`you voted '${anecdote.content}'`, 10));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
