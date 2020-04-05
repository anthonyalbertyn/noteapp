import React from "react";
import Note from "../Note";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const NoteList = ({ notes = [], dispatch }) => {
  const noNotesMessage = "There are currently no notes to display";
  return (
    <>
      {notes.length > 0 &&
        notes.map((item) => (
          <Note
            id={item.id}
            colorId={item.colorId}
            text={item.text}
            dispatch={dispatch}
          />
        ))}

      {notes.length === 0 && (
        <Card className="notes-list-no-notes">
          <CardContent>
            <Typography variant="paragraph" color="textSecondary" component="p">
              {noNotesMessage}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default NoteList;
