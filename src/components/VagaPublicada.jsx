import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import mcdonaldsLogo from '../assets/microsoft-logo.png';
import editIcon from '../assets/edit-icon.png';
import empresaImageManager from '../utils/empresaImageManager';

const VagaPublicada = ({ vagaId = 1 }) => {
  const navigate = useNavigate();
  const [empresaLogo, setEmpresaLogo] = useState(null);
  
  useEffect(() => {
    // Carregar logo da empresa ao montar o componente
    const savedLogo = empresaImageManager.getProfileImage();
    if (savedLogo) {
      setEmpresaLogo(savedLogo);
    }

    // Escutar mudanças na logo da empresa
    const removeListener = empresaImageManager.addListener((imageType, imageData) => {
      if (imageType === 'profile') {
        setEmpresaLogo(imageData);
      }
    });

    // Cleanup: remover listener quando o componente for desmontado
    return removeListener;
  }, []);
  
  const handleVerCandidatos = () => {
    navigate(`/telaCandidatos?vagaId=${vagaId}`);
  };
  return (
    <Paper
      sx={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        p: 2,
        width: '100%',
        border: '1px solid #ddd',
        position: 'relative'
      }}
    >
      {/* Header com Logo e Informações */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Box
          component="img"
          src={empresaLogo || mcdonaldsLogo}
          alt="MC Donald's Logo"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: '#006916',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            MC Donald's
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#666', fontSize: '12px' }}
          >
            Fast Food
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#666', fontSize: '12px' }}
          >
            CLT
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#666', fontSize: '12px' }}
          >
            Há 7 horas
          </Typography>
        </Box>
        {/* Ícone de Editar */}        <Box
          component="img"
          src={editIcon}
          alt="Editar"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            cursor: 'pointer',
            width: 24,
            height: 24
          }}
        />
      </Box>

      {/* Conteúdo Principal */}      <Typography
        variant="h6"
        align="center"
        sx={{
          color: '#006916',
          fontSize: '16px',
          fontWeight: 'bold',
          mb: 2,
          mt: 2,
          width: '100%'
        }}
      >
        Título da publicação
      </Typography>

      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          p: 2
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: '#444',
            fontSize: '14px',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          • Vaga oferecida pela empresa
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontSize: '14px',
            mb: 2
          }}
        >
          Descrição da empresa - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae provident unde accusantium quidem eos non explicabo suscipit. Quidem, quisquam obcaecati, sunt magnam repellendus libero itaque nihil eaque architecto, cum pariatur?
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: '#444',
            fontSize: '14px',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          • O que o usuário irá realizar:
        </Typography>

        <List sx={{ pl: 4, mb: 2 }}>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Função 1
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Função 2
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Função 3
            </Typography>
          </ListItem>
        </List>

        <Typography
          variant="subtitle1"
          sx={{
            color: '#444',
            fontSize: '14px',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          • Benefícios:
        </Typography>

        <List sx={{ pl: 4, mb: 2 }}>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Vale-refeição ou alimentação
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Plano de saúde e odontológico
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Vale transporte
            </Typography>
          </ListItem>
        </List>

        <Typography
          variant="body2"
          sx={{
            color: '#666',
            fontSize: '14px',
            fontStyle: 'italic',
            mb: 2
          }}
        >
          Frase atrativa para chamar a atenção do usuário !!
        </Typography>
      </Box>

      {/* Botão Ver Candidatos */}
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleVerCandidatos}
          sx={{
            backgroundColor: '#006916',
            color: '#fff',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#005713'
            }
          }}
        >
          VER CANDIDATOS
        </Button>
      </Box>
    </Paper>
  );
};

export default VagaPublicada;