import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, List, ListItem, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import mcdonaldsLogo from '../assets/microsoft-logo.png';
import empresaImageManager from '../utils/empresaImageManager';
import AnunciarVaga from './AnunciarVaga';

const VagaPublicada = () => {
  const navigate = useNavigate();
  const [empresaLogo, setEmpresaLogo] = useState(null);
  const [publicacoes, setPublicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [publicacaoParaEditar, setPublicacaoParaEditar] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    publicacaoId: null,
    titulo: ''
  });

  const formatarTempoPublicacao = (dtPublicacao) => {
    const publicacao = new Date(dtPublicacao);
    const agora = new Date();
    const diff = agora - publicacao;
    const horas = Math.floor(diff / (1000 * 60 * 60));
    
    if (horas < 1) return 'Agora mesmo';
    if (horas === 1) return 'Há 1 hora';
    if (horas < 24) return `Há ${horas} horas`;
    
    const dias = Math.floor(horas / 24);
    if (dias === 1) return 'Há 1 dia';
    return `Há ${dias} dias`;
  };

  const formatarDescricao = (descricao) => {
    if (!descricao) return { descricaoGeral: '', funcoes: [], beneficios: [], fraseAtrativa: '' };

    const secoes = descricao.split('\n\n');
    let resultado = {
      descricaoGeral: '',
      funcoes: [],
      beneficios: [],
      fraseAtrativa: ''
    };

    // Primeira seção é sempre a descrição geral
    if (secoes.length > 0) {
      resultado.descricaoGeral = secoes[0].trim();
    }

    secoes.forEach(secao => {
      if (secao.startsWith('O que o contratado irá realizar:')) {
        resultado.funcoes = secao
          .split('\n')
          .slice(1) // Remove o título da seção
          .filter(item => item.trim().startsWith('•'))
          .map(item => item.trim());
      } else if (secao.startsWith('Benefícios:')) {
        resultado.beneficios = secao
          .split('\n')
          .slice(1)
          .filter(item => item.trim().startsWith('•'))
          .map(item => item.trim());
      } else if (secao.startsWith('Frase atrativa:')) {
        resultado.fraseAtrativa = secao
          .replace('Frase atrativa:', '')
          .trim();
      }
    });

    return resultado;
  };
  
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
  
  const fetchPublicacao = async () => {
    try {
      const empresaId = localStorage.getItem("empresaId");
      if (!empresaId) throw new Error("ID da empresa não encontrado");

      console.log("[Debug] Buscando publicações para empresa:", empresaId);
      const response = await fetch("http://localhost:8080/publicacao", {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar publicações: ${response.status}`);
      }

      const data = await response.json();
      console.log("[Debug] Publicações recebidas:", JSON.stringify(data, null, 2));
      
      if (Array.isArray(data) && data.length > 0) {
        // Ordenamos por data de publicação decrescente
        const publicacoesSorted = [...data].sort((a, b) => 
          new Date(b.dtPublicacao) - new Date(a.dtPublicacao)
        );
        setPublicacoes(publicacoesSorted);
      } else {
        setPublicacoes([]);
      }
    } catch (err) {
      console.error("Erro ao buscar publicações:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicacao();
  }, []);

  const handleVerCandidatos = (idPublicacao) => {
    navigate(`/telaCandidatos?vagaId=${idPublicacao}`);
  };

  const handleDeleteClick = (publicacao) => {
    setDeleteDialog({
      open: true,
      publicacaoId: publicacao.idPublicacao,
      titulo: publicacao.titulo
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      publicacaoId: null,
      titulo: ''
    });
  };

  const handleDeletarPublicacao = async () => {
    try {
      const response = await fetch(`http://localhost:8080/publicacao/${deleteDialog.publicacaoId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar publicação: ${response.status}`);
      }

      // Atualiza a lista de publicações após deletar
      fetchPublicacao();
      handleCloseDeleteDialog();
    } catch (err) {
      console.error("Erro ao deletar publicação:", err);
      setError(err.message);
    }
  };

  const handleEditClick = (publicacao) => {
    setPublicacaoParaEditar(publicacao);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setPublicacaoParaEditar(null);
  };

  if (loading) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Carregando publicações...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">Erro ao carregar publicações: {error}</Typography>
      </Paper>
    );
  }

  if (publicacoes.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Nenhuma publicação encontrada.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {publicacoes.map((publicacao) => {
          const secoes = formatarDescricao(publicacao.descricao);
          
          return (
            <Paper
              key={publicacao.idPublicacao}
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
                  alt="Logo da Empresa"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#006916',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    {publicacao.nomeEmpresa || 'Empresa'}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#444',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      mt: 0.5
                    }}
                  >
                    {publicacao.titulo || 'Título não disponível'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#666', fontSize: '12px' }}
                  >
                    {publicacao.tipoContrato || 'Não especificado'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#666', fontSize: '12px' }}
                  >
                    {publicacao.dtPublicacao ? formatarTempoPublicacao(publicacao.dtPublicacao) : 'Data não disponível'}
                  </Typography>
                </Box>
                <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => handleEditClick(publicacao)}
                    sx={{
                      color: '#006916',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 105, 22, 0.1)'
                      }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(publicacao)}
                    sx={{
                      color: '#006916',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 105, 22, 0.1)'
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Conteúdo da Vaga */}
              <Box
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  p: 2,
                  mt: 2
                }}
              >
                {/* Descrição Geral */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: '#444',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  Sobre a vaga
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '14px',
                    mb: 2
                  }}
                >
                  {secoes.descricaoGeral || 'Descrição não disponível'}
                </Typography>

                {/* Funções */}
                {secoes.funcoes.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#444',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      O que o contratado irá realizar:
                    </Typography>
                    <List>
                      {secoes.funcoes.map((funcao, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {funcao}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Benefícios */}
                {secoes.beneficios.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#444',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      Benefícios:
                    </Typography>
                    <List>
                      {secoes.beneficios.map((beneficio, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {beneficio}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Frase Atrativa */}
                {secoes.fraseAtrativa && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#006916',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      mt: 2,
                      fontStyle: 'italic'
                    }}
                  >
                    {secoes.fraseAtrativa}
                  </Typography>
                )}
              </Box>

              {/* Botão Ver Candidatos */}
              <Box sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleVerCandidatos(publicacao.idPublicacao)}
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
        })}
      </Box>

      {/* Modal de Edição */}
      {editModalOpen && (
        <AnunciarVaga
          isEdit={true}
          open={editModalOpen}
          onClose={handleCloseEditModal}
          publicacaoParaEditar={publicacaoParaEditar}
          onSave={() => {
            handleCloseEditModal();
            fetchPublicacao();
          }}
        />
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir a vaga "{deleteDialog.titulo}"? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDeleteDialog}
            sx={{ 
              color: '#666',
              '&:hover': {
                backgroundColor: 'rgba(102, 102, 102, 0.1)'
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeletarPublicacao}
            color="error"
            variant="contained"
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VagaPublicada;