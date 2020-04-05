import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

const Note = (props) => {
  const { dispatch, id, colorId = "", text = "" } = props;

  const [viewMode, setViewMode] = useState("view");

  const [newText, setNewText] = useState();

  const noteClass = `note ${colorId}`;

  const handleTextChange = (event) => {
    setNewText(event.target.value);
  };

  const handleEditSaveClick = () => {
    const updateAction = {
      type: "updateNote",
      note: {
        id: id,
        text: newText,
      },
    };
    dispatch(updateAction);
  };

  const handleEditCancelClick = () => {
    setNewText(text);
    setViewMode("view");
  };

  const handleEditClick = () => {
    setViewMode("edit");
  };

  const handleDeleteClick = () => {
    setViewMode("confirmDelete");
  };

  const handleCancelDeleteClick = () => {
    setViewMode("view");
  };

  const handleConfirmDeleteClick = () => {
    const deleteAction = {
      type: "deleteNote",
      note: {
        id: id,
      },
    };
    dispatch(deleteAction);
  };

  useEffect(() => {
    setNewText(text);
  }, [text]);

  return (
    <Card className={noteClass}>
      <CardContent>
        {(viewMode === "view" || viewMode === "confirmDelete") && (
          <Typography variant="paragraph" color="textSecondary" component="p">
            {text}
          </Typography>
        )}
        {viewMode === "edit" && (
          <TextField
            value={newText}
            variant="outlined"
            label="Note text"
            multiline
            fullWidth
            onChange={handleTextChange}
          />
        )}
      </CardContent>
      <Divider />
      <CardActions className="controls">
        {viewMode === "view" && (
          <>
            <IconButton
              aria-label="edit"
              size="small"
              color="primary"
              onClick={handleEditClick}
              title="Edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              color="secondary"
              onClick={handleDeleteClick}
              title="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
        {viewMode === "edit" && (
          <>
            <IconButton
              aria-label="save"
              size="small"
              color="primary"
              title="Save"
              onClick={handleEditSaveClick}
            >
              <Save />
            </IconButton>
            <IconButton
              aria-label="cancel"
              size="small"
              color="secondary"
              onClick={handleEditCancelClick}
              title="Cancel"
            >
              <Cancel />
            </IconButton>
          </>
        )}
        {viewMode === "confirmDelete" && (
          <>
            <span className="note-delete-confirm-text">Delete this note?</span>
            <Button
              size="small"
              onClick={handleConfirmDeleteClick}
              color="secondary"
            >
              Yes
            </Button>
            <Button
              size="small"
              onClick={handleCancelDeleteClick}
              color="primary"
            >
              No
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Note;
