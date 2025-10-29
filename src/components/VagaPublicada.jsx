import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

  // PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const vagasPorPagina = 5;
  const totalPages = Math.ceil(publicacoes.length / vagasPorPagina);
  const indexUltimaVaga = currentPage * vagasPorPagina;
  const indexPrimeiraVaga = indexUltimaVaga - vagasPorPagina;
  const vagasAtuais = publicacoes.slice(indexPrimeiraVaga, indexUltimaVaga);

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
    let resultado = { descricaoGeral: '', funcoes: [], beneficios: [], fraseAtrativa: '' };
    if (secoes.length > 0) resultado.descricaoGeral = secoes[0].trim();
    secoes.forEach(secao => {
      if (secao.startsWith('O que o contratado irá realizar:')) {
        resultado.funcoes = secao.split('\n').slice(1).filter(item => item.trim().startsWith('•')).map(item => item.trim());
      } else if (secao.startsWith('Benefícios:')) {
        resultado.beneficios = secao.split('\n').slice(1).filter(item => item.trim().startsWith('•')).map(item => item.trim());
      } else if (secao.startsWith('Frase atrativa:')) {
        resultado.fraseAtrativa = secao.replace('Frase atrativa:', '').trim();
      }
    });
    return resultado;
  };

  useEffect(() => {
    const savedLogo = empresaImageManager.getProfileImage();
    if (savedLogo) setEmpresaLogo(savedLogo);
    const removeListener = empresaImageManager.addListener((imageType, imageData) => {
      if (imageType === 'profile') setEmpresaLogo(imageData);
    });
    return removeListener;
  }, []);

  const fetchPublicacao = async () => {
    try {
      const empresaId = localStorage.getItem("empresaId");
      if (!empresaId) throw new Error("ID da empresa não encontrado");

      const response = await fetch("/publicacao", {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Erro ao buscar publicações: ${response.status}`);

      const data = await response.json();
      const sorted = [...data].sort((a, b) => new Date(b.dtPublicacao) - new Date(a.dtPublicacao));
      setPublicacoes(sorted);
    } catch (err) {
      console.error("Erro ao buscar publicações:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPublicacao(); }, []);

  const handleVerCandidatos = (idPublicacao) => navigate(`/telaCandidatos?vagaId=${idPublicacao}`);

  const handleDeleteClick = (publicacao) => setDeleteDialog({ open: true, publicacaoId: publicacao.idPublicacao, titulo: publicacao.titulo });
  const handleCloseDeleteDialog = () => setDeleteDialog({ open: false, publicacaoId: null, titulo: '' });
  const handleDeletarPublicacao = async () => {
    try {
      const response = await fetch(`/publicacao/${deleteDialog.publicacaoId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Erro ao deletar publicação: ${response.status}`);
      fetchPublicacao();
      handleCloseDeleteDialog();
    } catch (err) { console.error(err); setError(err.message); }
  };

  const handleEditClick = (publicacao) => { setPublicacaoParaEditar(publicacao); setEditModalOpen(true); };
  const handleCloseEditModal = () => { setEditModalOpen(false); setPublicacaoParaEditar(null); };

  const handlePageChange = (novaPagina) => {
    setCurrentPage(novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // sobe a página inteira
  };

  if (loading) return <Paper sx={{ p: 2, textAlign: 'center' }}><Typography>Carregando publicações...</Typography></Paper>;
  if (error) return <Paper sx={{ p: 2, textAlign: 'center' }}><Typography color="error">Erro ao carregar publicações: {error}</Typography></Paper>;
  if (publicacoes.length === 0) return <Paper sx={{ p: 2, textAlign: 'center' }}><Typography>Nenhuma publicação encontrada.</Typography></Paper>;

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {vagasAtuais.map((publicacao) => {
          const secoes = formatarDescricao(publicacao.descricao);
          return (
            <Paper key={publicacao.idPublicacao} sx={{ backgroundColor: '#fff', borderRadius: '10px', p: 2, width: '100%', border: '1px solid #ddd', position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                {empresaLogo ? (
                  <Box component="img" src={empresaLogo} alt="Logo da Empresa" sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }} />
                ) : (
                  <Box component="svg" width={70} height={70} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                    <rect width="60" height="60" fill="#006916" rx="4" ry="4" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="24" fill="white" fontFamily="Arial, sans-serif">
                      {publicacao.nomeEmpresa?.charAt(0).toUpperCase() || "?"}
                    </text>
                  </Box>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#006916', fontSize: '16px', fontWeight: 'bold' }}>{publicacao.nomeEmpresa || 'Empresa'}</Typography>
                  <Typography variant="h6" sx={{ color: '#444', fontSize: '14px', fontWeight: 'bold', mt: 0.5 }}>{publicacao.titulo || 'Título não disponível'}</Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '12px' }}>{publicacao.tipoContrato || 'Não especificado'}</Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '12px' }}>{publicacao.dtPublicacao ? formatarTempoPublicacao(publicacao.dtPublicacao) : 'Data não disponível'}</Typography>
                </Box>
                <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleEditClick(publicacao)} sx={{ color: '#006916', '&:hover': { backgroundColor: 'rgba(0, 105, 22, 0.1)' } }}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(publicacao)} sx={{ color: '#006916', '&:hover': { backgroundColor: 'rgba(0, 105, 22, 0.1)' } }}><DeleteIcon /></IconButton>
                </Box>
              </Box>

              <Box sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', p: 2, mt: 2 }}>
                <Typography variant="subtitle1" sx={{ color: '#444', fontSize: '14px', fontWeight: 'bold', mb: 1 }}>Sobre a vaga</Typography>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '14px', mb: 2 }}>{secoes.descricaoGeral || 'Descrição não disponível'}</Typography>

                {secoes.funcoes.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#444', fontSize: '14px', fontWeight: 'bold', mb: 1 }}>O que o contratado irá realizar:</Typography>
                    <List>{secoes.funcoes.map((funcao, index) => <ListItem key={index} sx={{ py: 0.5 }}><Typography variant="body2" sx={{ color: '#666' }}>{funcao}</Typography></ListItem>)}</List>
                  </Box>
                )}

                {secoes.beneficios.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#444', fontSize: '14px', fontWeight: 'bold', mb: 1 }}>Benefícios:</Typography>
                    <List>{secoes.beneficios.map((beneficio, index) => <ListItem key={index} sx={{ py: 0.5 }}><Typography variant="body2" sx={{ color: '#666' }}>{beneficio}</Typography></ListItem>)}</List>
                  </Box>
                )}

                {secoes.fraseAtrativa && (
                  <Typography variant="body2" sx={{ color: '#006916', fontSize: '14px', fontWeight: 'bold', mt: 2, fontStyle: 'italic' }}>{secoes.fraseAtrativa}</Typography>
                )}
              </Box>

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
                    '&:hover': { backgroundColor: '#005713' }
                  }}
                >
                  VER CANDIDATOS
                </Button>
              </Box>
            </Paper>
          );
        })}
      </Box>

      {/* Paginação */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            sx={{
              backgroundColor: currentPage === i + 1 ? '#006916' : '#f5f5f5',
              color: currentPage === i + 1 ? '#fff' : '#006916',
              border: '1px solid #006916',
              borderRadius: '5px',
              fontWeight: 'bold',
              minWidth: 35,
              '&:hover': { backgroundColor: '#005713', color: '#fff' }
            }}
          >
            {i + 1}
          </Button>
        ))}
      </Box>

      {/* Modais */}
      {editModalOpen && <AnunciarVaga isEdit={true} open={editModalOpen} onClose={handleCloseEditModal} publicacaoParaEditar={publicacaoParaEditar} onSave={() => { handleCloseEditModal(); fetchPublicacao(); }} />}
      <Dialog open={deleteDialog.open} onClose={handleCloseDeleteDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir a vaga "{deleteDialog.titulo}"? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} sx={{ color: '#666', '&:hover': { backgroundColor: 'rgba(102, 102, 102, 0.1)' } }}>Cancelar</Button>
          <Button onClick={handleDeletarPublicacao} color="error" variant="contained" autoFocus>Excluir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VagaPublicada;
