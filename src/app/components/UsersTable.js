import React, { useMemo, useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import UserActions from "./UserActions/UserActions";
import ToolbarActions from "./ToolbarActions/ToolbarActions";
import AddUserModal from "./AddUserModal/AddUserModal";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from "../services/api";
import { defineAbilitiesFor } from "../CASL/defineAbilities";
import { Can } from "@casl/react";
import { useSelector } from "react-redux"; 
import { toast } from "react-hot-toast";

const UsersTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const user = useSelector((state) => state.auth.user);
  const ability = useMemo(() => defineAbilitiesFor(user), [user]); 
   console.log("users table",ability)
  // Use a ref to store fetched data
  const dataRef = useRef([]);

  // Fetch all employees when the component mounts only if data has not been fetched
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employees = await getAllEmployees();
        dataRef.current = employees; // Store fetched data in ref
        setFilteredData(employees);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (dataRef.current.length === 0) {
      fetchData(); // Fetch data only if it's not already fetched
    } else {
      setFilteredData(dataRef.current); // Use already fetched data
      setLoading(false); // Set loading to false since we are not fetching
    }
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredData(dataRef.current);
    } else {
      const lowercasedFilter = searchText.toLowerCase();
      const filteredRows = dataRef.current.filter((row) =>
        row.name.toLowerCase().includes(lowercasedFilter) ||
        row.phone_number.toLowerCase().includes(lowercasedFilter) ||
        row.email.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredData(filteredRows);
    }
  }, [searchText]);

  const toggleStatus = async (rowIndex) => {
    const row = dataRef.current[rowIndex];
    const updatedStatus = !row.active;

    try {
      await updateEmployee(row.uuid, { ...row, active: updatedStatus });
      const updatedData = dataRef.current.map((item, index) =>
        index === rowIndex ? { ...item, active: updatedStatus } : item
      );
      dataRef.current = updatedData; // Update the data in the ref
      setFilteredData(updatedData); // Update filtered data to reflect changes
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };

  const handleDelete = async (rowIndex) => {
    const employee = dataRef.current[rowIndex];

    try {
      await deleteEmployee(employee.uuid);
      const updatedData = dataRef.current.filter((_, index) => index !== rowIndex);
      dataRef.current = updatedData; // Update the data in the ref
      setFilteredData(updatedData);
      toast.success("A User Deleted");
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      toast.error("Failed")
    }
  };

  const handleExportData = () => {
    const csv = Papa.unparse(dataRef.current);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users_table.csv");
  };

  const handleAddUser = async (newUser) => {
    try {
      const createdEmployee = await createEmployee(newUser);
      dataRef.current = [...dataRef.current, createdEmployee.employee]; // Update data in ref
      setFilteredData((prevData) => {
        const updatedData = [...prevData, createdEmployee.employee];
        return updatedData;
      });
      toast.success("A User Created");
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding new employee:", error.message);
      toast.error("Failed to add new user");
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone_number", header: "Phone No" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <UserActions
            row={row.original}
            onToggleStatus={() => toggleStatus(row.index)}
            onDelete={() => handleDelete(row.index)}
          />
        ),
      },
    ],
    [filteredData]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: 2, overflow: "auto" }}>
      <Can I="view" a="User" ability={ability}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
            <Typography sx={{ marginLeft: 2 }}>Loading users...</Typography>
          </Box>
        ) : (
          <MaterialReactTable
            columns={columns}
            data={filteredData}
            enableSorting={false}
            enableGlobalFilter={false}
            renderTopToolbarCustomActions={() => (
              <ToolbarActions
                searchText={searchText}
                onSearch={(e) => setSearchText(e.target.value)}
                onRefresh={() => setFilteredData(dataRef.current)} // Refreshing with current data
                onExport={handleExportData}
                onAddUser={() => setModalOpen(true)}
              />
            )}
          />
        )}
      </Can>
      <Can not I="view" a="User" ability={ability}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Typography variant="h4" align="center" sx={{ margin: 2 }}>
            You do not have permission to view users.
          </Typography>
        </Box>
      </Can> 
      <Can I="create" a="User" ability={ability}>
        <AddUserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleAddUser} 
        />
      </Can>
    </Box>
  );
};

export default UsersTable;
