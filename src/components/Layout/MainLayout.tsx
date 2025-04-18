import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Footer from "../Footer";

const drawerWidth = 240;
const collapsedWidth = 56;

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Box sx={{ display: "inline" }}>
      <CssBaseline />
      <Sidebar 
        open={open} 
        setOpen={setOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${open || hovered ? drawerWidth : collapsedWidth}px)`,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ml: `${open || hovered ? drawerWidth : collapsedWidth}px`
        }}
      >
        <Outlet />
      </Box>
    </Box>
    
  );
};

export default MainLayout;