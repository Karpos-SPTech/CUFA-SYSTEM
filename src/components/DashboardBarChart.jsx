import React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Jan', EquipeA: 40, EquipeB: 24 },
  { name: 'Fev', EquipeA: 30, EquipeB: 13 },
  { name: 'Mar', EquipeA: 20, EquipeB: 38 },
  { name: 'Abr', EquipeA: 27, EquipeB: 39 },
  { name: 'Mai', EquipeA: 18, EquipeB: 48 },
  { name: 'Jun', EquipeA: 23, EquipeB: 38 },
  { name: 'Jul', EquipeA: 34, EquipeB: 43 },
  { name: 'Ago', EquipeA: 50, EquipeB: 60 },
  { name: 'Set', EquipeA: 45, EquipeB: 35 },
];

export default function DashboardBarChart() {
  return (
    <Box
      sx={{
        width: '800px',
        maxWidth: '800px',
        height: 350,
        background: '#E5EEE3',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        p: 3,
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
        Visitas ao site
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
        (+43%) do que no ano passado
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
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
            }}
          />
          <Bar dataKey="EquipeA" fill="#2979ff" name="Equipe A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="EquipeB" fill="#ffd54f" name="Equipe B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}