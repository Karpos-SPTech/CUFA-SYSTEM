import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import empresaImageManager from "../utils/empresaImageManager";
import AnunciarVaga from "./AnunciarVaga";

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
    titulo: "",
  });

  // Paginação
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPublicacao = async () => {
    try {
      const empresaId = localStorage.getItem("empresaId");
      if (!empresaId) throw new Error("ID da empresa não encontrado");

      const response = await fetch(
        `http://localhost:8080/publicacoes?page=${page}&size=10`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar publicações: ${response.status}`);
      }

      const data = await response.json();

      if (data.content && data.content.length > 0) {
        setPublicacoes(data.content);
        setTotalPages(data.totalPages);
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
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleVerCandidatos = (idPublicacao) => {
    navigate(`/telaCandidatos?vagaId=${idPublicacao}`);
  };

  const handleDeleteClick = (publicacao) => {
    setDeleteDialog({
      open: true,
      publicacaoId: publicacao.idPublicacao,
      titulo: publicacao.titulo,
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      publicacaoId: null,
      titulo: "",
    });
  };

  const handleDeletarPublicacao = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/publicacoes/${deleteDialog.publicacaoId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao deletar publicação: ${response.status}`);
      }

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
      <Paper sx={{ p: 2, textAlign: "center" }}>
        <Typography>Carregando publicações...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, textAlign: "center" }}>
        <Typography color="error">
          Erro ao carregar publicações: {error}
        </Typography>
      </Paper>
    );
  }

  if (publicacoes.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: "center" }}>
        <Typography>Nenhuma publicação encontrada.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {publicacoes.map((publicacao) => {
          return (
            <Paper
              key={publicacao.idPublicacao}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                p: 2,
                width: "100%",
                border: "1px solid #ddd",
                position: "relative",
              }}
            >
              {/* Header com Logo e Informações */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                {empresaLogo ? (
                  <Box
                    component="img"
                    src={empresaLogo}
                    alt="Logo da Empresa"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    component="svg"
                    width={70}
                    height={70}
                    viewBox="0 0 60 60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Fundo quadrado verde */}
                    <rect width="60" height="60" fill="#006916" rx="4" ry="4" />

                    {/* Primeira letra do nome da empresa */}
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="24"
                      fill="white"
                      fontFamily="Arial, sans-serif"
                    >
                      {publicacao.nomeEmpresa?.charAt(0).toUpperCase() || "?"}
                    </text>
                  </Box>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#006916",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {publicacao.nomeEmpresa || "Empresa"}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#444",
                      fontSize: "14px",
                      fontWeight: "bold",
                      mt: 0.5,
                    }}
                  >
                    {publicacao.titulo || "Título não disponível"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <IconButton
                    onClick={() => handleEditClick(publicacao)}
                    sx={{
                      color: "#006916",
                      "&:hover": {
                        backgroundColor: "rgba(0, 105, 22, 0.1)",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(publicacao)}
                    sx={{
                      color: "#006916",
                      "&:hover": {
                        backgroundColor: "rgba(0, 105, 22, 0.1)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
      {/* Paginação */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          onClick={handlePrevPage}
          disabled={page <= 1}
          variant="outlined"
          sx={{ color: "#006916" }}
        >
          Anterior
        </Button>
        <Typography sx={{ alignSelf: "center" }}>
          Página {page} de {totalPages}
        </Typography>
        <Button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          variant="outlined"
          sx={{ color: "#006916" }}
        >
          Próxima
        </Button>
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
        {" "}
        <DialogTitle id="alert-dialog-title">
          {" "}
          Confirmar exclusão{" "}
        </DialogTitle>{" "}
        <DialogContent>
          {" "}
          <DialogContentText id="alert-dialog-description">
            {" "}
            Tem certeza que deseja excluir a vaga "{deleteDialog.titulo}"? Esta
            ação não pode ser desfeita.{" "}
          </DialogContentText>{" "}
        </DialogContent>{" "}
        <DialogActions>
          {" "}
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              color: "#666",
              "&:hover": { backgroundColor: "rgba(102, 102, 102, 0.1)" },
            }}
          >
            {" "}
            Cancelar{" "}
          </Button>{" "}
          <Button
            onClick={handleDeletarPublicacao}
            color="error"
            variant="contained"
            autoFocus
          >
            {" "}
            Excluir{" "}
          </Button>{" "}
        </DialogActions>{" "}
      </Dialog>{" "}
    </>
  );
};

export default VagaPublicada;