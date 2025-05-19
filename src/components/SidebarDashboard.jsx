import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

export default function SidebarDashboard() {
  return (
    <Box
      sx={{
        width: 200,
        background: "#E5EEE3",
        height: "300px",
        p: 1.5,
        borderRadius: 2,
        mt: 4,
        ml: 0.5,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", color: "#333", mb: 0.5 }}
        >
          Cufa conecta{" "}
          <Chip
            label="Dashboard"
            size="small"
            sx={{ ml: 0.5, background: "#E5EEE3", color: "#006916" }}
          />
        </Typography>
      </Box>
      <List>
        <ListItem button selected>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#006916" }} />
          </ListItemIcon>
          <ListItemText primary="Painel" sx={{ fontSize: "0.9rem" }} />
          <Divider sx={{ my: 1.5 }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Empresa" sx={{ fontSize: "0.9rem" }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usuario" sx={{ fontSize: "0.9rem" }} />
        </ListItem>
      </List>
    </Box>
  );
}
