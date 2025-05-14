import React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Jan', Usuarios: 40, Empresas: 24 },
  { name: 'Fev', Usuarios: 30, Empresas: 13 },
  { name: 'Mar', Usuarios: 20, Empresas: 38 },
  { name: 'Abr', Usuarios: 27, Empresas: 39 },
  { name: 'Mai', Usuarios: 18, Empresas: 48 },
  { name: 'Jun', Usuarios: 23, Empresas: 38 },
  { name: 'Jul', Usuarios: 34, Empresas: 43 },
];

export default function DashboardBarChart() {
  return (
    <Box sx={{ width: '100%', height: 300, background: '#fff', borderRadius: 3, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>Visitas ao site</Typography>
      <Typography variant="body2" sx={{ mb: 2, color: '#888' }}>(+43%) do que no ano passado</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Usuarios" fill="#2979ff" name="Usuarios" />
          <Bar dataKey="Empresas" fill="#ffd54f" name="Empresas" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
