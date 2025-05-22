import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function DashboardSummaryCard({ color, icon, title, value, percent, trend, children }) {
  return (
    <Paper elevation={0} sx={{
      p: 2.5,
      borderRadius: 3,
      background: color,
      minWidth: 250,
      minHeight: 120,
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#fff',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
        <Typography variant="subtitle2" sx={{ color: '#333', fontWeight: 'bold' }}>{title}</Typography>
        {percent && <Typography variant="caption" sx={{ ml: 1, color: trend === 'up' ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>{trend === 'up' ? '▲' : '▼'} {percent}</Typography>}
      </Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#222' }}>{value}</Typography>
        {children}
      </Box>
    </Paper>
  );
}
