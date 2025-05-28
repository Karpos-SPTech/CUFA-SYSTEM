import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar,
  IconButton,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import profileIcon from '../assets/profile-icon.png';

const MemberRow = ({ image, name }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      mb: 2,
      p: 1,
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: '#e8f5e9',
      }
    }}
  >
    <Avatar
      src={image || profileIcon}
      alt={name}
      sx={{ 
        width: 36, 
        height: 36,
      }}
    />
    <Typography
      sx={{
        fontSize: '14px',
        color: '#1e1e1e',
        fontWeight: 500,
      }}
    >
      {name}
    </Typography>
  </Box>
);

const MembroCard = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    funcao: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      nome: '',
      sobrenome: '',
      email: '',
      cpf: '',
      funcao: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    handleClose();
  };

 
  const members = [
    { id: 1, name: 'Nome membro', image: null },
    { id: 2, name: 'Nome membro', image: null },
  ];

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          p: 2,
          width: '100%',
          minWidth: '400px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1e1e1e',
            }}
          >
            Membros
          </Typography>
          <IconButton
            onClick={handleOpen}
            sx={{
              backgroundColor: '#e9f1e7',
              width: 24,
              height: 24,
              '&:hover': {
                backgroundColor: '#d8e6d5',
              }
            }}
          >
            <AddIcon sx={{ fontSize: 16, color: '#006916' }} />
          </IconButton>
        </Box>

        <Box>
          {members.map((member) => (
            <MemberRow
              key={member.id}
              name={member.name}
              image={member.image}
            />
          ))}
        </Box>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-cadastro-membro"
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
            Preencha os dados para cadastrar
          </Typography>
          
          <Typography variant="subtitle1" sx={{ mb: 2, color: '#666' }}>
            Dados pessoais
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                fullWidth
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#E3EEE5',
                    height: '48px',
                    borderRadius: '12px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                name="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                placeholder="Sobrenome"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#E3EEE5',
                    height: '48px',
                    borderRadius: '12px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#E3EEE5',
                  height: '48px',
                  borderRadius: '12px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />

            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                fullWidth
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="CPF"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#E3EEE5',
                    height: '48px',
                    borderRadius: '12px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                name="funcao"
                value={formData.funcao}
                onChange={handleChange}
                placeholder="função"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#E3EEE5',
                    height: '48px',
                    borderRadius: '12px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                height: '48px',
                bgcolor: '#006916',
                color: 'white',
                borderRadius: '12px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  bgcolor: '#005713',
                },
              }}
            >
              Finalizar Cadastro
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MembroCard;
