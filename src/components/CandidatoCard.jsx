import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  Chip,
  IconButton,
  Link
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DescriptionIcon from '@mui/icons-material/Description';
import profileIcon from '../assets/profile-icon.png';
import DownloadIcon from '@mui/icons-material/Download';

const CandidatoCard = ({ candidato }) => {
  const handleWhatsAppClick = () => {
    // Remover caracteres não numéricos do telefone
    const phoneNumber = candidato.telefone.replace(/\D/g, '');
    // Criar URL para WhatsApp com o número de telefone
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    // Abrir em uma nova aba
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        p: 2.5,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)'
        },
        overflow: 'hidden'
      }}
    >
      {/* Cabeçalho com foto e informações básicas */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Avatar
          src={candidato.foto || profileIcon}
          alt={candidato.nome}
          sx={{
            width: 70,
            height: 70,
            mr: 2,
            border: '2px solid #E3EEE5'
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#006916',
              fontWeight: 'bold',
              fontSize: '18px',
              mb: 0.5,
              lineHeight: 1.2
            }}
          >
            {candidato.nome}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#555',
              mb: 0.5
            }}
          >
            {candidato.idade} anos
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontStyle: 'italic',
              fontSize: '12px',
              mb: 1
            }}
          >
            {candidato.resumo}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Informações de contato */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon sx={{ color: '#006916', mr: 1, fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#555', fontSize: '13px' }}>
            {candidato.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PhoneIcon sx={{ color: '#006916', mr: 1, fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: '#555', fontSize: '13px' }}>
            {candidato.telefone}
          </Typography>
        </Box>
      </Box>      {/* Experiência */}
      <Box sx={{ mb: 2, flex: 1 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BusinessCenterIcon sx={{ color: '#006916', mr: 1, fontSize: 18 }} />
            <Typography
              variant="body2"
              sx={{
                color: '#444',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Experiência
            </Typography>
          </Box>

          {candidato.experiencia.length > 3 && (
            <Typography
              variant="caption"
              sx={{
                color: '#006916',
                fontSize: '11px',
                fontStyle: 'italic'
              }}
            >
              {candidato.experiencia.length} Experiências
            </Typography>
          )}
        </Box>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            p: 1.5,
            maxHeight: '120px',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#006916',
              borderRadius: '10px',
            },
          }}
        >
          {candidato.experiencia.map((exp, index) => (
            <Box
              key={index}
              sx={{
                py: 0.5,
                px: 1,
                '&:not(:last-child)': {
                  borderBottom: '1px solid #eaeaea',
                  mb: 0.5
                },
                '&:hover': {
                  backgroundColor: '#f0f5f0',
                  borderRadius: '6px'
                }
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontSize: '13.2px',
                  whiteSpace: 'pre-line'
                }}
              >
                {exp}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Currículo */}
      <Box sx={{ mb: 1, flex: 1, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <DescriptionIcon sx={{ color: '#006916', mr: 1, fontSize: 18 }} />
          <Typography
            variant="body2"
            sx={{
              color: '#444',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Currículo
          </Typography>
        </Box>
        <Box sx={{ ml: 3.5 }}>
          {candidato.curriculo ? (
            <Link
              href={candidato.curriculo}
              rel="noopener"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#006916',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              <>
                <Typography variant="body2" sx={{ fontSize: '15px', mr: 0.5 }}>
                  Baixar Currículo Completo
                </Typography>
                <DownloadIcon fontSize="small" />
              </>
            </Link>
          ) : (
            <Typography variant="body2" sx={{ color: '#888', fontSize: '13px', fontStyle: 'italic' }}>
              Currículo não disponível
            </Typography>
          )}
        </Box>
      </Box>

      {/* Botão para entrar em contato via WhatsApp */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleWhatsAppClick}
        startIcon={<WhatsAppIcon />}
        sx={{
          mt: 2,
          backgroundColor: '#006916',
          color: '#fff',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#005713'
          }
        }}
      >
        Entrar em contato
      </Button>
    </Paper>
  );
};

export default CandidatoCard;
