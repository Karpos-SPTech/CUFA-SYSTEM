import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Modal,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete"; // Import do ícone
import profileIcon from "../assets/profile-icon.png";

const MemberRow = ({ image, name, onDelete }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 2,
      p: 1,
      borderRadius: "8px",
      justifyContent: "space-between",
      "&:hover": {
        backgroundColor: "#e8f5e9",
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar
        src={image || profileIcon}
        alt={name}
        sx={{
          width: 36,
          height: 36,
        }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          color: "#1e1e1e",
          fontWeight: 500,
        }}
      >
        {name}
      </Typography>
    </Box>
    <IconButton
      onClick={onDelete}
      aria-label="delete member"
      size="small"
      sx={{
        color: "red",
        "&:hover": {
          backgroundColor: "#fddede",
        },
      }}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Box>
);

const MembroCard = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  // Valores válidos para o enum Cargo no backend
  const cargosValidos = {
    FUNCIONARIO: "FUNCIONARIO",
    ADMINISTRADOR: "ADMINISTRADOR",
  };

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: cargosValidos.FUNCIONARIO, // Valor padrão
  });

  const [members, setMembers] = useState([]);

  // Função para carregar os funcionários
  const fetchFuncionarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:8080/api/funcionarios`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let responseData;

      try {
        responseData = await response.json();
        console.log("RESPONSE DATA CRU:", responseData);
      } catch (e) {
        console.error("Erro ao parsear resposta:", e);
        throw new Error(`Erro ao processar resposta do servidor: ${response.status}`);
      }

      if (!response.ok) {
        console.error("Resposta não ok:", responseData);
        throw new Error(
          responseData?.message ||
          responseData?.error ||
          `Erro ao buscar funcionários (${response.status})`
        );
      }

      const funcionarios = responseData;

      // Verifica se funcionarios é um array
      if (!Array.isArray(funcionarios)) {
        throw new Error("Resposta inválida do servidor");
      }

    const getCargo = (cargoValue) => {
      const cargo =
        typeof cargoValue === "object" ? cargoValue?.nome : cargoValue;

      // se vier null, default é FUNCIONARIO
      return Object.values(cargosValidos).includes(cargo)
        ? cargo
        : cargosValidos.FUNCIONARIO;
    };

      const membrosFormatados = funcionarios.map((funcionario) => ({
        id: funcionario.id,
        name: funcionario.nome || "Sem nome",
        email: funcionario.email || "Sem email",
        cargo: getCargo(funcionario.cargo),
        image: null,
      }));

      setMembers(membrosFormatados);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      setError(
        error.message ||
        "Erro ao acessar o servidor. Verifique sua conexão e tente novamente."
      );
      setMembers([]);

      // Se o erro for de autenticação, podemos redirecionar para o login
      if (error.message.includes("403") || error.message.includes("401")) {
        // Limpa os dados da sessão
        localStorage.removeItem("empresaToken");
        localStorage.removeItem("empresaId");
        // Redireciona para o login (você pode ajustar o caminho conforme necessário)
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Carrega os funcionários quando o componente montar
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      nome: "",
      email: "",
      senha: "",
      cargo: cargosValidos.FUNCIONARIO,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const funcionarioData = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        cargo: cargosValidos[formData.cargo] || "FUNCIONARIO"
      };

      const response = await fetch("http://localhost:8080/api/funcionarios", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionarioData),
      });

      let responseData;
      try {
        responseData = await response.json();
        console.log("RESPONSE DATA CRU:", responseData);
      } catch (e) {
        if (!response.ok) {
          throw new Error(`Erro ao cadastrar funcionário: ${response.status}`);
        }
      }

      if (!response.ok) {
        throw new Error(responseData?.message || "Erro ao cadastrar funcionário");
      }

      // Atualiza a lista buscando todos os funcionários novamente
      await fetchFuncionarios();

      handleClose();
    } catch (err) {
      console.error("Erro ao cadastrar funcionário:", err);
      setError(
        err.message ||
        "Não foi possível cadastrar o funcionário. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:8080/api/funcionarios/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar funcionário: ${response.status}`);
      }

      await fetchFuncionarios();
    } catch (err) {
      console.error("Erro ao deletar funcionário:", err);
      setError(err.message || "Erro ao deletar funcionário. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      console.log("Membro recebido:", memberToDelete);
      
      handleDeleteMember(memberToDelete.id);
    }
    setDeleteConfirmOpen(false);
    setMemberToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setMemberToDelete(null);
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          p: 2,
          width: "100%",
          minWidth: "400px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
          height: "200px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1e1e1e",
            }}
          >
            Membros
          </Typography>
          <IconButton
            onClick={handleOpen}
            sx={{
              backgroundColor: "#e9f1e7",
              width: 24,
              height: 24,
              "&:hover": {
                backgroundColor: "#d8e6d5",
              },
            }}
          >
            <AddIcon sx={{ fontSize: 16, color: "#006916" }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            overflowY: "auto",
            flex: 1,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#006916",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#005713",
            },
          }}
        >
          {members.map((member) => (
            <MemberRow
              key={member.id}
              name={member.name}
              image={member.image}
              onDelete={() => handleDeleteClick(member)}
            />
          ))}
        </Box>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-cadastro-membro"

      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "15px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            p: 4,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderTop: "5px solid #006916"
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ color: "#006916", mb: 1.5, fontWeight: "bold", alignItems: "center", display: "flex", justifyContent: "center" }}
          >
            Preencha os dados para cadastrar
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#E3EEE5",
                  height: "48px",
                  borderRadius: "12px",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#E3EEE5",
                  height: "48px",
                  borderRadius: "12px",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Senha"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#E3EEE5",
                  height: "48px",
                  borderRadius: "12px",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            <TextField
              select
              fullWidth
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#E3EEE5",
                  height: "48px",
                  borderRadius: "12px",
                  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            >
              {Object.entries(cargosValidos).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                height: "48px",
                bgcolor: "#006916",
                color: "white",
                borderRadius: "12px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  bgcolor: "#005713",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Finalizar Cadastro"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Dialog de confirmação */}
      <Dialog open={deleteConfirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o funcionário{" "}
            {memberToDelete?.name}? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} sx={{ color: "#666" }}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              bgcolor: "#FF0000",
              "&:hover": {
                bgcolor: "#D32F2F",
              },
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MembroCard;
