import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Box, Divider, Stack, Button, CircularProgress } from "@mui/material"; // Adicionado CircularProgress para o loading
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups";

export default function CardEsquerda({ showSaved, toggleShowSaved, savedCount }) {
  // Estados para as imagens de perfil e capa (mantidos do seu código original)
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

  // --- NOVOS ESTADOS PARA OS DADOS DO USUÁRIO E O STATUS DO FETCH ---
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para carregar as imagens de perfil e capa do localStorage (mantido)
  useEffect(() => {
    const saved = localStorage.getItem('profileImg');
    if (saved) setProfileImg(saved);
    const cover = localStorage.getItem('coverImg');
    if (cover) setCoverImg(cover);
  }, []);

  // --- NOVO useEffect para o fetch dos dados do usuário ---
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Inicia o carregamento
      setError(null);   // Limpa erros anteriores

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
            'Authorization': `Bearer ${token}` // Inclui o token JWT
          },
        });

        if (!response.ok) {
          // Lança um erro se a resposta não for bem-sucedida (status 4xx ou 5xx)
          const errorData = await response.json();
          throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data); // Define os dados do usuário no estado
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError(err); // Define o erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchUserData(); // Chama a função de fetch quando o componente monta
  }, []); // O array de dependências vazio significa que ele só roda uma vez ao montar

  // --- Renderização condicional baseada no estado de carregamento e erro ---
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

  // Se não houver erro e o carregamento terminou, mas userData ainda é null (ex: userId/token faltou e não tinha erro explícito)
  if (!userData) {
    return (
      <Box sx={{ maxWidth: 350, p: 2, border: '1px solid gray', borderRadius: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">Dados do perfil não disponíveis.</Typography>
      </Box>
    );
  }

  // Desestruturar os dados do usuário para fácil acesso
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
            {nome || "Nome do Usuário"} {/* Usa o nome do usuário do fetch */}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {biografia || "Nenhuma biografia informada."} {/* Usa a biografia do usuário */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(cidade && estado) ? `${cidade}, ${estado}` : "Localização não informada."} {/* Usa cidade e estado */}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          mt: 2,
          background: "#f8f8f8",
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <BookmarkIcon color="success" />
            <Typography variant="body2" fontWeight="medium">
              Itens salvos
            </Typography>
            <Button
              size="small"
              onClick={toggleShowSaved}
              sx={{ ml: 1, color: '#006916', fontWeight: 600 }}
            >
              {showSaved ? 'Ver todos' : 'Ver salvos'} ({savedCount})
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}