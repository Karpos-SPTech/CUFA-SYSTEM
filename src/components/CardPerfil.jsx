import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Avatar, IconButton, CircularProgress } from "@mui/material"; // Removidos Modal, TextField, Button
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CardPerfil({ profileImg, hover, onMouseEnter, onMouseLeave, onAvatarClick, onRemovePhoto, fileInputRef, onFileChange, coverImg, onCoverChange }) {
  const [cover, setCover] = useState(coverImg || null);

  // Estados para os dados do perfil (nome, estado, cidade) - BIOGRAFIA REMOVIDA
  const [profileData, setProfileData] = useState({
    nome: '',
    estado: '',
    cidade: '',
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);

  // Mensagens padrão
  const defaultLocationMessage = "Não informado";
  const defaultNameMessage = "Nome do Usuário"; // Mensagem padrão para o nome

  useEffect(() => {
    // Garante que a capa persista ao voltar para a tela
    if (!cover && localStorage.getItem('coverImg')) {
      setCover(localStorage.getItem('coverImg'));
    }

    // Função para buscar os dados do perfil (nome, estado, cidade)
    const fetchProfileData = async () => {
      setLoadingProfile(true);
      setProfileError(null);

      const userId = localStorage.getItem('userId');
      const userToken = localStorage.getItem('token');

      if (!userId || !userToken) {
        setProfileError(new Error("ID do usuário ou token não encontrado. Por favor, faça login."));
        setLoadingProfile(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/usuarios/${userId}`, {
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
        console.log("Dados do perfil (nome, estado, cidade) recebidos no CardPerfil:", data);

        setProfileData({
          nome: data.nome ?? '',
          estado: data.estado ?? '',
          cidade: data.cidade ?? '',
        });

      } catch (err) {
        console.error("Erro ao buscar dados do perfil no CardPerfil:", err);
        setProfileError(err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []); // Executa apenas uma vez ao montar o componente

  // Upload capa
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB
        alert('A imagem de capa deve ter no máximo 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCover(ev.target.result);
        if (onCoverChange) onCoverChange(ev.target.result);
        localStorage.setItem('coverImg', ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Card sx={{ borderRadius: 5, boxShadow: 4, background: 'transparent', position: 'relative', p: 0, overflow: 'hidden' }}>
        {/* Capa de perfil */}
        <Box sx={{ width: '100%', height: 174, position: 'relative', background: cover ? `url(${cover}) center/cover no-repeat` : 'linear-gradient(90deg, #e5eee3 0%, #b6e2c2 100%)' }}>
          <input type="file" accept="image/*" id="cover-upload" style={{ display: 'none' }} onChange={handleCoverUpload} />
          <IconButton
            component="label"
            htmlFor="cover-upload"
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.25)', color: '#fff', zIndex: 2 }}
          >
            <EditIcon />
            <input type="file" accept="image/*" hidden onChange={handleCoverUpload} />
          </IconButton>
          {cover && (
            <IconButton
              size="medium"
              sx={{ position: 'absolute', top: 8, right: 48, bgcolor: 'rgba(0,0,0,0.25)', color: '#fff', zIndex: 2, width: 40, height: 40, p: 1 }}
              onClick={() => { setCover(null); localStorage.removeItem('coverImg'); if (onCoverChange) onCoverChange(null); }}
            >
              <DeleteIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 2,
          px: 3,
          position: 'relative',
        }}>
          <Box
            sx={{
              position: 'relative',
              width: 110,
              height: 110,
              mt: -7,
              ml: 'auto',
              mr: 'auto',
              border: '6px solid #fff',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Avatar
              sx={{ width: 98, height: 98, boxShadow: 2, bgcolor: '#e3f2fd', cursor: 'pointer' }}
              src={profileImg || undefined}
              onClick={onAvatarClick}
            >
              {!profileImg && (
                <svg width="60" height="60" viewBox="0 0 40 40">
                  <circle cx="20" cy="14" r="10" fill="#90caf9" />
                  <ellipse cx="20" cy="32" rx="14" ry="8" fill="#e3f2fd" />
                </svg>
              )}
            </Avatar>
            {hover && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0,0,0,0.45)',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  cursor: 'pointer',
                }}
                onClick={onAvatarClick}
              >
                <EditIcon sx={{ color: '#fff', fontSize: 32, mb: profileImg ? 1 : 0 }} />
                <Typography sx={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Trocar foto</Typography>
                {profileImg && (
                  <IconButton
                    size="small"
                    sx={{ mt: 1, color: '#fff', bgcolor: 'rgba(0,0,0,0.25)' }}
                    onClick={e => { e.stopPropagation(); onRemovePhoto(); }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={onFileChange}
            />
          </Box>
        </Box>
        <CardContent sx={{ pt: 6, pb: 3, px: 5 }}>
          {loadingProfile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} color="success" />
              <Typography sx={{ ml: 2, color: '#006916' }}>Carregando dados...</Typography>
            </Box>
          ) : profileError ? (
            <Typography variant="body2" color="error" sx={{ textAlign: 'center', py: 2 }}>
              Erro ao carregar dados do perfil: {profileError.message}
            </Typography>
          ) : (
            <>
              {/* Nome do usuário */}
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#006916', mb: 0.5 }}>
                {profileData.nome || defaultNameMessage}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Localização (Cidade, Estado) */}
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15 }}>
                  {profileData.cidade || defaultLocationMessage}
                  {profileData.cidade && profileData.estado ? `, ` : ''}
                  {profileData.estado || (profileData.cidade ? defaultLocationMessage : '')} {/* Condicional para o estado se a cidade existir */}
                </Typography>
              </Box>

              {/* Seção Biografia (Sobre) - REMOVIDA */}
              {/* <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ color: '#333', mb: 1, fontWeight: 'bold' }}>
                  Sobre:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15 }}>
                  {profileData.biografia || defaultBiografiaMessage}
                </Typography>
                <IconButton
                  size="small"
                  sx={{ mt: 1, p: 0 }}
                  onClick={() => setOpenEditBio(true)}
                >
                  <EditIcon fontSize="small" sx={{ color: '#006916' }} />
                </IconButton>
              </Box> */}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}