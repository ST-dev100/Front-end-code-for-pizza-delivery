// app/signup/components/ConfirmPasswordField.js
import { TextField } from "@mui/material";

const ConfirmPasswordField = ({ field, fieldState }) => (
  <TextField
    {...field}
    type="password"
    label="Confirm Password"
    fullWidth
    placeholder="******"
    InputLabelProps={{ shrink: true }}
    margin="normal"
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
  />
);

export default ConfirmPasswordField;
