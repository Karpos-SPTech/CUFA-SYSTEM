import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";

export default function SidebarDashboard({ onSelect }) {
  const [selected, setSelected] = useState("Painel");

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <Box
      sx={{
        width: 200,
        background: "#fff",
        height: "510px",
        p: 1.5,
        borderRadius: 2,
        mt: 4,
        ml: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
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
        <ListItem button selected={selected === "Painel"} onClick={() => handleSelect("Painel")}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#006916" }} />
          </ListItemIcon>
          <ListItemText primary="Painel" sx={{ fontSize: "0.9rem" }} />
          <Divider sx={{ my: 1.5 }} />
        </ListItem>        <ListItem button selected={selected === "Usuario"} onClick={() => handleSelect("Usuario")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usuario" sx={{ fontSize: "0.9rem" }} />
        </ListItem>
        <ListItem button selected={selected === "Empresa"} onClick={() => handleSelect("Empresa")}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Empresa" sx={{ fontSize: "0.9rem" }} />
        </ListItem>
      </List>
    </Box>
  );
}
