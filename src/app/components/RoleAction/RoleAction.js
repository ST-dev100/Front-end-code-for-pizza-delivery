import React, { useMemo } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { defineAbilitiesFor } from "../../CASL/defineAbilities";
import { Can } from "@casl/react";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";

const RoleAction = ({row, onToggleStatus, onDelete,onUpdate}) => {
    const user = useSelector((state) => state.auth.user); // Assuming you have user data in your Redux state
    const ability = useMemo(() => defineAbilitiesFor(user), [user]);
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            
        <Can I='role' a="Status" ability={ability}>
            <IconButton onClick={onToggleStatus} sx={{ flexGrow: 1 }}>
                <Box sx={{
                    display: "flex",
                    borderRadius: "13%",
                    gap: 0,
                    background: row.active ? "#e6f3e6" : "#ffe6e6",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: 1,
                }}>
                    <Typography sx={{ whiteSpace: "nowrap", color: row.active ? "black" : "red" }}>
                    {row.active ? "Active" : "Inactive"}
                    </Typography>
                    {row.active ? (
                    <ToggleOnIcon color="success" />
                    ) : (
                    <ToggleOffIcon color="error" />
                    )}
                </Box>
            </IconButton>
        </Can>
        <Can not I="role" a="Status" ability={ability}>
        <IconButton disabled sx={{ flexGrow: 1 }}>
          <ToggleOffIcon color="action" />
        </IconButton>
       </Can>
       <Can I="update" a="Role" ability={ability}>
        <IconButton
            onClick={onUpdate}
            color="black"
            sx={{ marginLeft: 2 }}
            >
                <VisibilityIcon />
            </IconButton>
       </Can>
       <Can not I="update" a="Role" ability={ability}>
        <IconButton
                onClick={onUpdate}
                color="black"
                sx={{ marginLeft: 2 }}
                disabled  // Disable the button if user can't update Role
                >
                <VisibilityIcon />
        </IconButton>
       </Can>
       <Can I="delete" a="Role" ability={ability}>
          <IconButton onClick={onDelete} color="black" sx={{ marginLeft: 2 }}>
                <DeleteIcon />
          </IconButton>
       </Can>
       <Can not I="delete" a="Role" ability={ability}>
        <IconButton disabled color="action" sx={{ marginLeft: 2 }}>
          <DeleteIcon />
        </IconButton>
      </Can>
  </Box>
  )
}

export default RoleAction