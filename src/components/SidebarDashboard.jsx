import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import AnimatedChart from "./AnimatedChart";
import LiveIndicator from "./LiveIndicator";
import DashboardStats from "./DashboardStats";

export default function SidebarDashboard({ onSelect }) {
  const [selected, setSelected] = useState("Painel");

  const handleSelect = (option) => {
    setSelected(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (    <Box
      sx={{
        width: 200,
        background: "#fff",
        height: "calc(100% - 99px)",
        p: 1.5,
        borderRadius: 2,
        mt: 4,
        ml: 6 ,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",}}
    >      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ml:2 , fontWeight: "bold", color: "#333", mb: 0.2 }}
        >
          CUFA{" "}
          <Chip
            label="Dashboard"
            size="small"
            sx={{ ml: 4, background: "#E5EEE3", color: "#006916" }}
          />
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        <ListItem 
          button 
          selected={selected === "Painel"} 
          onClick={() => handleSelect("Painel")}
          sx={{
            borderRadius: '8px',
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: '#E5EEE3',
              '&:hover': {
                backgroundColor: '#d7e6d4',
              }
            },
            '&:hover': {
              backgroundColor: '#f5f9f5',
            }
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: selected === "Painel" ? "#006916" : "#757575" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Painel" 
            primaryTypographyProps={{ 
              fontSize: "0.9rem",
              fontWeight: selected === "Painel" ? "bold" : "normal",
              color: selected === "Painel" ? "#006916" : "#333"
            }} 
          />
        </ListItem>        <Divider sx={{ my: 1.5 }} />
        <ListItem 
          button 
          selected={selected === "Usuario"} 
          onClick={() => handleSelect("Usuario")}
          sx={{
            borderRadius: '8px',
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: '#E5EEE3',
              '&:hover': {
                backgroundColor: '#d7e6d4',
              }
            },
            '&:hover': {
              backgroundColor: '#f5f9f5',
            }
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: selected === "Usuario" ? "#006916" : "#757575" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Usuário" 
            primaryTypographyProps={{ 
              fontSize: "0.9rem",
              fontWeight: selected === "Usuario" ? "bold" : "normal",
              color: selected === "Usuario" ? "#006916" : "#333"
            }} 
          />
        </ListItem>
        <ListItem 
          button 
          selected={selected === "Empresa"} 
          onClick={() => handleSelect("Empresa")}
          sx={{
            borderRadius: '8px',
            '&.Mui-selected': {
              backgroundColor: '#E5EEE3',
              '&:hover': {
                backgroundColor: '#d7e6d4',
              }
            },
            '&:hover': {
              backgroundColor: '#f5f9f5',
            }
          }}
        >
          <ListItemIcon>
            <BusinessIcon sx={{ color: selected === "Empresa" ? "#006916" : "#757575" }} />
          </ListItemIcon>
          <ListItemText 
            primary="Empresa" 
            primaryTypographyProps={{ 
              fontSize: "0.9rem",
              fontWeight: selected === "Empresa" ? "bold" : "normal",
              color: selected === "Empresa" ? "#006916" : "#333"
            }}          />
        </ListItem>
      </List>
      
      {/* Área para o gráfico animado */}
      <Box 
        sx={{ 
          mt: 4, 
          height: 140, 
          borderRadius: 2, 
          overflow: 'hidden',
          background: 'rgba(229, 238, 227, 0.4)',
          boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.05)',
          py: 1
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'center', 
            color: '#006916',
            fontWeight: 'bold',
            mb: 0.5          }}
        >
          Atividade em tempo real
        </Typography>
        <Box sx={{ height: 110 }}>
          <AnimatedChart />
        </Box>      </Box>
      
      {/* Estatísticas de dashboard */}
      <DashboardStats />
      
      {/* Indicador de dashboard ativo */}
      <LiveIndicator />
      
      {/* Espaço flexível para empurrar o indicador para o final quando a tela for grande */}
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
}
