// app/signup/components/PhoneNumberField.js
import { TextField } from "@mui/material";

const PhoneNumberField = ({ field, fieldState }) => (
  <TextField
    {...field}
    label="Phone Number"
    fullWidth
    margin="normal"
    placeholder="0946854382"
    InputLabelProps={{ shrink: true }}
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
  />
);

export default PhoneNumberField;
