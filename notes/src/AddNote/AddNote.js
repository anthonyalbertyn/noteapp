import React, { useState } from "react";
import SelectColor from "../SelectColor";
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
  const [selectedColorId, setSelectedColorId] = useState();

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
        colorId: selectedColorId,
      },
    };
    dispatch(addAction);
    setIsAddModeActive(false);
    setNoteText("");
    setSelectedColorId("orange");
  };

  const handleCancelClick = () => {
    setNoteText("");
    setIsAddModeActive(false);
    setNoteText("");
    setSelectedColorId("orange");
  };

  const handleSelectColor = (colorId) => {
    setSelectedColorId(colorId);
  };

  return (
    <div className="add-note">
      <div
        className="add-note-button-wrapper"
        style={{ marginBottom: "0.5rem" }}
      >
        <IconButton
          aria-label="add note"
          size="medium"
          color="primary"
          onClick={handleAddNoteClick}
          title="Add a new note"
          disabled={isAddModeActive}
        >
          <NoteAdd fontSize="large" />
        </IconButton>
      </div>

      {isAddModeActive && (
        <Card
          className="notes-list-no-notes"
          style={{ border: "2px solid gray", marginBottom: "2rem" }}
        >
          <CardContent>
            <TextField
              value={noteText}
              label="Note text"
              multiline
              fullWidth
              onChange={handleTextChange}
              style={{ marginBottom: "1rem" }}
            />
            <SelectColor
              selectedColorId={selectedColorId}
              selectColorCallback={handleSelectColor}
            />
          </CardContent>
          <Divider />
          <CardActions className="controls">
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
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
