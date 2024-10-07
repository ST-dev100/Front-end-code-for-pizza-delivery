import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stacks vertically on small screens, horizontally on larger screens
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000', // Black background
        color: '#fff',           // White text
        padding: '20px 40px',    // Padding for spacing
        textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
      }}
    >
      {/* Left side text */}
      <Box sx={{ marginBottom: { xs: '15px', sm: '0' } }}> {/* Adds margin on smaller screens only */}
        <Typography variant="body2" sx={{ display: 'inline', marginRight: '20px' }}>
          ©2024 Pizza All Rights Reserved.
        </Typography>
        <Typography variant="body2" sx={{ display: 'inline' }}>
          Terms & Conditions
        </Typography>
      </Box>

      {/* Social Media Icons */}
      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
        <IconButton sx={{ color: '#fff' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: '#fff' }}>
          <LinkedInIcon />
        </IconButton>
        <IconButton sx={{ color: '#fff' }}>
          <TwitterIcon />
        </IconButton>
        <IconButton sx={{ color: '#fff' }}>
          <YouTubeIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
