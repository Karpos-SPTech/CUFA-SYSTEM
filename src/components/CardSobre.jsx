import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, IconButton, Modal, TextField, Button, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function CardSobre() {
  const [biografia, setBiografia] = useState(''); // O estado principal para a biografia
  const [openEdit, setOpenEdit] = useState(false); // Para controlar o modal de edição
  const [biografiaDraft, setBiografiaDraft] = useState(''); // O rascunho enquanto edita
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const [isSaving, setIsSaving] = useState(false); // Estado para o salvamento
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Mensagem padrão para a biografia
  const defaultBiografiaMessage = "Nenhuma biografia informada.";

  // Função utilitária para camel case (primeira letra de cada palavra maiúscula)
  function toCamelCase(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  useEffect(() => {
    const fetchBiografia = async () => {
      setLoading(true);
      setError(null);

      const userId = localStorage.getItem('userId');
      const userToken = localStorage.getItem('token');

      if (!userId || !userToken) {
        setError(new Error("Usuário não autenticado. Por favor, faça login."));
        setLoading(false);
        // Em um cenário real, você pode querer redirecionar para o login aqui
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Biografia recebida no CardSobre:", data.biografia);

        // Define a biografia principal e o rascunho com o valor do backend
        setBiografia(data.biografia ?? '');
        setBiografiaDraft(data.biografia ?? '');

      } catch (err) {
        console.error("Erro ao buscar biografia:", err);
        setError(err);
        setSnackbarMessage(`Erro ao carregar biografia: ${err.message}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBiografia();
  }, []); // O array de dependências vazio faz com que o useEffect execute apenas uma vez (no mount)

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('token');

    if (!userId || !userToken) {
      setError(new Error("Sessão expirada. Não foi possível salvar a biografia."));
      setIsSaving(false);
      setSnackbarMessage("Sessão expirada. Por favor, faça login novamente.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setOpenEdit(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
        method: 'PUT', // Usamos PUT para atualizar o recurso
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ biografia: biografiaDraft }) // Enviamos apenas a biografia
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      // Se a resposta for 204 No Content, não haverá body para parsear
      if (response.status !== 204) {
         await response.json(); // Consumir o body, mesmo que seja vazio
      }


      setBiografia(biografiaDraft); // Atualiza o estado principal com o rascunho salvo
      setOpenEdit(false); // Fecha o modal
      setSnackbarMessage("Biografia salva com sucesso!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (err) {
      console.error("Erro ao salvar biografia:", err);
      setError(err);
      setSnackbarMessage(`Erro ao salvar biografia: ${err.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card className="perfil-usuario-card" sx={{ flex: 1, borderRadius: 5, boxShadow: 4, background: '#fff', minHeight: 180, position: 'relative', p: 0 }}>
        <CardContent sx={{ px: 5, py: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', fontSize: 20 }}>Sobre</Typography>
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
              <CircularProgress size={24} color="success" />
              <Typography sx={{ ml: 2, color: '#006916' }}>Carregando biografia...</Typography>
            </Box>
          ) : error && !biografia ? ( // Mostra erro apenas se não houver biografia para exibir
            <Typography variant="body2" color="error" sx={{ fontSize: 15, textAlign: 'center' }}>
              {error.message}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ color: '#333', fontSize: 17, whiteSpace: 'pre-wrap' }}>
              {toCamelCase(biografia) || defaultBiografiaMessage}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}