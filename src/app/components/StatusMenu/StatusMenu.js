// StatusMenu.js
import React from "react";
import { Menu, RadioGroup, MenuItem, FormControlLabel, Radio, Button } from "@mui/material";

const StatusMenu = ({ anchorEl, setAnchorEl, row, handleStatusChange, selectedStatus }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <RadioGroup
        value={selectedStatus || row.original.status}
        onChange={(e) => handleStatusChange(row.index, e.target.value)}
      >
        <MenuItem>
          <FormControlLabel
            value="Preparing"
            control={<Radio />}
            label="Preparing"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value="Ready"
            control={<Radio />}
            label="Ready"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            value="Delivered"
            control={<Radio />}
            label="Delivered"
          />
        </MenuItem>
      </RadioGroup>
    </Menu>
  );
};

export default StatusMenu;
