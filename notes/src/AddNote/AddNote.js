import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import NoteAdd from "@material-ui/icons/NoteAdd";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const AddNote = (props) => {
  const { dispatch } = props;
  const [isAddModeActive, setIsAddModeActive] = useState(false);
  const [noteText, setNoteText] = useState("");

  const handleAddNoteClick = () => {
    setIsAddModeActive(!isAddModeActive);
  };

  const handleTextChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSaveClick = () => {
    const addAction = {
      type: "addNote",
      note: {
        text: noteText,
      },
    };
    dispatch(addAction);
    setIsAddModeActive(false);
    setNoteText("");
  };

  const handleCancelClick = () => {
    setNoteText("");
    setIsAddModeActive(false);
  };

  return (
    <div className="add-note">
      <IconButton
        aria-label="add note"
        size="large"
        color="primary"
        onClick={handleAddNoteClick}
        title="Add a new note"
        disabled={isAddModeActive}
      >
        <NoteAdd fontSize="large" />
      </IconButton>
      {isAddModeActive && (
        <Card className="notes-list-no-notes">
          <CardContent>
            <TextField
              value={noteText}
              variant="outlined"
              label="Note text"
              multiline
              fullWidth
              onChange={handleTextChange}
            />
          </CardContent>
          <Divider />
          <CardActions className="controls">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default AddNote;
