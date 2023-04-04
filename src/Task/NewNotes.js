import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { backendURL } from "../App";
import classes from "../User/Form.module.css";

export default function NewNotes(props) {
  const titleRef = useRef();
  const taskRef = useRef();
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.token);

  const addNotesHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const title = titleRef.current.value;
    const text = taskRef.current.value;
    // console.log(title, text);
    fetch(`${backendURL}/notes/addnotes`, {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        // console.log(data);
        props.setNotes((notes) => [...notes, data.note]);
      })
      .catch((err) => alert(err.message));
    taskRef.current.value = "";
    titleRef.current.value = "";
  };

  return (
    <div className={classes.div}>
      {loading && <Spinner variant="info" />}
      <form onSubmit={addNotesHandler}>
        <h1>Create New Note</h1>
        <p>Enter Title</p>
        <input type="text" required ref={titleRef} />
        <p>Enter Task</p>
        <input type="text" required ref={taskRef} />
        <br />
        <button className={classes.button} type="submit">
          Add Note
        </button>
      </form>
    </div>
  );
}
