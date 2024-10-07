// CustomTable.jsx
"use client";
import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh"; // Ensure this line is present
import Image from "next/image";

import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Divider, 
  Button,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload"; // Ensure this line is present
import { saveAs } from "file-saver";
import Papa from "papaparse";

const CustomTable = ({ columns, data, title, onRefresh, onExport }) => {
  return (
    <Box sx={{ display: "flex", margin: 4, overflow: "auto" }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableSorting={false}
        enableGlobalFilter={false}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: "flex", width: "100%" }}>
            <Typography
              sx={{ fontWeight: "bold", textAlign: "center", padding: 2, fontSize: "1.2rem" }}
            >
              {title}
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
                <IconButton onClick={onRefresh}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Download">
                <IconButton onClick={onExport}>
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem sx={{ mx: 0 }} />
            </Box>
          </Box>
        )}
        muiTableHeadCellProps={{
          sx: {
            fontSize: "18px",
            fontWeight: "bold",
          },
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "0",
            border: "1px solid #e0e0e0",
          },
        }}
        muiTableBodyProps={{
          sx: (theme) => ({
            "& tr:nth-of-type(odd)": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        }}
        muiTableBodyCellProps={{
          sx: {
            fontSize: "1rem",
          },
        }}
      />
    </Box>
  );
};

export default CustomTable;
