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

export const AddRoleModal = ({ addModalOpen, setAddModalOpen,currentRole, setCurrentRole,handleAddRole}) => {
    return (
        <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
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
                <Typography variant="h6" align="center">Add Role</Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={currentRole?.name} // Controlled component
                    onChange={(e) => setCurrentRole(prev => ({
                        ...prev,
                        name: e.target.value
                    }))}
                />
                <Typography variant="subtitle1">Permissions</Typography>
                <FormGroup>
                  <FormContainer>  
                    {[
                        "update order status",
                        "create orders",
                        "see role",
                        "see orders",
                        "createRoles",
                        "Add users",
                        "deleteUser",
                        "addMenu",
                        "changeUserStatus",
                        "see users",
                        'role status',
                        'update role',
                        'delete role'
                    ].map((permission, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <OrangeCheckbox
                                    checked={currentRole?.permissions.includes(permission)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            // Add the permission if checked
                                            setCurrentRole(prev => ({
                                                ...prev,
                                                permissions: [...prev.permissions, permission]
                                            }));
                                        } else {
                                            // Remove the permission if unchecked
                                            setCurrentRole(prev => ({
                                                ...prev,
                                                permissions: prev.permissions.filter(p => p !== permission)
                                            }));
                                        }
                                    }}
                                />
                            }
                            label={permission}
                        />
                    ))}
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
                    onClick={() => handleAddRole(currentRole)}
                >
                    Add
                </Button>
            </Box>
        </Modal>
    );
};
