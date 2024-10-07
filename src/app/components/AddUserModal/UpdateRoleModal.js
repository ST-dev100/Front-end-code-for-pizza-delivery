import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Tooltip,
    Typography,
    TextField,
    Divider,
    Button,
    Modal,
    FormGroup,
    FormControlLabel,
    Checkbox,
    CircularProgress
} from "@mui/material";
import { styled } from '@mui/system';

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
      gap: '16px', // Add space between the items
    });

const UpdateRoleModal = ({updateModalOpen,setUpdateModalOpen,currentRole,setCurrentRole,handleUpdateRole}) => {
  return (
    <Modal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: "white",
            borderRadius: 2,
            maxWidth: { xs: "90vw", sm: "80vw", md: "60vw", lg: "50vw" }, // Responsive width
            width: "100%",
            maxHeight: "90vh", // Limit the height to avoid going out of viewport
            margin: "auto",
            marginTop: { xs: "5vh", md: "10vh" }, // Adjust margin for small and larger screens
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxShadow: 3, // Add some shadow for a better visual effect
            overflowY: "auto", // Enable vertical scrolling
            overflowX: "hidden", // Prevent horizontal scrolling
          }}
        >
          <Typography variant="h6" align="center">Update Role</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={currentRole ? currentRole.name : ""}
            onChange={(e) => setCurrentRole(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />
          <Typography variant="subtitle1">Permissions</Typography>
          <FormGroup>
             <FormContainer>
                <FormControlLabel
                  control={
                    <OrangeCheckbox
                      checked={currentRole?.permissions?.includes('update order status') || false}
                      onChange={(e) => setCurrentRole(prev => ({
                        ...prev,
                        permissions: e.target.checked
                          ? [...prev.permissions, 'update order status'] // Add permission
                          : prev.permissions.filter(p => p !== 'update order status') // Remove permission
                      }))}
                    />
                  }
                  label="Update Order Status"
                />
                <FormControlLabel
                  control={
                    <OrangeCheckbox
                      checked={currentRole?.permissions?.includes('see role') || false}
                      onChange={(e) => setCurrentRole(prev => ({
                        ...prev,
                        permissions: e.target.checked
                          ? [...prev.permissions, 'see role']
                          : prev.permissions.filter(p => p !== 'see role')
                      }))}
                    />
                  }
                  label="See Roles"
                />
                <FormControlLabel
                  control={
                    <OrangeCheckbox
                      checked={currentRole?.permissions?.includes('see orders') || false}
                      onChange={(e) => setCurrentRole(prev => ({
                        ...prev,
                        permissions: e.target.checked
                          ? [...prev.permissions, 'see orders']
                          : prev.permissions.filter(p => p !== 'see orders')
                      }))}
                    />
                  }
                  label="See Orders"
                />
                <FormControlLabel
                  control={
                    <OrangeCheckbox
                      checked={currentRole?.permissions?.includes('createRoles') || false}
                      onChange={(e) => setCurrentRole(prev => ({
                        ...prev,
                        permissions: e.target.checked
                          ? [...prev.permissions, 'createRoles']
                          : prev.permissions.filter(p => p !== 'createRoles')
                      }))}
                    />
                  }
                  label="Create Roles"
                />
                <FormControlLabel
                  control={
                    <OrangeCheckbox
                      checked={currentRole?.permissions?.includes('Add users') || false}
                      onChange={(e) => setCurrentRole(prev => ({
                        ...prev,
                        permissions: e.target.checked
                          ? [...prev.permissions, 'Add users']
                          : prev.permissions.filter(p => p !== 'Add users')
                      }))}
                    />
                  }
                  label="Add Users"
                />
                <FormControlLabel
                  control={
                    <OrangeCheckbox
                      checked={currentRole?.permissions?.includes('see users') || false}
                      onChange={(e) => setCurrentRole(prev => ({
                        ...prev,
                        permissions: e.target.checked
                          ? [...prev.permissions, 'see users']
                          : prev.permissions.filter(p => p !== 'see users')
                      }))}
                    />
                  }
                  label="View Users"
                />
                {/* Additional Permissions */}
                <FormControlLabel
                      control={
                        <OrangeCheckbox
                          checked={currentRole?.permissions?.includes('deleteUser') || false}
                          onChange={(e) => setCurrentRole(prev => ({
                            ...prev,
                            permissions: e.target.checked
                              ? [...prev.permissions, 'deleteUser']
                              : prev.permissions.filter(p => p !== 'deleteUser')
                          }))}
                        />
                      }
                      label="Delete User"
                    />
                    <FormControlLabel
                      control={
                        <OrangeCheckbox
                          checked={currentRole?.permissions?.includes('addMenu') || false}
                          onChange={(e) => setCurrentRole(prev => ({
                            ...prev,
                            permissions: e.target.checked
                              ? [...prev.permissions, 'addMenu']
                              : prev.permissions.filter(p => p !== 'addMenu')
                          }))}
                        />
                      }
                      label="Add Menu"
                    />
                    <FormControlLabel
                      control={
                        <OrangeCheckbox
                          checked={currentRole?.permissions?.includes('changeUserStatus') || false}
                          onChange={(e) => setCurrentRole(prev => ({
                            ...prev,
                            permissions: e.target.checked
                              ? [...prev.permissions, 'changeUserStatus']
                              : prev.permissions.filter(p => p !== 'changeUserStatus')
                          }))}
                        />
                      }
                      label="Change User Status"
                    />
                    <FormControlLabel
                      control={
                        <OrangeCheckbox
                          checked={currentRole?.permissions?.includes('role status') || false}
                          onChange={(e) => setCurrentRole(prev => ({
                            ...prev,
                            permissions: e.target.checked
                              ? [...prev.permissions, 'role status']
                              : prev.permissions.filter(p => p !== 'role status')
                          }))}
                        />
                      }
                      label="Change role status"
                    />
                    <FormControlLabel
                      control={
                        <OrangeCheckbox
                          checked={currentRole?.permissions?.includes('delete role') || false}
                          onChange={(e) => setCurrentRole(prev => ({
                            ...prev,
                            permissions: e.target.checked
                              ? [...prev.permissions, 'delete role']
                              : prev.permissions.filter(p => p !== 'delete role')
                          }))}
                        />
                      }
                      label="Delete Role"
                    />
                    <FormControlLabel
                      control={
                        <OrangeCheckbox
                          checked={currentRole?.permissions?.includes('update role') || false}
                          onChange={(e) => setCurrentRole(prev => ({
                            ...prev,
                            permissions: e.target.checked
                              ? [...prev.permissions, 'update role']
                              : prev.permissions.filter(p => p !== 'update role')
                          }))}
                        />
                      }
                      label="Update role"
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
              handleUpdateRole(currentRole); // Call update handler
            }}
          >
            Update
          </Button>
        </Box>
      </Modal>
  )
}

export default UpdateRoleModal