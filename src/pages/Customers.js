import React from "react";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../components/AppBar";
import { Box } from "@mui/system";
import CustomersList from "../components/CustomersList";

export default function Customers() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ px: 5, py: 2 }}>
        <CustomersList />
      </Box>
    </Box>
  );
}
