import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  styled,
  useTheme,
  Toolbar,
  Box
} from "@mui/material";
import {
  Home,
  PeopleAlt,
  Key,
  Layers,
  Construction,
  Settings,
  ExitToApp,
  Help,
  ExpandLess,
  ExpandMore,
  SubdirectoryArrowRight,
  VerifiedUser,
  SupervisedUserCircle,
  SupervisedUserCircleTwoTone,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const drawerWidth = 240;

const Sidebar = ({ open, setOpen, onMouseEnter, onMouseLeave }: SidebarProps) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode } = useThemeMode();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    enqueueSnackbar("You have been logged out", { variant: "info" });
    navigate("/login", { replace: true });
  };

  const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: 0,
    justifyContent: "center",
    color: mode === 'dark' ? "#ffffff" : "#000000",
    marginRight: "auto",
  });

  const sidebarItems = [
    { type: "headline", text: "Main" },
    {
      type: "item",
      title: "Dashboard",
      icon: <Home fontSize="small" />,
      href: "/home",
    },
    { type: "headline", text: "Administration" },
    {
      type: "nested",
      title: "P2P Section",
      icon: <Layers fontSize="small" />,
      children: [
        { title: "Production Dashboard", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/daySummary" },
        { title: "Production Update", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/production" },
        { title: "Day Plan Upload", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/dayPlan" },
        { title: "Reports", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/dayReport" },
        { title: "Summary", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/daySummary" },
      ],
    },
    { type: "divider" },
    { type: "headline", text: "Configuration" },
    {
      type: "nested",
      title: "User Management",
      icon: <SupervisedUserCircleTwoTone fontSize="small" />,
      children: [
        { title: "User Account", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/userProfile" },
        { title: "User Management", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/userManagement" },
        { title: "User Access Management", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/userAccessManagement" },
        { title: "User Access Management System", icon: <SubdirectoryArrowRight fontSize="small" />, href: "/userAccessManagementSystem" },
      ],
    },
    {
      type: "item",
      title: "System Management",
      icon: <Settings fontSize="small" />,
      href: "/systemManagement",
    },
    { type: "divider" },
    { type: "headline", text: "Components" },
    {
      type: "item",
      title: "User Profile",
      icon: <SupervisedUserCircle fontSize="small" />,
      href: "/userProfile",
    },
    {
      type: "item",
      title: "Help",
      icon: <Help fontSize="small" />,
      href: "/help",
    },
    {
      type: "item",
      title: "Settings",
      icon: <Settings fontSize="small" />,
      href: "/setting",
    },
    {
      type: "item",
      title: "Logout",
      icon: <ExitToApp fontSize="small" />,
      action: handleLogout,
    },
  ];

  const handleItemClick = (item: any) => {
    if (item.href) {
      navigate(item.href);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <Box
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        '&:hover .MuiDrawer-paper': {
          width: `${drawerWidth}px !important`,
        }
      }}
      aria-label="sidebar"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: open ? drawerWidth : 56,
            backgroundColor: mode === 'dark' ? "#1e1e1e" : "#ffffff",
            color: mode === 'dark' ? "#ffffff" : "#000000",
            transition: "width 0.3s ease",
            overflowX: "hidden",
            '&:hover': {
              width: `${drawerWidth}px !important`,
            },
          },
        }}
        open
      >
        <Toolbar />
        <List sx={{ p: 0 }}>
          {sidebarItems.map((item, index) => {
            if (item.type === "headline") {
              return (
                <ListItemText
                  key={index}
                  primary={item.text}
                  sx={{
                    px: 2.5,
                    py: 1,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: mode === 'dark' ? "rgba(255, 255, 255, 0.7)" : "text.secondary",
                    display: open ? "block" : "none",
                  }}
                />
              );
            }

            if (item.type === "divider") {
              return (
                <Divider 
                  key={index} 
                  sx={{ 
                    my: 1, 
                    backgroundColor: mode === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)" 
                  }} 
                />
              );
            }

            if (item.type === "nested") {
              return (
                <div key={index}>
                  <ListItemButton
                    onClick={() => toggleSection(item.title!)}
                    sx={{ 
                      minHeight: 48, 
                      px: 2.5,
                      "&:hover": {
                        backgroundColor: mode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)"
                      }
                    }}
                  >
                    <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                    {open && (
                      <>
                        <ListItemText
                          primary={item.title}
                          primaryTypographyProps={{ 
                            fontSize: "0.875rem",
                            color: mode === 'dark' ? "#ffffff" : "#000000"
                          }}
                        />
                        {openSections[item.title!] ? (
                          <ExpandLess fontSize="small" />
                        ) : (
                          <ExpandMore fontSize="small" />
                        )}
                      </>
                    )}
                  </ListItemButton>
                  <Collapse in={openSections[item.title!] && open} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{ pl: 2 }}>
                      {item.children?.map((child, childIndex) => (
                        <ListItemButton 
                          key={childIndex} 
                          onClick={() => handleItemClick(child)}
                          sx={{ 
                            pl: 4, 
                            minHeight: 48,
                            "&:hover": {
                              backgroundColor: mode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)"
                            }
                          }}
                        >
                          <StyledListItemIcon>{child.icon}</StyledListItemIcon>
                          {open && (
                            <ListItemText
                              primary={child.title}
                              primaryTypographyProps={{ 
                                fontSize: "0.875rem",
                                color: mode === 'dark' ? "#ffffff" : "#000000"
                              }}
                            />
                          )}
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </div>
              );
            }

            return (
              <ListItemButton 
                key={index} 
                onClick={() => handleItemClick(item)}
                sx={{ 
                  minHeight: 48, 
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: mode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)"
                  }
                }}
              >
                <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ 
                      fontSize: "0.875rem",
                      color: mode === 'dark' ? "#ffffff" : "#000000"
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;