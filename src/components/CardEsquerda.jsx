import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Box, Divider, Stack, Button, CircularProgress } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups"; // Ícone para vagas candidatadas (ou outro de sua preferência)
import SendIcon from '@mui/icons-material/Send'; // Outra opção de ícone para "candidatado"

export default function CardEsquerda({
  showSaved,
  toggleShowSaved,
  savedCount,
  // --- NOVAS PROPS ---
  showApplied,
  toggleShowApplied,
  appliedCount,
}) {
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('profileImg');
    if (saved) setProfileImg(saved);
    const cover = localStorage.getItem('coverImg');
    if (cover) setCoverImg(cover);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        setError(new Error("ID do usuário ou token não encontrado. Por favor, faça login."));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/usuarios/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 350, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress color="success" />
        <Typography sx={{ ml: 2, color: '#006916' }}>Carregando perfil...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 350, p: 2, border: '1px solid red', borderRadius: 3, textAlign: 'center' }}>
        <Typography color="error">Erro: {error.message}</Typography>
        <Typography variant="body2" color="text.secondary">Não foi possível carregar os dados do perfil.</Typography>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ maxWidth: 350, p: 2, border: '1px solid gray', borderRadius: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">Dados do perfil não disponíveis.</Typography>
      </Box>
    );
  }

  const { nome, estado, cidade, biografia } = userData;

  return (
    <Box sx={{ maxWidth: 350 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          overflow: "visible",
          background: '#fff',
          position: 'relative',
        }}
      >
        {/* Capa de perfil */}
        <Box sx={{ width: '100%', height: 120, position: 'relative', background: coverImg ? `url(${coverImg}) center/cover no-repeat` : "linear-gradient(180deg, #4CAF50 0%, #fff 80%)", borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden' }} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: -5 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              border: "4px solid #fff",
              boxShadow: 2,
              bgcolor: "#90caf9",
            }}
            src={profileImg || "src/assets/avatar1.png"}
          >
            {!profileImg && (
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="14" r="10" fill="#90caf9" />
                <ellipse cx="20" cy="32" rx="14" ry="8" fill="#e3f2fd" />
              </svg>
            )}
          </Avatar>
        </Box>
        <CardContent sx={{ pt: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "green", mb: 1, textTransform: "uppercase" }}
          >
            {nome || "Nome do Usuário"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {biografia || "Nenhuma biografia informada."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(cidade && estado) ? `${cidade}, ${estado}` : "Localização não informada."}
          </Typography>
        </CardContent>
      </Card>

      {/* Card de Itens Salvos */}
      <Card
        sx={{
          borderRadius: 3,
          height: 65,
          boxShadow: 1,
          mt: 2,
          background: "#f8f8f8",
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1}>
            <BookmarkIcon color="success" />
            <Typography variant="body2" fontWeight="medium">
              Vagas Salvas
            </Typography>
            <Button
              size="small"
              onClick={toggleShowSaved}
              sx={{ ml: 1, color: '#006916', fontWeight: 600 }}
            >
              {showSaved ? 'Ver todos' : `Ver salvos (${savedCount})`}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* --- NOVO CARD PARA VAGAS CANDIDATADAS --- */}
      <Card
        sx={{
          borderRadius: 3,
          height: 65,
          boxShadow: 1,
          mt: 2,
          background: "#f8f8f8",
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SendIcon color="success" /> {/* Ícone para vagas candidatadas */}
            <Typography variant="body2" fontWeight="medium">
              Candidaturas
            </Typography>
            <Button
              size="small"
              onClick={toggleShowApplied}
              sx={{ ml: 1, color: '#006916', fontWeight: 600 }}
            >
              {showApplied ? 'Ver todos' : `Ver candidaturas (${appliedCount})`}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}