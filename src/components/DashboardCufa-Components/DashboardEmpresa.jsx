import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import DashboardSummaryCard from "./DashboardSummaryCard";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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

const empresaData = [
  { name: "Jan", cadastros: 2100, ativas: 1800 },
  { name: "Fev", cadastros: 2400, ativas: 2100 },
  { name: "Mar", cadastros: 2800, ativas: 2400 },
  { name: "Abr", cadastros: 3100, ativas: 2700 },
  { name: "Mai", cadastros: 3400, ativas: 3000 },
  { name: "Jun", cadastros: 3800, ativas: 3300 },
];

const segmentoData = [
  { name: "Serviços", value: 4200 },
  { name: "Comércio", value: 3100 },
  { name: "Indústria", value: 1700 },
];

const COLORS = ["#006916", "#4caf50", "#8bc34a"];

const DashboardEmpresa = () => {
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
            icon={<BusinessIcon sx={{ color: "#006916" }} />}
            title="Empresas Totais"
            value="12 mil"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardSummaryCard
            color="#E5EEE3"
            icon={<WorkIcon sx={{ color: "#006916" }} />}
            title="Empresas Ativas"
            value="9,5 mil"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardSummaryCard
            color="#E5EEE3"
            icon={<TrendingUpIcon sx={{ color: "#006916" }} />}
            title="Novas Hoje"
            value="87"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardSummaryCard
            color="#E5EEE3"
            icon={<DescriptionIcon sx={{ color: "#006916" }} />}
            title="Novas vagas"
            value="3,5 mil"
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
              Crescimento de Empresas
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={empresaData}
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
                />
                <Line
                  type="monotone"
                  dataKey="cadastros"
                  stroke="#006916"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Empresas Cadastradas"
                />
                <Line
                  type="monotone"
                  dataKey="ativas"
                  stroke="#8bc34a"
                  strokeWidth={2}
                  name="Empresas Ativas"
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
              background: '#fff',
              borderRadius: 3,
              p: 3,
              mt: 3,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
            >
              Distribuição por Segmento
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={segmentoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {segmentoData.map((entry, index) => (
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

export default DashboardEmpresa;
