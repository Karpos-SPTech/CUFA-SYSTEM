import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2979ff", "#ffd54f", "#0288d1", "#ef5350"];

const data = [
  { name: "Usuarios", value: 400 },
  { name: "Empresas", value: 300 },
];

export default function DashboardPieChart() {
  return (
    <Box sx={{ width: '100%', height: 300, background: '#fff', borderRadius: 3, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Visitas atuais</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
