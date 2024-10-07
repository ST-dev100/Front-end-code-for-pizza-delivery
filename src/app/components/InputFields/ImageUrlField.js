import { TextField,Button } from "@mui/material";

const ImageUrlField = () => {
  return (
            <>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    width: "100%",
                    mt: 2,
                    borderColor: "#FB8C00",
                    color: "#FB8C00",
                    ":hover": { backgroundColor: "#FB8C0033" },
                  }}
                >
                  📤 Upload Logo
                  <input hidden accept="image/*" type="file" onChange={handleImageChange}/>
                </Button>
                {fieldState.error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
  )
}

export default ImageUrlField