import React, { useReducer } from "react";
import AddNote from "../AddNote";
import NoteList from "../NoteList";

const initialState = {
  notes: [],
  lastNoteId: 0,
};

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case "addNote":
      action.note.id = state.lastNoteId + 1;
      return {
        ...state,
        notes: [...state.notes, action.note],
        lastNoteId: state.lastNoteId + 1,
      };
    case "updateNote":
      const withoutNote = state.notes.filter(
        (item) => item.id !== action.note.id
      );
      return {
        ...state,
        notes: [...withoutNote, action.note],
      };
    case "deleteNote":
      return {
        ...state,
        notes: state.notes.filter((item) => item.id !== action.note.id),
      };
    default:
      return state;
  }
};

const NotePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="note-page">
      <AddNote dispatch={dispatch} />
      <NoteList notes={state.notes} dispatch={dispatch} />
    </div>
  );
};

export default NotePage;
