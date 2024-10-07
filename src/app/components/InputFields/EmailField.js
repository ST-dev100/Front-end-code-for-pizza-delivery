// app/signup/components/EmailField.js
import { TextField } from "@mui/material";

const EmailField = ({ field, fieldState }) => (
  <TextField
    {...field}
    label="Email address"
    placeholder="simontamene.dev@gmail.com"
    fullWidth
    margin="normal"
    variant="outlined"
    InputLabelProps={{ shrink: true }}
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
  />
);

export default EmailField;
