import React, { useState,useMemo } from "react";
import { Box, Tooltip, IconButton, TextField, Button, Divider } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { defineAbilitiesFor } from "../../CASL/defineAbilities"
import { Can } from "@casl/react";
import { useSelector } from "react-redux"; 

const ToolbarActions = ({ searchText, onSearch, onRefresh, onExport, onAddUser }) => {
  const [showSearch, setShowSearch] = useState(false);
  const user = useSelector((state) => state.auth.user); // Assuming you have user data in your Redux state
  const ability = useMemo(() => defineAbilitiesFor(user), [user]); 
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Can I="create" a="User" ability={ability}>
        <Button variant="contained" color="primary" sx={{ backgroundColor: "orange", width: "20%" }} onClick={onAddUser}>
          Add User
        </Button>
      </Can>
      <Can not I="create" a="User" ability={ability}>
        <Button
        variant="contained"
        color="secondary"
        sx={{ backgroundColor: "gray", width: "20%" }}
        disabled
         >
           You can't Add User
        </Button>
      </Can>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", alignItems: "flex-start", flexWrap: "wrap" }}>
        <Tooltip arrow title="Refresh Table">
          <IconButton onClick={onRefresh}>
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
            onChange={onSearch}
            placeholder="Search..."
            size="small"
          />
        )}
        <Tooltip arrow title="Download">
          <IconButton onClick={onExport}>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
      </Box>
    </Box>
  );
};

export default ToolbarActions;
