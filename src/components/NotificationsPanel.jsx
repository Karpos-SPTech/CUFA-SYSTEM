import React from 'react';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';

const NotificationItem = () => (
  <ListItem
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      padding: '12px',
      borderBottom: '1px solid #eee',
      '&:last-child': {
        borderBottom: 'none'
      }
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#e9f1e7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
    <Box>
      <Typography
        variant="body2"
        sx={{
          color: '#666',
          fontSize: '14px'
        }}
      >
        Não registrado ou Lorem
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: '#999',
          fontSize: '12px'
        }}
      >
        Não registrado no sistema
      </Typography>
    </Box>
  </ListItem>
);

const NotificationsPanel = () => {
  return (
    <Paper
      sx={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        p: 2,
        width: '100%',
        border: '1px solid #ddd',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#006916',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Notificações
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#999',
            fontSize: '12px'
          }}
        >
          99+
        </Typography>
      </Box>

      <List sx={{ p: 0 }}>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </List>
    </Paper>
  );
};

export default NotificationsPanel;
