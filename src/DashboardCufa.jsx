import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import SidebarDashboard from "./components/SidebarDashboard";
import DashboardSummaryCard from "./components/DashboardSummaryCard";
import DashboardPieChart from "./components/DashboardPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Email";
import Header from "./components/Header";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BusinessIcon from "@mui/icons-material/Business";
import DashboardUsuario from "./components/DashboardUsuario";
import DashboardEmpresa from "./components/DashboardEmpresa";

export default function DashboardCufa() {
  const [selectedDashboard, setSelectedDashboard] = useState("Painel");

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case "Usuario":
        return <DashboardUsuario />;
      case "Empresa":
        return <DashboardEmpresa />;
      default:
        return (
          <Box
            sx={{ flex: 1, p: 4, minWidth: 0, overflow: "auto", height: "100%" }}
          >
            <Grid container spacing={3} sx={{ mb: 2 }}>
              <Grid item xs={12} md={3}>
                <DashboardSummaryCard
                  color="#E5EEE3"
                  icon={<ArrowUpwardIcon sx={{ color: "#006916" }} />}
                  title="Cadastros semanais"
                  value="14 mil"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardSummaryCard
                  color="#E5EEE3"
                  icon={<PersonIcon sx={{ color: "#006916" }} />}
                  title="Usuarios"
                  value="28 mil"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardSummaryCard
                  color="#E5EEE3"
                  icon={<BusinessIcon sx={{ color: "#006916" }} />}
                  title="Empresas"
                  value="12 mil"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardSummaryCard
                  color="#E5EEE3"
                  icon={<MessageIcon sx={{ color: "#006916" }} />}
                  title="Publicações"
                  value="234"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DashboardBarChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <DashboardPieChart />
              </Grid>
            </Grid>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "#E5EEE3",
        borderRadius: 0,
        boxShadow: "none",
        m: 0,
        p: 0,
        overflow: "hidden",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <SidebarDashboard onSelect={setSelectedDashboard} />
        {renderDashboard()}
      </Box>
    </Box>
  );
}
