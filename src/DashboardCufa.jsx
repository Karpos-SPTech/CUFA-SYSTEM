import React from "react";
import { Box, Grid } from "@mui/material";
import SidebarDashboard from "./components/SidebarDashboard";
import DashboardSummaryCard from "./components/DashboardSummaryCard";
import DashboardPieChart from "./components/DashboardPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Email';
import Header from "./components/Header";

export default function DashboardCufa() {
  return (
    <Box sx={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: '#006916',
      borderRadius: 0,
      boxShadow: 'none',
      m: 0,
      p: 0,
      overflow: 'hidden',
      position: 'relative',
      flexDirection: 'column', // Adiciona header acima do conteúdo
    }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
        <SidebarDashboard />
        <Box sx={{ flex: 1, p: 4, minWidth: 0, overflow: 'auto', height: '100%' }}>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12} md={3}>
              <DashboardSummaryCard
                color="#e3f2fd"
                icon={<ShoppingCartIcon sx={{ color: '#2979ff' }} />}
                title="Cadastros semanais"
                value="14 mil"
                percent="-0,6%"
                trend="down"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardSummaryCard
                color="#f3e5f5"
                icon={<PersonIcon sx={{ color: '#2979ff' }} />}
                title="Usuarios"
                value="28 mil"
                percent="0,5%"
                trend="up"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardSummaryCard
                color="#fff8e1"
                icon={<ShoppingCartIcon sx={{ color: '#fbc02d' }} />}
                title="Empresas"
                value="12 mil"
                percent="+2,8%"
                trend="up"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardSummaryCard
                color="#ffebee"
                icon={<MessageIcon sx={{ color: '#e57373' }} />}
                title="Publicações"
                value="234"
                percent="+3,6%"
                trend="up"
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
      </Box>
    </Box>
  );
}
