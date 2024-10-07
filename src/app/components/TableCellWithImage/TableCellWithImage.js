// TableCellWithImage.js
import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import pizza1 from "@/images/featuredPizza1.png";

const TableCellWithImage = ({ name }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image
        src={pizza1.src}
        alt="Pizza"
        width={20}
        height={20}
        style={{ marginRight: "8px" }}
      />
      {name}
    </Box>
  );
};

export default TableCellWithImage;
