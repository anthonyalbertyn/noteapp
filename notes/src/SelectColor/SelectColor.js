import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const SelectColor = (props) => {
  const { selectedColorId, selectColorCallback } = props;
  const handleChange = (event) => {
    selectColorCallback(event.target.value);
  };
  return (
    <>
      <Select
        labelId="select-color-label"
        label="Select a colour"
        id="select-color"
        value={selectedColorId || "orange"}
        fullWidth
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      >
        <MenuItem value="orange">Orange</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
        <MenuItem value="green">Green</MenuItem>
      </Select>
    </>
  );
};

export default SelectColor;
