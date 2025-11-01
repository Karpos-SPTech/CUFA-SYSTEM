import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material'; // Adicionado CircularProgress, Snackbar, Alert

export default function ModalEditarExperiencia({ open, onClose, experiencia, onEdit }) {
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [dtInicio, setDtInicio] = useState('');
  const [dtFim, setDtFim] = useState('');

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // useEffect para preencher os campos do formulário quando a prop 'experiencia' ou 'open' muda
  useEffect(() => {
    if (experiencia) {
      setCargo(experiencia.cargo || '');
      setEmpresa(experiencia.empresa || '');
      setDtInicio(experiencia.dtInicio || '');
      setDtFim(experiencia.dtFim || '');
    }
  }, [experiencia, open]); // Dependências: re-executa se 'experiencia' ou 'open' mudar

  // Função para lidar com o envio do formulário de edição
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Validação básica dos campos
    if (!cargo || !empresa || !dtInicio) { // dtFim pode ser opcional
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

    setLoading(true); // Ativa o estado de carregamento

    const userToken = localStorage.getItem('token');
    if (!userToken) {
      setSnackbarMessage('Sessão expirada ou usuário não autenticado. Faça login novamente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    // Prepara os dados da experiência atualizados no formato JSON esperado pelo backend
    const updatedExperienceData = {
      id: experiencia.id, // O ID da experiência que está sendo atualizada
      cargo: cargo,
      empresa: empresa,
      dtInicio: dtInicio,
      dtFim: dtFim || null, // Envia null se dtFim estiver vazio
    };

    console.log("Enviando dados da experiência para PUT:", updatedExperienceData);

    try {
      // Faz a requisição PUT para o endpoint com o ID da experiência
      const response = await fetch(`http://localhost:8080/api/experiencias/${experiencia.id}`, {
        method: 'PUT', // Método HTTP PUT para atualização
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedExperienceData),
      });

      let responseData = null;

      if (!response.ok) { // Se a resposta NÃO for 2xx (erro)
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          responseData = await response.json();
        }
        throw new Error(responseData?.message || `Erro HTTP: ${response.status}`);
      }

      // Se a resposta for 2xx (sucesso)
      if (response.status === 204) { // 204 No Content
        responseData = {};
        console.log('Experiência atualizada com sucesso (204 No Content).');
      } else if (response.headers.get('Content-Type')?.includes('application/json')) {
        responseData = await response.json();
        console.log('Experiência atualizada com sucesso:', responseData);
      } else { // Outros 2xx sem JSON no corpo (ex: 200 OK ou 201 Created sem corpo)
        responseData = {};
        console.warn('Resposta de atualização bem-sucedida, mas sem JSON ou 204. Status: ' + response.status);
      }

      setSnackbarMessage('Experiência atualizada com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      onClose(); // Fecha o modal
      // Chama a função onEdit do componente pai (CardExperiencia) para re-buscar a lista
      if (onEdit) {
        onEdit(responseData); // Passa os dados atualizados ou objeto vazio
      }

    } catch (error) {
      console.error('Erro ao atualizar experiência:', error);
      setSnackbarMessage(`Erro ao atualizar experiência: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  // Função para fechar o Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Obtém a data de hoje no formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          borderTop: "5px solid #006916",
          bgcolor: '#fff',
          p: 4,
          borderRadius: 3,
          maxWidth: 400,
          mx: 'auto',
          mt: '10%',
          boxShadow: 6,
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#006916' }}>Editar Experiência</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Cargo"
              fullWidth
              sx={{ mb: 2 }}
              value={cargo}
              onChange={e => setCargo(e.target.value)}
              disabled={loading}
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
              InputLabelProps={{ shrink: true }}
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
              inputProps={{
                max: today,
                min: dtInicio || "1900-01-01"
              }}
              sx={{ mb: 2 }}
              disabled={loading}
              helperText="Deixe em branco se for sua experiência atual"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={onClose} color="green" disabled={loading}>Cancelar</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#006916', '&:hover': { bgcolor: '#004d12' } }} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Salvar"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}