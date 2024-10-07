// TableHeader.js
import React from "react";
import { Box, IconButton, Tooltip, Typography, TextField, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const TableHeader = ({ searchText, setSearchText, showSearch, toggleSearch, handleRefresh, handleExportData }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Typography
        sx={{ fontWeight: 'bold', textAlign: 'center', padding: 2, fontSize: "1.2rem" ,display: { xs: "none", md: "block" },}}
      >
        Packages
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Tooltip arrow title="Refresh Table">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Search">
          <IconButton onClick={toggleSearch}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        {showSearch && (
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            size="small"
          />
        )}
        <Tooltip arrow title="Download">
          <IconButton onClick={handleExportData}>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
      </Box>
    </Box>
  );
};

export default TableHeader;
