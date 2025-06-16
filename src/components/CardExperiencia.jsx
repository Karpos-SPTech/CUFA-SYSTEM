import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, IconButton, CircularProgress, Snackbar, Alert } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModalAdicionarExperiencia from './ModalAdicionarExperiencia';
import ModalEditarExperiencia from './ModalEditarExperiencia';

export default function CardExperiencia() {
  const [experiencias, setExperiencias] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [experienciaEditando, setExperienciaEditando] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Função para buscar as experiências do backend
  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);

    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('token'); // Corrigido para 'userToken'

    if (!userId || !userToken) {
      setError(new Error("ID do usuário ou token não encontrado. Por favor, faça login."));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/experiencias/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Este cabeçalho é para a REQUISIÇÃO, não para a RESPOSTA
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (!response.ok) {
        let errorData = {};
        if (response.headers.get('Content-Type')?.includes('application/json')) {
            errorData = await response.json();
        }
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      // --- NOVA LÓGICA PARA TRATAR RESPOSTAS 2XX SEM JSON VÁLIDO ---
      const contentType = response.headers.get('Content-Type');
      let data = []; // Inicializa 'data' como um array vazio por padrão

      // Verifica se o cabeçalho Content-Type indica JSON
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json(); // Tenta parsear como JSON
        } catch (jsonParseError) {
          console.error("Erro ao parsear JSON da resposta:", jsonParseError);
          // Se houver um erro de parse, o corpo não era JSON válido. Trate como vazio.
          setSnackbarMessage('A resposta do servidor não é um JSON válido. Exibindo dados vazios.');
          setSnackbarSeverity('warning');
          setSnackbarOpen(true);
          data = []; // Força data como vazio em caso de JSON inválido
        }
      } else if (response.status === 204 || response.status === 200 && response.headers.get('Content-Length') === '0') {
          // Se for 204 No Content ou 200 OK com corpo vazio, trate como array vazio
          data = [];
      } else {
        // Se a resposta é OK mas não é JSON e não é 204/vazio, loga um aviso e trata como vazio
        console.warn('Requisição GET retornou OK mas sem conteúdo JSON esperado. Status:', response.status, 'Content-Type:', contentType);
        setSnackbarMessage('Requisição bem-sucedida, mas sem conteúdo válido. Exibindo dados vazios.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
        data = [];
      }
      // --- FIM DA NOVA LÓGICA ---

      setExperiencias(data); 
      console.log("Experiências carregadas:", data);

    } catch (err) {
      console.error("Erro ao carregar experiências:", err);
      setError(err);
      setSnackbarMessage(`Erro ao carregar experiências: ${err.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []); 

  const handleAddSuccess = () => {
    setOpenAddModal(false);
    fetchExperiences(); 
    setSnackbarMessage('Experiência adicionada com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleEditSuccess = () => {
    setOpenEditModal(false);
    fetchExperiences(); 
    setSnackbarMessage('Experiência editada com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleEditClick = (exp) => {
    setExperienciaEditando(exp);
    setOpenEditModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta experiência?");
    if (!confirmDelete) {
      return;
    }

    const userToken = localStorage.getItem('token');
    if (!userToken) {
      setSnackbarMessage('Sessão expirada. Faça login novamente.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/experiencias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      });

      if (!response.ok) {
        let errorData = {};
        if (response.headers.get('Content-Type')?.includes('application/json')) {
            errorData = await response.json();
        }
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }
      
      fetchExperiences();
      setSnackbarMessage('Experiência excluída com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (err) {
      console.error("Erro ao excluir experiência:", err);
      setSnackbarMessage(`Erro ao excluir experiência: ${err.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Função utilitária para camel case (primeira letra de cada palavra maiúscula)
  function toCamelCase(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <>
      <Card className="perfil-usuario-card" sx={{ borderRadius: 5, boxShadow: 4, background: '#fff', minHeight: 555, height: 555, position: 'relative', p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', maxWidth: '95%', width: '100%', mx: 'auto' }}>
        <CardContent sx={{ px: 4, pt: 3, pb: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: experiencias.length || loading || error ? 'flex-start' : 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', fontSize: 24 }}>Experiência</Typography>
            <Box>
              <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', mr: 1, boxShadow: 1 }} onClick={() => setOpenAddModal(true)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: experiencias.length || loading || error ? 'flex-start' : 'center', overflowY: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress size={40} color="success" />
                <Typography sx={{ mt: 2, color: '#006916' }}>Carregando experiências...</Typography>
              </Box>
            ) : error ? (
              <Typography variant="body2" color="error" sx={{ textAlign: 'center', mt: 2 }}>
                Erro ao carregar experiências: {error.message}. Por favor, tente novamente.
              </Typography>
            ) : experiencias.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mt: 2 }}>
                Nenhuma experiência cadastrada.
              </Typography>
            ) : (
              experiencias.map(exp => (
                <Card key={exp.id} sx={{ background: '#f9f9f9', p: 2, borderRadius: 2, boxShadow: 1, position: 'relative', minHeight: 70, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#333', fontSize: 16, wordBreak: 'break-word' }}>
                    {toCamelCase(exp.cargo)} no(a) {toCamelCase(exp.empresa)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: 14, wordBreak: 'break-word' }}>
                    {toCamelCase(exp.dtInicio)} - {exp.dtFim ? toCamelCase(exp.dtFim) : 'Atual'}
                  </Typography>
                  <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                    <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', boxShadow: 1 }} onClick={() => handleEditClick(exp)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#b71c1c', background: '#fbe9e7', boxShadow: 1 }} onClick={() => handleDelete(exp.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Card>
              ))
            )}
          </Box>
        </CardContent>
      </Card>

      <ModalAdicionarExperiencia
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onExperienceAdded={handleAddSuccess}
      />
      <ModalEditarExperiencia
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        experiencia={experienciaEditando}
        onEdit={handleEditSuccess}
      />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}