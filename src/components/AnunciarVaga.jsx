import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Modal, 
  Typography, 
  TextField, 
  Button,
  Alert,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import mcdonaldsLogo from '../assets/microsoft-logo.png';
import fotoIcon from '../assets/foto-icon.png';
import videoIcon from '../assets/video-icon.png';
import textoIcon from '../assets/text-icon.png';
import empresaImageManager from '../utils/empresaImageManager';

const ButtonOption = ({ icon, label }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      cursor: 'pointer',
      color: '#006916',
      fontSize: '14px',
      '&:hover': {
        opacity: 0.8
      }
    }}
  >
    <Box      component="img"
      src={icon}
      alt={label}
      sx={{ width: 28, height: 28 }}
    />
    <span>{label}</span>
  </Box>
);

const AnunciarVaga = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [empresaLogo, setEmpresaLogo] = useState(null);
  const [publicacao, setPublicacao] = useState({
    titulo: '',
    descricao: '',
    requisitos: '',
    beneficios: '',
    salario: ''
  });

  useEffect(() => {
    // Carregar logo da empresa ao montar o componente
    const savedLogo = empresaImageManager.getProfileImage();
    if (savedLogo) {
      setEmpresaLogo(savedLogo);
    }

    // Escutar mudanças na logo da empresa
    const removeListener = empresaImageManager.addListener((imageType, imageData) => {
      if (imageType === 'profile') {
        setEmpresaLogo(imageData);
      }
    });

    // Cleanup: remover listener quando o componente for desmontado
    return removeListener;
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError('');
    setSuccess('');
    setPublicacao({
      titulo: '',
      descricao: '',
      requisitos: '',
      beneficios: '',
      salario: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicacao(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await publicacaoService.criarPublicacao(publicacao);
      setSuccess('Vaga publicada com sucesso!');
      setTimeout(handleClose, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao publicar vaga. Tente novamente.');
    }
  };

  return (
    <>
      <Paper sx={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        p: 2,
        width: '100%',
        border: '1px solid #ddd',
        minHeight: '80px'
      }}
    >      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 2,
          alignItems: 'center',
          mb: 3
        }}
      >
        <Box
          component="img"
          src={empresaLogo || mcdonaldsLogo}
          alt="Logo empresa"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <Box
          component="button"
          onClick={handleOpen}
          sx={{
            background: '#e9f1e7',
            border: 'none',
            borderRadius: '15px',
            padding: '12px 16px',
            color: '#006916',
            fontSize: '14px',
            fontWeight: '400',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            width: '100%',
            textAlign: 'left',
            minHeight: '45px',
            '&:hover': {
              background: '#d8e6d5',
            }
          }}
        >
          Anunciar novas vagas!
        </Box>
      </Box>      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: 2,
          mt: 1
        }}
      >
      </Box>    </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-publicar-vaga"
        aria-describedby="modal-publicar-nova-vaga"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" component="h2" sx={{ mb: 3, color: '#006916' }}>
            Publicar Nova Vaga
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              fullWidth
              label="Título da Vaga"
              name="titulo"
              value={publicacao.titulo}
              onChange={handleChange}
            />
            
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Descrição da Vaga"
              name="descricao"
              value={publicacao.descricao}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              multiline
              rows={3}
              label="Tipo de contrato"
              name="tipoContrato"
              value={publicacao.requisitos}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              multiline
              rows={3}
              label="data de Expiração"
              name="dataExpiracao"
              value={publicacao.beneficios}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: '#006916',
                '&:hover': {
                  bgcolor: '#005713'
                }
              }}
            >
              Publicar Vaga
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AnunciarVaga;