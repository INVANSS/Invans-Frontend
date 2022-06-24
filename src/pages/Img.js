import React from "react";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../components/AppBar";
import { Box } from "@mui/system";
import ImgList from "../components/ImgList";

export default function Img() {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box sx={{ px: 5, py: 2 }}>
        <ImgList />
      </Box>
    </Box>
  );
}
