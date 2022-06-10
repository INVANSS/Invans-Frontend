import React from "react";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../components/AppBar";
import { Box } from "@mui/system";
import ProductsList from "../components/ProductsList";

export default function Products() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ px: 5, py: 2 }}>
        <ProductsList />
      </Box>
    </Box>
  );
}
