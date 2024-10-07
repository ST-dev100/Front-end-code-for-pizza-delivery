"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { toast } from "react-hot-toast";

import {
  createRole,
  getAllRoles,
  deleteRole,
  updateTheRole,
  updateRoleActiveStatus,
} from "../services/api";
import { AddRoleModal } from "./AddUserModal/AddRoleModal";
import UpdateRoleModal from "./AddUserModal/UpdateRoleModal";
import { defineAbilitiesFor } from "../CASL/defineAbilities";
import { Can } from "@casl/react";
import { useSelector } from "react-redux";
import RoleAction from "./RoleAction/RoleAction";

const RoleTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const ability = useMemo(() => defineAbilitiesFor(user), [user]);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const roles = await getAllRoles();
      const formattedRoles = roles.map((role) => ({
        name: role.rolename,
        createdat: new Date(role.createdat).toLocaleString(),
        active: role.active,
        authorname: role.authorname,
        createdby: role.createdby,
        id: role.uuid,
        permissions: role.permissions,
      }));
      setData(formattedRoles);
      setFilteredData(formattedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (searchText === "") {
      setFilteredData(data);
    } else {
      const lowercasedFilter = searchText.toLowerCase();
      setFilteredData(
        data.filter((row) =>
          row.name.toLowerCase().includes(lowercasedFilter)
        )
      );
    }
  }, [searchText, data]);

  const handleAddRoleClick = () => {
    setCurrentRole({ name: "", createdAt: "", permissions: [] });
    setAddModalOpen(true);
  };

  const handleAddRole = async (newRole) => {
    try {
      await createRole(newRole);
      setData((prevData) => [...prevData, { createdat: "now", ...newRole }]);
      setAddModalOpen(false);
      toast.success("A new role added");
    } catch (error) {
      console.error("Error adding role:", error.message);
      toast.error("Failed to add a new role");
    }
  };

  const handleUpdateRole = async (updatedRole) => {
    try {
      await updateTheRole(updatedRole.id, updatedRole);
      setData((prevData) =>
        prevData.map((role) => (role.id === updatedRole.id ? updatedRole : role))
      );
      setUpdateModalOpen(false);
      setCurrentRole(null);
      toast.success("The role is updated");
    } catch (error) {
      console.error("Error updating role:", error.message);
      toast.error("Failed to update the role");
    }
  };

  const toggleStatus = async (rowIndex) => {
    const row = data[rowIndex];
    const updatedStatus = !row.active;
    try {
      await updateRoleActiveStatus(row.id, { active: updatedStatus });
      setData((prevData) =>
        prevData.map((item, index) =>
          index === rowIndex ? { ...item, active: updatedStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating role status:", error.message);
      toast.error("Failed to update role status");
    }
  };

  const handleDelete = async (rowIndex) => {
    const role = data[rowIndex];
    try {
      await deleteRole(role.id);
      setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
      toast.success("Role successfully deleted");
    } catch (error) {
      console.error("Error deleting role:", error.message);
      toast.error("Failed to delete role");
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Role Name" },
      { accessorKey: "createdat", header: "Created At" },
      {
        accessorKey: "permissions",
        header: "Permissions",
        Cell: ({ row }) => (
          <Typography>{row.original.permissions.join(", ")}</Typography>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <RoleAction
            row={row.original}
            onToggleStatus={() => toggleStatus(row.index)}
            onDelete={() => handleDelete(row.index)}
            onUpdate={() => {
              setCurrentRole(row.original);
              setUpdateModalOpen(true);
            }}
          />
        ),
      },
    ],
    [data]
  );

  const handleRefresh = () => {
    fetchRoles();
  };

  const handleExportData = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "roles_table.csv");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: 2, overflow: "auto" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '50vh' }}>
          <CircularProgress />
          <Typography sx={{ marginLeft: 2 }}>Loading Roles...</Typography>
        </Box>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={filteredData}
          enableSorting={false}
          enableGlobalFilter={false}
          renderTopToolbarCustomActions={() => (
            <Box sx={{ display: "flex", width: "100%" }}>
              <Can I="create" a="Role" ability={ability}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: "orange", width: "20%" }}
                  onClick={handleAddRoleClick}
                >
                  Add Role
                </Button>
              </Can>
              <Can not I="create" a="Role" ability={ability}>
                <Button variant="contained" color="primary" disabled>
                  You can't add role
                </Button>
              </Can>
              <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", alignItems: "flex-start", flexWrap: "wrap" }}>
                <Tooltip arrow title="Refresh Table">
                  <IconButton onClick={handleRefresh}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title="Search">
                  <IconButton onClick={() => setShowSearch((prev) => !prev)}>
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
          )}
        />
      )}
      {/* Add Role Modal */}
      <AddRoleModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        handleAddRole={handleAddRole}
      />
      {/* Update Role Modal */}
      <UpdateRoleModal
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        handleUpdateRole={handleUpdateRole}
      />
    </Box>
  );
};

export default RoleTable;
