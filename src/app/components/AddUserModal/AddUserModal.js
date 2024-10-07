import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { getAllRoles } from '../../services/api'; // Adjust the import path
import { CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";

const AddUserModal = ({ open, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    name: "",
    phone_number: "",
    email: "",
    rolename: "",
    password: "",
    role_id: "",  
  });

  const [roles, setRoles] = useState([]); // State to store roles fetched from backend
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [loadingg, setLoadingg] = useState(false); // sending
  
  // Fetch roles from backend when modal opens
  useEffect(() => {
    if (open) {
      const fetchRoles = async () => {
        setLoading(true);
        setError(null); // Reset error before fetching
        try {
          const rolesData = await getAllRoles(); // Use the getAllRoles function
          setRoles(rolesData);
          console.log("roles",rolesData)
        } catch (err) {
          setError(err.message); // Handle and display error
        } finally {
          setLoading(false);
        }
      };

      fetchRoles();
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Handle role selection to store both rolename and roleUuid
  const handleRoleChange = (e) => {
    const selectedRoleName = e.target.value;
    const selectedRole = roles.find(role => role.rolename === selectedRoleName); // Find selected role by name
    if (selectedRole) {
      setUserData((prevData) => ({
        ...prevData,
        rolename: selectedRole.rolename,
        role_id: selectedRole.uuid // Store the corresponding UUID
      }));
    }
  };
  const handleSave = () => {
    onSave(userData); // Pass the form data to the onSave handler
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: { xs: "90vw", sm: "80vw", md: "60vw", lg: "50vw" },
          width: "100%",
          maxHeight: "90vh",
          margin: "auto",
          marginTop: { xs: "5vh", md: "10vh" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
          <Typography variant="h6" align="center">
            Add User 
          </Typography>  
        {error && <Typography color="error">{error}</Typography>}
        {loading ? (
          <Typography>Loading roles...</Typography>
        ) : (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              type="tel"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />

            {/* Role selection based on data from backend */}
            <TextField
              select
              label="Select Role"
              variant="outlined"
              required
              name="rolename"
              value={userData.rolename}
              onChange={handleRoleChange}  
              SelectProps={{ native: true }}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.uuid} value={role.rolename}>
                  {role.rolename}
                </option>
              ))}
            </TextField>

            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "orange",
                padding: "12px 24px",
                fontSize: "1rem",
              }}
              onClick={handleSave}
            >
              Add
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AddUserModal;
