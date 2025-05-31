import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Avatar, IconButton, Modal, TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CardPerfil({ profileImg, hover, onMouseEnter, onMouseLeave, onAvatarClick, onRemovePhoto, fileInputRef, onFileChange, coverImg, onCoverChange }) {
  const [bio, setBio] = useState('Biografia do usuário');
  const [openEditBio, setOpenEditBio] = useState(false);
  const [bioDraft, setBioDraft] = useState(bio);
  const [cover, setCover] = useState(coverImg || null);

  useEffect(() => {
    // Garante que a capa persista ao voltar para a tela
    if (!cover) {
      const savedCover = localStorage.getItem('coverImg');
      if (savedCover) setCover(savedCover);
    }
  }, []);

  const handleSaveBio = () => {
    setBio(bioDraft);
    setOpenEditBio(false);
  };

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
        <Box sx={{ width: '100%', height: 120, position: 'relative', background: cover ? `url(${cover}) center/cover no-repeat` : 'linear-gradient(90deg, #e5eee3 0%, #b6e2c2 100%)' }}>
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
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#006916', mb: 0.5 }}>GUILHERME SILVA</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" sx={{ color: '#333', mb: 2, fontSize: 18, flex: 1 }}>{bio}</Typography>
            <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', boxShadow: 1 }} onClick={() => { setBioDraft(bio); setOpenEditBio(true); }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15 }}>São Paulo, SP</Typography>
        </CardContent>
      </Card>
      <Modal open={openEditBio} onClose={() => setOpenEditBio(false)}>
        <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 3, maxWidth: 400, mx: 'auto', mt: '10%', boxShadow: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#006916' }}>Editar Biografia</Typography>
          <TextField
            label="Biografia"
            fullWidth
            multiline
            minRows={3}
            value={bioDraft}
            onChange={e => setBioDraft(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={() => setOpenEditBio(false)} color="secondary">Cancelar</Button>
            <Button variant="contained" sx={{ bgcolor: '#006916' }} onClick={handleSaveBio}>Salvar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
