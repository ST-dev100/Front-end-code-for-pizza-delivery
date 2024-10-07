import { TextField } from "@mui/material";

const RestaurantNameField = ({ field, fieldState }) => {
  return (
            <TextField
            {...field}
            label="Restaurant Name"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            placeholder="Azmera"
            helperText={fieldState.error?.message}
            InputLabelProps={{ shrink: true }} // Keeps the label on the border
        />
  )
}

export default RestaurantNameField