// app/signup/components/TermsCheckbox.js
import { Checkbox, FormControlLabel } from "@mui/material";

const TermsCheckbox = ({ field, fieldState }) => (
  <FormControlLabel
    control={
      <Checkbox
        {...field}
        checked={field.value}
        color="primary"
      />
    }
    label="I accept the terms and conditions"
    error={!!fieldState.error}
  />
);

export default TermsCheckbox;
