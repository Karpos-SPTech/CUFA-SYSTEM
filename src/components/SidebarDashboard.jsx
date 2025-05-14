import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Button, Divider, Chip } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';

export default function SidebarDashboard() {
  return (
    <Box sx={{ width: 240, background: '#F8FAFB', minHeight: '100vh', p: 2, borderRadius: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>Cufa conecta <Chip label="Dashboard" size="small" sx={{ ml: 1, background: '#E5EEE3', color: '#006916' }} /></Typography>
      </Box>
      <List>
        <ListItem button selected>
          <ListItemIcon><DashboardIcon sx={{ color: '#006916' }} /></ListItemIcon>
          <ListItemText primary="Painel" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Usuário" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}
