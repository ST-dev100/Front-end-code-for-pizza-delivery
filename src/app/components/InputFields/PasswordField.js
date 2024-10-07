// app/signup/components/PasswordField.js
import { TextField } from "@mui/material";

const PasswordField = ({ field, fieldState }) => (
  <TextField
    {...field}
    type="password"
    label="Password"
    fullWidth
    margin="normal"
    placeholder="******"
    InputLabelProps={{ shrink: true }}
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
  />
);

export default PasswordField;
