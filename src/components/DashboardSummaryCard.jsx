import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function DashboardSummaryCard({ color, icon, title, value, percent, trend, children }) {
  return (
    <Paper elevation={0} sx={{
      p: 2.5,
      borderRadius: 3,
      background: color,
      minWidth: 220,
      minHeight: 120,
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
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
