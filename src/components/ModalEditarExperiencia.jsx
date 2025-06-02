import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material'; // Adicionado CircularProgress, Snackbar, Alert

export default function ModalEditarExperiencia({ open, onClose, experiencia, onEdit }) {
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [dtInicio, setDtInicio] = useState(''); // Renomeado para dtInicio
  const [dtFim, setDtFim] = useState('');       // Renomeado para dtFim

  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // useEffect para preencher os campos do formulário quando a prop 'experiencia' ou 'open' muda
  useEffect(() => {
    if (experiencia) {
      setCargo(experiencia.cargo || '');
      setEmpresa(experiencia.empresa || '');
      setDtInicio(experiencia.dtInicio || ''); // Usa dtInicio da prop
      setDtFim(experiencia.dtFim || '');       // Usa dtFim da prop
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
      dtFim: dtFim, // Inclui dtFim (pode ser null ou string vazia se o usuário remover/não preencher)
      // O fk_usuario não é enviado no body, conforme a regra estabelecida
    };

    console.log("Enviando dados da experiência para PUT:", updatedExperienceData);

    try {
      // Faz a requisição PUT para o endpoint com o ID da experiência
      const response = await fetch(`http://localhost:8080/experiencias/${experiencia.id}`, {
        method: 'PUT', // Método HTTP PUT para atualização
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
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


  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={{
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
            />
            <TextField
              label="Empresa"
              fullWidth
              sx={{ mb: 2 }}
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              disabled={loading}
            />
            <TextField
              label="Início" // Label permanece "Início" para o usuário
              fullWidth
              sx={{ mb: 2 }}
              value={dtInicio} // Estado é dtInicio
              onChange={e => setDtInicio(e.target.value)}
              placeholder="Ex: YYYY-MM-DD" // Sugestão de formato
              disabled={loading}
            />
            <TextField
              label="Fim" // Label permanece "Fim" para o usuário
              fullWidth
              sx={{ mb: 2 }}
              value={dtFim} // Estado é dtFim
              onChange={e => setDtFim(e.target.value)}
              placeholder="Ex: YYYY-MM-DD ou deixe vazio para 'Atual'" // Sugestão de formato
              disabled={loading}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={onClose} color="secondary" disabled={loading}>Cancelar</Button>
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