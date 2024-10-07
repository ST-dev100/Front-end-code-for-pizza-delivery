// app/signup/components/LocationField.js
import { TextField } from "@mui/material";

const LocationField = ({ field, fieldState }) => (
  <TextField
    {...field}
    label="Location"
    fullWidth
    placeholder="Addis Ababa"
    margin="normal"
    InputLabelProps={{ shrink: true }}
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
  />
);

export default LocationField;
