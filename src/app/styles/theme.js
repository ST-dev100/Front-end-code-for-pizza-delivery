// styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,    // Extra small devices (phones, less than 600px)
      sm: 600,  // Small devices (tablets, 600px and up)
      md: 800,  // Medium devices (small laptops, 900px and up)
      lg: 1200, // Large devices (desktops, 1200px and up)
      xl: 1500, // Extra large devices (large desktops, 1536px and up)
      tablet: 768, // Example custom breakpoint for tablets
    },
  },
  palette: {
    primary: {
      main: '#23e567',
    },
    secondary: {
      main: '#e5233b',
    },
  },
  typography: {
    fontFamily: '',
  },
});

export default theme;
