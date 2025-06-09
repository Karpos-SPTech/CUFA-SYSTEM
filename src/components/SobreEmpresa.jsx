import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import editIcon from '/src/assets/pencil-icon.svg';

const SobreEmpresa = () => {
  const [open, setOpen] = useState(false);
  const [biografia, setBiografia] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [editingBiografia, setEditingBiografia] = useState("");

  useEffect(() => {
    fetchBiografia();
  }, []);

  const fetchBiografia = async () => {
    try {
      const empresaId = localStorage.getItem("empresaId");
      if (!empresaId) {
        throw new Error("ID da empresa não encontrado");
      }

      const response = await fetch(
        `http://localhost:8080/empresas/${empresaId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar dados da empresa");
      }

      const empresaData = await response.json();
      console.log("Dados da empresa:", empresaData);
      setBiografia(empresaData.biografia || "Adicione uma biografia para sua empresa");
    } catch (err) {
      console.error("Erro ao buscar biografia:", err);
      setError("Não foi possível carregar a biografia");
    }
  };

  const handleOpen = () => {
    setEditingBiografia(biografia);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!editingBiografia.trim()) {
        throw new Error("A biografia não pode estar vazia");
      }

      const response = await fetch("http://localhost:8080/empresas/biografia", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          biografia: editingBiografia.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Erro ao atualizar biografia");
      }

      setBiografia(editingBiografia);
      setSnackbarMessage("Biografia atualizada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleClose();
    } catch (err) {
      console.error("Erro ao atualizar biografia:", err);
      setError("Não foi possível atualizar a biografia. Tente novamente.");
      setSnackbarMessage("Erro ao atualizar biografia");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            multiline
            rows={6}
            value={editingBiografia}
            onChange={(e) => setEditingBiografia(e.target.value)}
            placeholder="Digite a biografia da empresa"
            sx={{
              mb: 3,
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
            disabled={loading}
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
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Salvar alterações'}
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SobreEmpresa;
