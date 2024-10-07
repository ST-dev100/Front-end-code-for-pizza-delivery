"use client"
import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip  } from "@mui/material";
import TableHeader from "./CustomTable/TableHeader";
import StatusMenu from "./StatusMenu/StatusMenu";
import TableCellWithImage from "./TableCellWithImage/TableCellWithImage";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import Visibility from "@mui/icons-material/Visibility";
import { getAllOrders, updateOrderStatus } from "@/app/services/api";
import { toast } from "react-hot-toast";
import { Can } from "@casl/react";
import { defineAbilitiesFor } from "@/app/CASL/defineAbilities";
import { useSelector } from "react-redux";
// Helper function to assign colors based on the topping
const getToppingColor = (topping) => {
  switch (topping) {
    case 'Mozzarella':
      return '#4CAF50'; // Green
    case 'Tomato':
      return '#F44336'; // Red
    case 'Bell Peppers':
      return '#388E3C'; // Dark Green
    case 'Onions':
      return '#00796B'; // Teal
    case 'Olives':
      return '#FFB74D'; // Light Orange
    default:
      return '#9E9E9E'; // Grey for unknown toppings
  }
};

const PackageTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const ability = useMemo(() => defineAbilitiesFor(user), [user]); 

  useEffect(() => {
    if (searchText === "") {
      setFilteredData(data);
    } else {
      const lowercasedFilter = searchText.toLowerCase();
      const filteredRows = data.filter((row) => {
        return (
          row.name.toLowerCase().includes(lowercasedFilter) ||
          row.topping.toLowerCase().includes(lowercasedFilter) ||
          row.customerNo.toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredData(filteredRows);
    }
  }, [searchText, data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getAllOrders();
        setData(orders);
        setFilteredData(orders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (rowIndex, newStatus) => {
    try {
      const orderId = data[rowIndex].uuid;
      const updatedData = data.map((row, index) =>
        index === rowIndex ? { ...row, status: newStatus } : row
      );
      setData(updatedData);
      setSelectedStatus({ ...selectedStatus, [rowIndex]: newStatus });
      setAnchorEl((prev) => ({ ...prev, [rowIndex]: null }));
      await updateOrderStatus(orderId, newStatus);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Error updating status");
      console.error('Failed to update order status:', error);
    }
  };

  const handleRefresh = () => {
    setData(initialData);
    setSelectedStatus({});
  };

  const handleVisibilityClick = (row) => {
    setSelectedRowData(row);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedRowData(null);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ row }) => <TableCellWithImage name={row.original.name} />,
      },
      {
        accessorKey: "topping",
        header: "Topping",
        Cell: ({ row }) => (
          <Box display="flex" alignItems="center" onClick={() => handleVisibilityClick(row.original)}>
            <Visibility style={{ color: "#ff9800", cursor: 'pointer' }} />
            <Typography color="primary" style={{ marginLeft: "8px", fontSize: "1rem" }}>
              Toppings
            </Typography>
          </Box>
        ),
      },
      { accessorKey: "quantity", header: "Quantity" },
      { accessorKey: "customer_phone_number", header: "Customer No" },
      { accessorKey: "created_at", header: "Created at" },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }) => (
          <>
          <Can I='update' a='OrderStatus' ability={ability}>
          <Box>
            <Button
              variant="contained"
              color={
                row.original.status === "Preparing"
                  ? "warning"
                  : row.original.status === "Ready"
                  ? "success"
                  : "default"
              }
              onClick={(event) => {
                setAnchorEl((prev) => ({
                  ...prev,
                  [row.index]: event.currentTarget,
                }));
              }}
            >
              {row.original.status}
            </Button>
            <StatusMenu
              anchorEl={anchorEl[row.index]}
              setAnchorEl={(value) => setAnchorEl((prev) => ({ ...prev, [row.index]: value }))}
              row={row}
              handleStatusChange={handleStatusChange}
              selectedStatus={selectedStatus[row.index]}
            />
          </Box>
          </Can>
          <Can not I='update' a='OrderStatus' ability={ability}>
          <Box>
            <Button
              variant="contained"
              color={
                row.original.status === "Preparing"
                  ? "warning"
                  : row.original.status === "Ready"
                  ? "success"
                  : "default"
              }
             disabled
            >
              {row.original.status}
            </Button>
            <StatusMenu
              anchorEl={anchorEl[row.index]}
              setAnchorEl={(value) => setAnchorEl((prev) => ({ ...prev, [row.index]: value }))}
              row={row}
              handleStatusChange={handleStatusChange}
              selectedStatus={selectedStatus[row.index]}
              disabled
            />
          </Box>
          </Can>
          </>
        ),
      },
    ],
    [anchorEl, selectedStatus, data]
  );

  const handleExportData = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "packages_table.csv");
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: 4, overflow: "auto" }}>
      <Can I="read" a="Order" ability={ability}>

      <MaterialReactTable
        columns={columns}
        data={filteredData}
        enableSorting={false}
        enableGlobalFilter={false}
        renderTopToolbarCustomActions={() => (
          <TableHeader
            searchText={searchText}
            setSearchText={setSearchText}
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleRefresh={handleRefresh}
            handleExportData={handleExportData}
          />
        )}
      />
      </Can>
      <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Order Details</DialogTitle>
      <DialogContent>
        {selectedRowData && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box display="flex" gap={1}>
              <Typography sx={{ fontWeight: 'bold', color: 'gray' }}>Name:</Typography>
              <Typography>{selectedRowData.name}</Typography>
            </Box>
            
            <Box display="flex" gap={1} alignItems="center">
              <Typography sx={{ fontWeight: 'bold', color: 'gray' }}>Toppings:</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {selectedRowData.topping.map((topping, index) => (
                  <Chip
                    key={index}
                    label={topping}
                    sx={{
                      backgroundColor: getToppingColor(topping),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                ))}
              </Box>
            </Box>
            
            <Box display="flex" gap={1}>
              <Typography sx={{ fontWeight: 'bold', color: 'gray' }}>Quantity:</Typography>
              <Typography>{selectedRowData.quantity}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default PackageTable;
