import React, { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { backendURL } from "../App";
import { Modal } from "../Layout/Modal";
import classes from "./MyTask.module.css";

export default function NotesItem(props) {
  const el = props.el;
  const [edit, setEdit] = useState(false);
  const [done, setDone] = useState(el.completed);
  const [notes, setNotes] = useState(el.text);
  const [title, setTitle] = useState(el.title);
  const [showNotes, setShowNote] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const noteEditRef = useRef();
  const token = useSelector((state) => state.token);
  // console.log(el);

  const updateTaskHandler = (event, text, completed = false) => {
    fetch(`${backendURL}/notes/update-notes/${event.target.id}`, {
      method: "PATCH",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        completed,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const editHandler = (event) => {
    event.preventDefault();
    if (edit && !done) {
      const text = noteEditRef.current.value;

      if (text.trim().length === 0) {
        return;
      } else {
        setNotes(text);
        updateTaskHandler(event, text);
      }
      noteEditRef.current.value = "";
    }
    setEdit(!edit);
  };

  const taskDoneHandler = (event) => {
    event.preventDefault();
    if (!done) {
      updateTaskHandler(event, el.text, true);
      setDone(true);
    } else {
      setShowNote(false);
      fetch(`${backendURL}/notes/delete/${event.target.id}`, {
        method: "DELETE",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setNotes(null);
        });
    }
  };

  const closeHandler = (event) => {
    event.preventDefault();
    setEdit(false);
  };
  const showNotesModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <Fragment>
      {showNotes && (
        <div
          className={`alert ${classes.item}`}
          style={{
            background: `${done ? "rgb(37, 231, 11)" : ""}`,
          }}
        >
          <h1 onClick={showNotesModalHandler} style={{ cursor: "pointer" }}>
            <u>
              <b> {title}</b>
            </u>
          </h1>
          {showModal && (
            <Modal
              title={title}
              text={notes}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
          {/* <h3 style={{ textDecoration: `${done ? "line-through" : ""}` }}>
            {notes}
          </h3> */}

          <p>{new Date(el.updatedAt).toLocaleString()}</p>
          {edit && !done && (
            <input
              className={classes.edit}
              type="text"
              required
              ref={noteEditRef}
            />
          )}
          <br />
          <div className={classes.buttonHolder}>
            {showModal && (
              <button
                className={classes.button}
                id={el._id}
                onClick={editHandler}
              >
                {edit && !done ? "Save" : "Edit-Note"}
              </button>
            )}
            {edit && !done && (
              <button
                className={classes.button}
                id={el._id}
                onClick={closeHandler}
              >
                Cancel
              </button>
            )}
            {showModal && (
              <button
                onClick={taskDoneHandler}
                id={el._id}
                className={classes.btnDelete}
              >
                {!done ? "Done" : "Delete"}
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
