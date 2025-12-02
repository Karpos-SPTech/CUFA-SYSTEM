import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

export default function ModalAdicionarExperiencia({ open, onClose, onExperienceAdded }) {
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [dtInicio, setDtInicio] = useState('');
  const [dtFim, setDtFim] = useState('');

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cargo || !empresa || !dtInicio) {
      setSnackbarMessage('Por favor, preencha Cargo, Empresa e Data de Início.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Validate date relationship
    if (dtFim && new Date(dtFim) < new Date(dtInicio)) {
      setSnackbarMessage('A data de término não pode ser anterior à data de início.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    const experienceData = {
      cargo: cargo,
      empresa: empresa,
      dtInicio: dtInicio,
      dtFim: dtFim || null,
    };

    console.log("Enviando dados da experiência:", experienceData);

    try {
      const response = await fetch(`http://localhost:8080/api/experiencias`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(experienceData),
      });

      let responseData = null;

      if (!response.ok) {
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          responseData = await response.json();
        }
        throw new Error(responseData?.message || `Erro HTTP: ${response.status}`);
      }

      if (response.status === 204) {
        responseData = {};
        console.log('Experiência adicionada com sucesso (204 No Content).');
      } else if (response.headers.get('Content-Type')?.includes('application/json')) {
        responseData = await response.json();
        console.log('Experiência adicionada com sucesso:', responseData);
      } else {
        responseData = {};
        console.warn('Resposta bem-sucedida, mas sem JSON ou 204 no corpo. Status: ' + response.status);
      }

      setSnackbarMessage('Experiência adicionada com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setCargo('');
      setEmpresa('');
      setDtInicio('');
      setDtFim('');

      onClose(); 

      if (onExperienceAdded) {
        onExperienceAdded(responseData);
      }

    } catch (error) {
      console.error('Erro ao adicionar experiência:', error);
      setSnackbarMessage(`Erro ao adicionar experiência: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Componente Modal do Material-UI */}
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          bgcolor: '#fff',
          borderTop: "5px solid #006916",
          p: 4,
          borderRadius: 3,
          maxWidth: 400,
          mx: 'auto',
          mt: '10%',
          boxShadow: 6,
          // Estilos para garantir que o modal seja responsivo e centralizado
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 }, // Largura responsiva
          maxHeight: '90vh', // Limita a altura máxima à altura da viewport
          overflowY: 'auto' // Adiciona scroll se o conteúdo for muito longo
        }}>
          {/* Título do Modal */}
          <Typography variant="h6" sx={{ mb: 2, color: '#006916' }}>Adicionar Experiência</Typography>

          {/* Formulário para adicionar experiência */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Cargo"
              fullWidth
              sx={{ mb: 2 }}
              value={cargo}
              onChange={e => setCargo(e.target.value)}
              disabled={loading} // Desabilita campos durante o carregamento
              required
            />
            <TextField
              label="Empresa"
              fullWidth
              sx={{ mb: 2 }}
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              disabled={loading}
              required
            />
            <TextField
              label="Data de Início"
              type="date"
              value={dtInicio}
              onChange={e => setDtInicio(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              disabled={loading}
              helperText="Selecione a data de início da experiência"
            />
            <TextField
              label="Data de Término"
              type="date"
              value={dtFim}
              onChange={e => setDtFim(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
              disabled={loading}
              helperText="Deixe em branco se for sua experiência atual"
            />
            {/* Botões de Ação */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={onClose} color="green" disabled={loading}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#006916', '&:hover': { bgcolor: '#004d12' } }}
                disabled={loading} // Desabilita o botão durante o carregamento
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Adicionar"} {/* Ícone de carregamento */}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Componente Snackbar para mensagens de feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}