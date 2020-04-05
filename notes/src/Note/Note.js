import React, { useEffect, useState } from "react";
import "./Note.css";
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
import SelectColor from "../SelectColor";

const Note = (props) => {
  const { dispatch, id, colorId = "orange", text = "" } = props;

  const [viewMode, setViewMode] = useState("view");

  const [newText, setNewText] = useState();

  const [selectedColorId, setSelectedColorId] = useState();

  const handleTextChange = (event) => {
    setNewText(event.target.value);
  };

  const handleEditSaveClick = () => {
    const updateAction = {
      type: "updateNote",
      note: {
        id: id,
        text: newText,
        colorId: selectedColorId,
      },
    };
    dispatch(updateAction);
    setViewMode("view");
  };

  const handleEditCancelClick = () => {
    setNewText(text);
    setSelectedColorId(colorId);
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
    setViewMode("view");
  };

  useEffect(() => {
    setNewText(text);
    setSelectedColorId(colorId);
  }, [text, colorId]);

  const handleSelectColor = (colorId) => {
    setSelectedColorId(colorId);
  };

  return (
    <Card className={"note note-" + colorId} borderColor={colorId} border={5}>
      <CardContent>
        {(viewMode === "view" || viewMode === "confirmDelete") && (
          <Typography variant="paragraph" color="textSecondary" component="p">
            {text}
          </Typography>
        )}
        {viewMode === "edit" && (
          <>
            <TextField
              value={newText}
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
          </>
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
