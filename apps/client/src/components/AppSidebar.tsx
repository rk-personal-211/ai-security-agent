import {
  DashboardOutlined as DashboardOutlinedIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  FolderOutlined as FolderOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
} from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 252;

const navigationItems = [
  { icon: <DashboardOutlinedIcon />, label: "Dashboard", path: "/" },
  { icon: <FolderOutlinedIcon />, label: "Repositories", path: "/empty" },
  { icon: <DescriptionOutlinedIcon />, label: "Findings", path: "/findings" },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function SidebarContent(): JSX.Element {
  const location = useLocation();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ px: 3, py: 3 }}>
        <Typography component="p" variant="h6" fontWeight={800}>Fix Factory</Typography>
        <Typography variant="caption" color="text.secondary">AI Security Engineer</Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1.5, py: 2 }}>
        {navigationItems.map((item) => (
          <ListItemButton
            component={Link}
            key={item.path}
            selected={location.pathname === item.path}
            to={item.path}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: "auto", p: 1.5 }}>
        <ListItemButton component={Link} to="/error" sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 40 }}><SettingsOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps): JSX.Element {
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", lg: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        <SidebarContent />
      </Drawer>
      <Drawer
        open
        variant="permanent"
        sx={{ display: { xs: "none", lg: "block" }, width: drawerWidth, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", borderRight: 1, borderColor: "divider" } }}
      >
        <SidebarContent />
      </Drawer>
    </>
  );
}

export const appSidebarWidth = drawerWidth;
