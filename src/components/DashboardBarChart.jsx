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
  { name: 'Ago', Usuarios: 50, Empresas: 60 },
  { name: 'Set', Usuarios: 45, Empresas: 35 },
];

export default function DashboardBarChart() {
  return (
    <Box
      sx={{
        width: '800px',
        maxWidth: '800px',
        height: 350,
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        p: 3,
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
        Visitas ao site
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
        (+43%) do que no ano passado
      </Typography>      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} />
          <YAxis tick={{ fontSize: 12, fill: '#666' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Legend
            wrapperStyle={{
              fontSize: '12px',
              color: '#666',
              fontWeight: 'bold'
            }}
          />
          <Bar dataKey="Usuarios" fill="#006916" name="Usuarios" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Empresas" fill="#A4E44F" name="Empresas" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}