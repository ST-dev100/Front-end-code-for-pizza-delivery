import { AppBar, Toolbar, Typography, Box, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PizzaIcon from '@mui/icons-material/LocalPizza';

const Feedback = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#D1B48C', // match the background color from the image
        boxShadow: 'none',
        padding: { xs: 1, sm: 2 }, // Add padding for smaller screens
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack items vertically on small screens
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: 2, md: 0 }, // Add gap on small screens
        }}
      >

        {/* Navigation Links */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, md: 3 }, // Adjust gap based on screen size
            fontSize: { xs: '1rem', md: '1.2rem' }, // Smaller font on mobile
            color: 'black',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on extra-small screens
            alignItems: 'center', // Center align links on small screens
          }}
        >
          <Typography component="a" href="#" sx={{ textDecoration: 'none', color: 'black' }}>
            Home
          </Typography>
          <Typography component="a" href="#" sx={{ textDecoration: 'none', color: 'black' }}>
            Order
          </Typography>
          <Typography component="a" href="#" sx={{ textDecoration: 'none', color: 'black' }}>
            About Us
          </Typography>
        </Box>

        {/* Logo and Feedback Input */}
        <Box 
          sx={{
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: 2, md: 4 },
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <PizzaIcon sx={{ marginRight: 1, color: '#8B4513', fontSize: { xs: 24, md: 32 } }} />
            <Typography variant="h6" sx={{ color: '#8B4513', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              Pizza
            </Typography>
          </Box>

          {/* Feedback Input */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '25px',
              padding: '0 10px',
              width: { xs: '250px', sm: '300px' }, // Responsive width for the input box
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <InputBase
              placeholder="Your feedback..."
              sx={{
                flex: 1,
                padding: '5px',
                fontSize: '0.9rem',
                color: '#a9a9a9',
              }}
              inputProps={{ 'aria-label': 'Your feedback' }}
            />
            <IconButton type="submit">
              <SendIcon sx={{ color: '#FF8C00' }} />
            </IconButton>
          </Box>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default Feedback;
