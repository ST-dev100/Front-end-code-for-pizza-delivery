// RoleModal.js
import React from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from '@mui/system';

// Reusable styled Checkbox component
const OrangeCheckbox = (props) => (
  <Checkbox
    {...props}
    sx={{
      color: 'orange',
      '&.Mui-checked': {
        color: 'orange',
      },
    }}
  />
);

const FormContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
});

const RoleModal = ({ open, onClose, onSubmit, currentRole }) => {
  const handleChange = (field, value) => {
    onSubmit({ ...currentRole, [field]: value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 600,
          margin: "auto",
          marginTop: "20vh",
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" align="center">{currentRole ? "Update Role" : "Add Role"}</Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
          value={currentRole ? currentRole.name : ""}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <Typography variant="subtitle1">Permissions</Typography>
        <FormGroup>
          <FormContainer>
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={currentRole?.permissions?.updateOrderStatus || false}
                  onChange={(e) => handleChange('permissions', { ...currentRole.permissions, updateOrderStatus: e.target.checked })}
                />
              }
              label="Update Order Status"
            />
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={currentRole?.permissions?.seeCustomers || false}
                  onChange={(e) => handleChange('permissions', { ...currentRole.permissions, seeCustomers: e.target.checked })}
                />
              }
              label="See Customers"
            />
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={currentRole?.permissions?.seeOrders || false}
                  onChange={(e) => handleChange('permissions', { ...currentRole.permissions, seeOrders: e.target.checked })}
                />
              }
              label="See Orders"
            />
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={currentRole?.permissions?.createRoles || false}
                  onChange={(e) => handleChange('permissions', { ...currentRole.permissions, createRoles: e.target.checked })}
                />
              }
              label="Create Roles"
            />
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={currentRole?.permissions?.addUsers || false}
                  onChange={(e) => handleChange('permissions', { ...currentRole.permissions, addUsers: e.target.checked })}
                />
              }
              label="Add Users"
            />
          </FormContainer>
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "orange",
            padding: "12px 24px",
            fontSize: "1rem",
            width: "100%",
          }}
          onClick={() => {
            onSubmit(currentRole);
            onClose();
          }}
        >
          {currentRole ? "Update" : "Add"}
        </Button>
      </Box>
    </Modal>
  );
};

export default RoleModal;
