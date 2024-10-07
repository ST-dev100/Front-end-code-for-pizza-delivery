// OrangeCheckbox.js
import React from 'react';
import { Checkbox } from "@mui/material";

export const OrangeCheckbox = (props) => (
  <Checkbox
    {...props}
    sx={{
      color: 'orange',
      '&.Mui-checked': {
        color: 'orange',
      },
    }}
  />
);