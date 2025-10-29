import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, Typography, Box, IconButton, CircularProgress, Snackbar, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

export default function CardCurriculo({ curriculoInputRef, handleCurriculoClick }) {
  const [curriculoUrl, setCurriculoUrl] = useState('');
  const [curriculoFileNameDisplay, setCurriculoFileNameDisplay] = useState('');

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('token');

  const extractOriginalFileNameFromUrl = (url) => {
    if (!url) return '';
    try {
      const parts = url.split('/');
      const fullFileNameWithUuid = parts[parts.length - 1];

      const uuidLength = 36;
      const separatorLength = 1;
      const prefixLength = uuidLength + separatorLength;

      if (fullFileNameWithUuid && fullFileNameWithUuid.length > prefixLength && fullFileNameWithUuid.charAt(uuidLength) === '-') {
        return fullFileNameWithUuid.substring(prefixLength);
      }
      return fullFileNameWithUuid;
    } catch (e) {
      console.error("Erro ao extrair nome original da URL:", e);
      return url;
    }
  };

  const fetchCurriculoUrl = async () => {
    setLoading(true);
    setError(null);
    if (!userId || !userToken) {
      setError(new Error("Usuário não autenticado. Por favor, faça login."));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const userData = await response.json();
      const fetchedCurriculoUrl = userData.curriculoUrl;

      setCurriculoUrl(fetchedCurriculoUrl || '');
      setCurriculoFileNameDisplay(extractOriginalFileNameFromUrl(fetchedCurriculoUrl));

    } catch (err) {
      console.error("Erro ao buscar currículo URL:", err);
      setError(err);
      setSnackbarMessage(`Erro ao buscar currículo: ${err.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculoUrl();
  }, [userId, userToken]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSnackbarMessage('O arquivo deve ter no máximo 5MB.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!userToken || !userId) {
      setSnackbarMessage("Usuário não autenticado.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}/curriculo/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${userToken}`
          // Content-Type para FormData é automaticamente definido pelo navegador
        }
      });

      if (response.ok) {
        const newCurriculoUrl = await response.text();
        setCurriculoUrl(newCurriculoUrl);
        setCurriculoFileNameDisplay(extractOriginalFileNameFromUrl(newCurriculoUrl));
        setSnackbarMessage("Currículo enviado e associado com sucesso!");
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        const errorText = await response.text();
        setSnackbarMessage(`Erro ao enviar currículo: ${errorText}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Erro de rede ao enviar currículo:", err);
      setSnackbarMessage("Erro de rede ao enviar currículo.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const handleDelete = async () => {
    if (!curriculoUrl) {
      setSnackbarMessage("Nenhum currículo para excluir.");
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    if (!userToken || !userId) {
      setSnackbarMessage("Usuário não autenticado para excluir.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o currículo "${curriculoFileNameDisplay}"?`);
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}/curriculo/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        setCurriculoUrl('');
        setCurriculoFileNameDisplay('');
        setSnackbarMessage("Currículo excluído com sucesso!");
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        const errorText = await response.text();
        setSnackbarMessage(`Erro ao excluir currículo: ${errorText}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Erro de rede ao excluir currículo:", err);
      setSnackbarMessage("Erro de rede ao excluir currículo.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

const handleDownload = async () => {
  if (!curriculoUrl) {
    setSnackbarMessage("Nenhum currículo para baixar.");
    setSnackbarSeverity('warning');
    setSnackbarOpen(true);
    return;
  }

  if (!userToken) {
    setSnackbarMessage("Usuário não autenticado para baixar.");
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
    return;
  }

  try {
    const response = await fetch(curriculoUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Erro HTTP: ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = curriculoFileNameDisplay || 'curriculo.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.error("Erro ao fazer download do currículo:", err);
    setSnackbarMessage(`Erro ao fazer download: ${err.message}`);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
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
        <CardContent sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', mb: 1, fontSize: 20 }}>Currículo</Typography>
          {!loading && !error && !curriculoUrl && (
            <Typography variant="body2" sx={{ color: '#888', fontSize: 14, mt: 1, mb: 1 }}>
              Nenhum currículo anexado.
            </Typography>
          )}
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <CircularProgress size={20} color="success" />
              <Typography sx={{ ml: 1, color: '#006916' }}>Carregando currículo...</Typography>
            </Box>
          ) : error ? (
            <Typography variant="body2" color="error" sx={{ fontSize: 14, mt: 1 }}>
              Erro: {error.message}
            </Typography>
          ) : curriculoUrl && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#333', fontSize: 15, fontWeight: 500, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 1 }} title={curriculoFileNameDisplay}>
                {curriculoFileNameDisplay}
              </Typography>

            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
            <input
              id="curriculo-upload"
              type="file"
              accept="application/pdf,.doc,.docx"
              style={{ display: 'none' }}
              ref={curriculoInputRef}
              onChange={handleFileUpload}
            />
            <button
              type="button"
              style={{
                background: '#006916', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px',
                fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 6px #00691622',
                opacity: isUploading ? 0.7 : 1,
                pointerEvents: isUploading ? 'none' : 'auto',
              }}
              onClick={handleCurriculoClick}
              disabled={isUploading || loading}
            >
              {isUploading ? <CircularProgress size={18} color="inherit" /> : (curriculoUrl ? 'Trocar currículo' : 'Anexar currículo')}
            </button>
            <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', boxShadow: 1 }} onClick={handleDownload}>
              <DownloadIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: '#b71c1c', background: '#fbe9e7', boxShadow: 1 }} onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>

          </Box>
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