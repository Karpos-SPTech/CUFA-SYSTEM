import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import SidebarDashboard from "./components/SidebarDashboard";
import DashboardSummaryCard from "./components/DashboardSummaryCard";
import DashboardPieChart from "./components/DashboardPieChart";
import DashboardBarChart from "./components/DashboardBarChart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Email';

export default function DashboardCufa() {
  return (
    <Box sx={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: '#F8FAFB',
      borderRadius: 0,
      boxShadow: 'none',
      m: 0,
      p: 0,
      overflow: 'hidden',
      position: 'relative',
    }}>
      <SidebarDashboard />
      <Box sx={{ flex: 1, p: 4, minWidth: 0, overflow: 'auto', height: '100vh' }}>
        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={3}>
            <DashboardSummaryCard
              color="#e3f2fd"
              icon={<ShoppingCartIcon sx={{ color: '#2979ff' }} />}
              title="Vendas semanais"
              value="714 mil"
              percent="+2,6%"
              trend="up"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardSummaryCard
              color="#f3e5f5"
              icon={<PersonIcon sx={{ color: '#8e24aa' }} />}
              title="Novos usuários"
              value="1,35 m"
              percent="-0,1%"
              trend="down"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardSummaryCard
              color="#fff8e1"
              icon={<ShoppingCartIcon sx={{ color: '#fbc02d' }} />}
              title="Ordens de compra"
              value="1,72 m"
              percent="+2,8%"
              trend="up"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardSummaryCard
              color="#ffebee"
              icon={<MessageIcon sx={{ color: '#e57373' }} />}
              title="Mensagens"
              value="234"
              percent="+3,6%"
              trend="up"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DashboardPieChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardBarChart />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
