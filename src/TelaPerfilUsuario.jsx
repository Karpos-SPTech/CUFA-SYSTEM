import React from "react";
import Header from "./components/Header";
import { Card, CardContent, Typography, Box, Avatar, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

export default function TelaPerfilUsuario() {
  return (
    <Box sx={{ background: '#e5eee3', minHeight: '100vh', width: '100vw', pb: 6 }}>
      <Header />
      <Box sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start',
        gap: 4, pt: 14, px: 2
      }}>
        {/* Perfil principal */}
        <Box sx={{ flex: 2, maxWidth: 700 }}>
          <Card sx={{ borderRadius: 5, boxShadow: 4, mb: 4, background: '#fff', minHeight: 260, position: 'relative', p: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', background: '#6db187', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 90, pl: 4, pr: 2, position: 'relative' }}>
              <Avatar sx={{ width: 110, height: 110, border: '6px solid #fff', mt: 7, boxShadow: 2, bgcolor: '#e3f2fd' }} src="/src/assets/avatar1.png" />
              <IconButton sx={{ ml: 'auto', mt: 1, color: '#fff', background: 'rgba(0,0,0,0.08)' }}><EditIcon /></IconButton>
            </Box>
            <CardContent sx={{ pt: 6, pb: 3, px: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#006916', mb: 0.5 }}>GUILHERME SILVA</Typography>
              <Typography variant="body1" sx={{ color: '#333', mb: 2, fontSize: 18 }}>Biografia do usuário</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 15 }}>São Paulo, SP</Typography>
            </CardContent>
            <IconButton sx={{ position: 'absolute', right: 24, bottom: 24, color: '#006916', background: '#e5eee3', boxShadow: 1 }}><EditIcon /></IconButton>
          </Card>
          <Card sx={{ borderRadius: 5, boxShadow: 4, background: '#fff', mb: 4, position: 'relative', p: 0 }}>
            <CardContent sx={{ px: 5, py: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', mb: 1, fontSize: 20 }}>Sobre</Typography>
              <Typography variant="body1" sx={{ color: '#333', fontSize: 17 }}>
                Experiência como ajudante de obras, serviços gerais e entregas. Sempre disposto a aprender e crescer profissionalmente.
              </Typography>
            </CardContent>
            <IconButton sx={{ position: 'absolute', right: 24, top: 24, color: '#006916', background: '#e5eee3', boxShadow: 1 }}><EditIcon /></IconButton>
          </Card>
        </Box>
        {/* Coluna lateral direita */}
        <Box sx={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Card sx={{ borderRadius: 5, boxShadow: 4, background: '#fff', mb: 4, minHeight: 180, position: 'relative', p: 0 }}>
            <CardContent sx={{ px: 4, pt: 3, pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', fontSize: 20 }}>Experiência</Typography>
                <Box>
                  <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', mr: 1, boxShadow: 1 }}><AddIcon /></IconButton>
                  <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', boxShadow: 1 }}><EditIcon /></IconButton>
                </Box>
              </Box>
              <Box sx={{ maxHeight: 110, overflowY: 'auto', pr: 1 }}>
                <Box sx={{ border: '2px solid #006916', borderRadius: 3, p: 1.5, mb: 1, display: 'flex', flexDirection: 'column', gap: 0.5, background: '#f8f8f8' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#006916', fontSize: 16 }}>Vaga</Typography>
                  <Typography sx={{ fontSize: 14 }}>Empresa</Typography>
                  <Typography sx={{ fontSize: 13, color: '#888' }}>Cidade, estado</Typography>
                  <Typography sx={{ fontSize: 13, color: '#888' }}>Tempo - tempo</Typography>
                </Box>
                <Box sx={{ border: '2px solid #006916', borderRadius: 3, p: 1.5, mb: 1, display: 'flex', flexDirection: 'column', gap: 0.5, background: '#f8f8f8' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#006916', fontSize: 16 }}>Vaga</Typography>
                  <Typography sx={{ fontSize: 14 }}>Empresa</Typography>
                  <Typography sx={{ fontSize: 13, color: '#888' }}>Cidade, estado</Typography>
                  <Typography sx={{ fontSize: 13, color: '#888' }}>Tempo - tempo</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 5, boxShadow: 4, background: '#fff', minHeight: 180, position: 'relative', p: 0 }}>
            <CardContent sx={{ px: 4, pt: 3, pb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', mb: 1, fontSize: 20 }}>Currículo</Typography>
              <Box sx={{ background: '#f3f6ee', borderRadius: 3, p: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#333', fontSize: 15 }}>
                  <b>Nome:</b> Lorem Ipsum<br />
                  <b>Contato:</b> loremipsum@email.com / (11) 99999-9999<br />
                  <br />
                  <b>Resumo:</b><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                  <br />
                  <b>Habilidades:</b><br />
                  - Lorem Ipsum Dolor<br />
                  - Adipiscing elit. Integer<br />
                  <br />
                  <b>Experiência:</b><br />
                  - Empresa X (2021-Atual) <br />
                  - Cargo: Auxiliar de obras<br />
                  <br />
                  <b>Educação:</b><br />
                  - Lorem Ipsum University (2015 - 2021)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                <IconButton sx={{ color: '#006916', background: '#e5eee3', boxShadow: 1 }}><EditIcon /></IconButton>
                <button style={{ background: '#006916', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 6px #00691622' }}>Anexar</button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
