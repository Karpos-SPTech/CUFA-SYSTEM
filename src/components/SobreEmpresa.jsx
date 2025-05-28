import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Modal,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import editIcon from '/src/assets/pencil-icon.svg';

const SobreEmpresa = () => {
  const [open, setOpen] = useState(false);
  const [biografia, setBiografia] = useState("Biografia da empresa");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    handleClose();
  };

  return (
    <>
      <Paper
        sx={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          width: '100%',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#1e1e1e',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            Sobre
          </Typography>
          <Box
            component="img"
            src={editIcon}
            alt="Editar"
            onClick={handleOpen}
            sx={{
              cursor: 'pointer',
              width: 20,
              height: 20,
              opacity: 0.6,
              '&:hover': {
                opacity: 1
              }
            }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontSize: '14px'
          }}
        >
          {biografia}
        </Typography>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-editar-sobre"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: '15px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            p: 4,
            outline: 'none',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ color: '#006916', mb: 3, fontWeight: 'bold' }}>
            Editar biografia
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            placeholder="Digite a biografia da empresa"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#E3EEE5',
                borderRadius: '12px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            sx={{
              mt: 3,
              height: '48px',
              bgcolor: '#006916',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                bgcolor: '#005713',
              },
            }}
          >
            Salvar alterações
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default SobreEmpresa;
