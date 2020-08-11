import React from "react";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    // dispatch(createAnecdote(content));
    // dispatch(createNotification(content));

    props.createAnecdote(content)
    props.createNotification(content)

    setTimeout(() => {
      // dispatch(clearNotification());
      props.clearNotification()
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const ConnectAnecdoteForm = connect(null, { createAnecdote, createNotification, clearNotification })(AnecdoteForm)

export default ConnectAnecdoteForm;
