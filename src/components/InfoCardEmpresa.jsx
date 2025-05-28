import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  CircularProgress, 
  Modal,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import editIcon from '/src/assets/pencil-icon.svg';
import empresaService from '../services/empresaService';

const InfoCardEmpresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cnpj: ''
  });

  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        const empresaData = await empresaService.getEmpresaLogada();
        if (empresaData) {
          setEmpresa(empresaData);
          setFormData({
            nome: empresaData.nome || '',
            email: empresaData.email || '',
            cnpj: empresaData.cnpj || ''
          });
        }
      } catch (err) {
        console.error('Erro ao buscar dados da empresa:', err);
        setError('Não foi possível carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      await empresaService.atualizarEmpresa(empresa.id, formData);
      setEmpresa(formData);
      handleClose();
    } catch (err) {
      console.error('Erro ao atualizar dados da empresa:', err);
      setError('Não foi possível atualizar os dados');
    } finally {
      setLoading(false);
    }
  };

  const getDisplayValue = (value, type) => {
    if (loading) return <CircularProgress size={16} />;
    if (error) return `Não foi possível carregar ${type}`;
    return value || `Não foi possível carregar ${type}`;
  };

  return (
    <>
      <Paper
        sx={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            backgroundColor: '#006916',
            height: '90px',
            width: '100%',
            position: 'relative'
          }}
        >
          <Box
            component="img"
            src={editIcon}
            alt="Editar cabeçalho"
            sx={{
              position: 'absolute',
              top: '50%',
              right: 24,
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              width: 20,
              height: 20,
              filter: 'brightness(0) invert(1)',
              '&:hover': {
                opacity: 0.8
              }
            }}
          />
        </Box>

        <Box sx={{ p: 3, pt: 6, position: 'relative' }}>
          <Box
            component="img"
            src={editIcon}
            alt="Editar informações"
            onClick={handleOpen}
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              cursor: 'pointer',
              width: 20,
              height: 20,
              opacity: 0.6,
              '&:hover': {
                opacity: 1
              }
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: -50,
              left: 24,
              width: 100,
              height: 100,
              borderRadius: '50%',
              border: '4px solid #fff',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box
              component="img"
              src="/src/assets/microsoft-logo.png"
              alt="Logo da empresa"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                p: 1
              }}
            />
          </Box>
          
          <Box sx={{ ml: 15 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#1e1e1e',
                fontSize: '20px',
                fontWeight: '600',
                mb: 1
              }}
            >
              {getDisplayValue(empresa?.nome, 'o nome da empresa')}
            </Typography>
            <Typography
              sx={{
                color: '#666',
                fontSize: '14px',
                mb: 0.5
              }}
            >
              {getDisplayValue(empresa?.email, 'o email da empresa')}
            </Typography>
            <Typography
              sx={{
                color: '#666',
                fontSize: '14px'
              }}
            >
              {getDisplayValue(empresa?.cnpj, 'o CNPJ da empresa')}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-editar-empresa"
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
            Editar informações da empresa
          </Typography>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            
            <TextField
              fullWidth
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome da empresa"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#E3EEE5',
                  height: '48px',
                  borderRadius: '12px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />

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
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="CNPJ"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#E3EEE5',
                  height: '48px',
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
              disabled={loading}
              sx={{
                mt: 2,
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
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Salvar alterações'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default InfoCardEmpresa;
