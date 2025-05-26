import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import DashboardSummaryCard from "./DashboardSummaryCard";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const userData = [
  { name: "Jan", usuarios: 4000, ativos: 2400 },
  { name: "Fev", usuarios: 3000, ativos: 1398 },
  { name: "Mar", usuarios: 2000, ativos: 1800 },
  { name: "Abr", usuarios: 2780, ativos: 2500 },
  { name: "Mai", usuarios: 5890, ativos: 4800 },
  { name: "Jun", usuarios: 5390, ativos: 3800 },
];

const ageData = [
  { name: "18-29", value: 3200 },
  { name: "30-45", value: 4800 },
  { name: "46+", value: 2000 },
];

const COLORS = ["#006916", "#4caf50", "#8bc34a"];

const DashboardUsuario = () => {
  return (
    <Box
      sx={{
        flex: 1,
        p: 4,
        minWidth: 0,
        overflow: "auto",
        height: "100%",
      }}
    >
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <DashboardSummaryCard
            color="#E5EEE3"
            icon={<PersonIcon sx={{ color: "#006916" }} />}
            title="Usuários Totais"            value="28,5 mil"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardSummaryCard
            color="#E5EEE3"
            icon={<GroupIcon sx={{ color: "#006916" }} />}
            title="Usuários Ativos"
            value="18,2 mil"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardSummaryCard
            color="#E5EEE3"
            icon={<EventIcon sx={{ color: "#006916" }} />}
            title="Novos Hoje"
            value="156"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardSummaryCard
            color="#E5EEE3"
            icon={<DescriptionIcon sx={{ color: "#006916" }} />}
            title="Curriculos feitos"
            value="1,2 mil"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>          <Paper
            elevation={2}
            sx={{
              width: 888,
              height: 390,
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              p: 3,
              mt: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Crescimento de Usuários
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={userData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#666" }} />
                <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "#666",
                    fontWeight: "bold",
                  }}
                />                <Line
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#006916"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Usuários Cadastrados"
                />
                <Line
                  type="monotone"
                  dataKey="ativos"                  stroke="#8bc34a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>          <Paper
            elevation={2}
            sx={{
              width: 280,
              height: 390,
              background: "#fff",
              borderRadius: 3,
              p: 3,
              mt: 3,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Distribuição por Idade
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ageData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${name}`, `${value}`]} />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle"
                  formatter={(value, entry) => <span style={{ color: '#333', fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardUsuario;
