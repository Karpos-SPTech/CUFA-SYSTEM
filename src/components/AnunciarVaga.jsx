import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Modal,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloseIcon from "@mui/icons-material/Close";
import empresaImageManager from "../utils/empresaImageManager";

const ButtonOption = ({ icon, label }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      cursor: "pointer",
      color: "#006916",
      fontSize: "14px",
      "&:hover": {
        opacity: 0.8,
      },
    }}
  >
    <Box component="img" src={icon} alt={label} sx={{ width: 28, height: 28 }} />
    <span>{label}</span>
  </Box>
);

const AnunciarVaga = ({
  isEdit = false,
  open: propOpen,
  onClose,
  publicacaoParaEditar,
  onSave,
}) => {
  const [open, setOpen] = useState(propOpen || false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [empresaLogo, setEmpresaLogo] = useState(null);

  const initialDescription = `Descrição da vaga:
(Descreva brevemente sobre a vaga e a empresa)

O que o contratado irá realizar:
• 
• 
• 

Benefícios:
• ex: (vale Refeição, Vale Transporte, etc)
• 
• 

Frase atrativa:
(Adicione uma frase chamativa para atrair candidatos)`;

  const [publicacao, setPublicacao] = useState({
    titulo: "",
    descricao: initialDescription,
    tipoContrato: "",
    dtExpiracao: "",
  });

  const [loading, setLoading] = useState(false);

  /** Carregar dados quando for edição */
  useEffect(() => {
    if (isEdit && publicacaoParaEditar) {
      setPublicacao({
        titulo: publicacaoParaEditar.titulo || "",
        descricao: publicacaoParaEditar.descricao || "",
        tipoContrato: publicacaoParaEditar.tipoContrato || "",
        dtExpiracao: publicacaoParaEditar.dtExpiracao
          ? new Date(publicacaoParaEditar.dtExpiracao)
              .toISOString()
              .slice(0, 16)
          : "",
      });
    }
  }, [isEdit, publicacaoParaEditar]);

  /** Abrir modal */
  useEffect(() => {
    setOpen(propOpen);
  }, [propOpen]);

  /** Carregar logo */
  useEffect(() => {
    const savedLogo = empresaImageManager.getProfileImage();
    if (savedLogo) setEmpresaLogo(savedLogo);

    const removeListener = empresaImageManager.addListener((type, image) => {
      if (type === "profile") setEmpresaLogo(image);
    });

    return removeListener;
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setSuccess("");

    if (!isEdit) {
      setPublicacao({
        titulo: "",
        descricao: initialDescription,
        tipoContrato: "",
        dtExpiracao: "",
      });
    }

    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicacao((prev) => ({ ...prev, [name]: value }));
  };

  /** ================================
   *  SALVAR/EDITAR PUBLICAÇÃO
   *  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const novaPublicacao = {
        titulo: publicacao.titulo,
        descricao: publicacao.descricao,
        tipoContrato: publicacao.tipoContrato,
        dtExpiracao: publicacao.dtExpiracao
          ? `${publicacao.dtExpiracao}:00`
          : null,
      };

      const url = isEdit
        ? `http://localhost:8080/api/publicacoes/${publicacaoParaEditar.idPublicacao}`
        : "http://localhost:8080/api/publicacoes";

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaPublicacao),
      });

      /** ======================
       *  EVITAR ERRO DE JSON
       *  ====================== */
      let data = null;
      try {
        data = await response.json();
      } catch (_) {
        data = null; // corpo vazio é permitido
      }

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao salvar publicação");
      }

      setSuccess(`Publicação ${isEdit ? "editada" : "cadastrada"} com sucesso!`);

      if (onSave) onSave();

      handleClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao salvar publicação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <CampaignIcon sx={{ color: "#006916", fontSize: 30 }} />
            <Typography fontWeight={600}>Anunciar nova vaga</Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ bgcolor: "#006916" }}
          >
            Nova Publicação
          </Button>
        </Box>
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 520,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            color="#006916"
            fontWeight={600}
            textAlign={"center"}
            gutterBottom
          >
            {isEdit ? "Editar Publicação" : "Nova Publicação"}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              name="titulo"
              label="Título da Vaga"
              value={publicacao.titulo}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />

            <TextField
              name="descricao"
              label="Descrição da Vaga"
              required
              value={publicacao.descricao}
              onChange={(e) => {
                setPublicacao((prev) => ({
                  ...prev,
                  descricao: e.target.value,
                }));
              }}
              fullWidth
              margin="dense"
              multiline
              rows={10}
            />

            <FormControl fullWidth margin="dense" required>
              <InputLabel id="tipoContrato-label">Tipo de Contrato</InputLabel>
              <Select
                labelId="tipoContrato-label"
                name="tipoContrato"
                value={publicacao.tipoContrato}
                label="Tipo de Contrato"
                onChange={handleChange}
              >
                <MenuItem value="CLT">CLT</MenuItem>
                <MenuItem value="PJ">PJ</MenuItem>
                <MenuItem value="FreeLancer">FreeLancer</MenuItem>
                <MenuItem value="Estágio">Estágio</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="dtExpiracao"
              label="Data de Expiração"
              type="datetime-local"
              value={publicacao.dtExpiracao}
              onChange={handleChange}
              fullWidth
              required
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, bgcolor: "#006916" }}
            >
              {loading ? "Salvando..." : "Publicar"}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AnunciarVaga;
