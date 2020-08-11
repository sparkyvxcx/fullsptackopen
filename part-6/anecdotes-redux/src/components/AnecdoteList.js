import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { connect, useDispatch } from "react-redux";
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

const AnecdoteList = (props) => {
  // const searchTerm = useSelector((state) => state.term);

  // let anecdotes = useSelector(({ anecdotes }) =>
  //   anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1))
  // );

  // anecdotes = anecdotes.filter((anecdote) => {
  //   return anecdote.content.search(searchTerm) >= 0;
  // });

  const searchTerm = props.term;

  let anecdotesToShow = props.anecdotes
    .filter((anecdote) => {
      return anecdote.content.search(searchTerm) >= 0;
    })
    .sort((a, b) => (a.votes > b.votes ? -1 : 1));

  // anecdotesToShow = anecdotesToShow.filter((anecdote) => {
  //   return anecdote.content.search(searchTerm) >= 0;
  // });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(generateVote(anecdote));
    // dispatch(voteNotification(anecdote.content));
    dispatch(voteNotification(`you voted '${anecdote.content}'`, 10));
  };

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    anecdotes: state.anecdotes,
    term: state.term,
  };
};

const ConnectAnecdoteList = connect(mapStateToProps)(AnecdoteList);

export default ConnectAnecdoteList;
