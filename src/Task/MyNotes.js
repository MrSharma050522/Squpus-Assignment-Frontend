import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../App";
import classes from "./MyTask.module.css";
import NewTask from "./NewNotes";
import NotesItem from "./NotesItem";

export default function MyNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const token = useSelector((state) => state.token);

  const getAllTask = () => {
    if (!token) {
      navigate("/login");
    }
    fetch(`${backendURL}/notes/mynotes`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllTask();
  }, []);

  return (
    <Fragment>
      <NewTask setNotes={setNotes} />
      <div className={classes.div}>
        {notes && notes.map((el) => <NotesItem key={el._id} el={el} />)}
      </div>
    </Fragment>
  );
}
