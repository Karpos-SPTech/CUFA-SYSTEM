import React from "react";
import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#006916", "#A4E44F"];

const data = [
  { name: "Usuários", value: 300 },
  { name: "Empresas", value: 100 },
];

export default function DashboardPieChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box
      sx={{
        width: 250,
        height: 350,
        background: "#fff",
        borderRadius: 3,
        p: 3,
        mt: 3,
        ml: 0,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
      >
        Visitas Atuais
      </Typography>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            paddingAngle={4}
            isAnimationActive
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              const percent = ((value / total) * 100).toFixed(1);
              return [`${percent}%`, name];
            }}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              fontSize: 13,
              padding: 10,
            }}
          />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
