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
  Select, // Importe Select
  MenuItem, // Importe MenuItem
  InputLabel, // Importe InputLabel para o Select
  FormControl, // Importe FormControl para o Select
} from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
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
    <Box
      component="img"
      src={icon}
      alt={label}
      sx={{ width: 28, height: 28 }}
    />
    <span>{label}</span>
  </Box>
);

const AnunciarVaga = ({ isEdit = false, open: propOpen, onClose, publicacaoParaEditar, onSave }) => {
  const [open, setOpen] = useState(propOpen || false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [empresaLogo, setEmpresaLogo] = useState(null);
  const [publicacao, setPublicacao] = useState({
    titulo: "",
    descricao: `Descrição da vaga:
(Descreva brevemente sobre a vaga e a empresa)

O que o contratado irá realizar:
• 
• 
• 

Benefícios:
• ex(vale refeição, vale transporte, etc)
• 
• 

Frase atrativa:
(Adicione uma frase chamativa para atrair candidatos)`,
    tipoContrato: "",
    dtExpiracao: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se for edição, preenche o formulário com os dados da publicação
    if (isEdit && publicacaoParaEditar) {
      setPublicacao({
        titulo: publicacaoParaEditar.titulo || "",
        descricao: publicacaoParaEditar.descricao || "",
        tipoContrato: publicacaoParaEditar.tipoContrato || "",
        dtExpiracao: publicacaoParaEditar.dtExpiracao ?
          new Date(publicacaoParaEditar.dtExpiracao).toISOString().slice(0, 16) : "",
      });
    }
  }, [isEdit, publicacaoParaEditar]);

  useEffect(() => {
    setOpen(propOpen);
  }, [propOpen]);

  const fetchPublicacoes = async () => {
    setLoading(true);
    setError("");
    try {
      const empresaId = localStorage.getItem("empresaId");
      console.log("[Debug] Iniciando busca de publicações");
      console.log("[Debug] EmpresaId encontrado:", empresaId);

      if (!empresaId) throw new Error("ID da empresa não encontrado");

      const url = "http://localhost:8080/publicacao";
      console.log("[Debug] Fazendo requisição GET para:", url);

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("[Debug] Status da resposta:", response.status);
      console.log("[Debug] Headers da resposta:", Object.fromEntries(response.headers.entries()));

      const contentType = response.headers.get("content-type");
      console.log("[Debug] Content-Type da resposta:", contentType);

      if (!response.ok) {
        console.log("[Debug] Resposta não ok. Status:", response.status);
        const errorText = await response.text();
        console.log("[Debug] Corpo do erro:", errorText);
        throw new Error(`Erro ${response.status}: ${errorText || 'Sem mensagem de erro'}`);
      }

      if (!contentType || !contentType.includes("application/json")) {
        const textContent = await response.text();
        console.log("[Debug] Resposta não-JSON recebida:", textContent);
        throw new Error("Resposta inesperada do servidor (não é JSON)");
      }

      const data = await response.json();
      console.log("[Debug] Dados recebidos:", JSON.stringify(data, null, 2));

      // Note: setPublicacoes here refers to the state variable for the form,
      // but fetchPublicacoes was likely intended to update a list of publications.
      // If this function is meant to update a list, you'll need to pass a setter
      // from the parent component or manage the list state here.
      // For now, I'm assuming this fetch is not directly related to updating the form's publicacao state.
      // If it was, the logic would need to change.
    } catch (err) {
      console.error("Erro ao buscar publicações:", err);
      setError(err.message || "Erro ao carregar publicações");
    } finally {
      setLoading(false);
    }
  };

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
    setPublicacao({
      titulo: "",
      descricao: `Descrição da vaga:
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
(Adicione uma frase chamativa para atrair candidatos)`,
      tipoContrato: "",
      dtExpiracao: "",
    });
    onClose(); // Chama o onClose que pode vir do componente pai
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicacao((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const empresaId = localStorage.getItem("empresaId");
      if (!empresaId) throw new Error("ID da empresa não encontrado");

      const novaPublicacao = {
        ...publicacao,
        fkEmpresa: parseInt(empresaId),
      };

      const url = isEdit ?
        `http://localhost:8080/publicacao/${publicacaoParaEditar.idPublicacao}` :
        "http://localhost:8080/publicacao";

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaPublicacao),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Erro ao ${isEdit ? 'editar' : 'cadastrar'} publicação`);
      }

      setSuccess(`Publicação ${isEdit ? 'editada' : 'cadastrada'} com sucesso!`);
      if (onSave) onSave(); // Isso vai chamar fetchPublicacao no componente pai
      handleClose();
    } catch (err) {
      console.error(`Erro ao ${isEdit ? 'editar' : 'cadastrar'} publicação:`, err);
      setError(err.message || `Erro ao ${isEdit ? 'editar' : 'salvar'} publicação`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <CampaignIcon sx={{ color: '#006916', fontSize: 30 }} />
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

          <Typography variant="h5" color="#006916" fontWeight={600} textAlign={"center"} gutterBottom>
            {isEdit ? 'Editar Publicação' : 'Nova Publicação'}
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
              placeholder="Ex: Desenvolvedor Front-end Júnior"
            />
            <TextField
              name="descricao"
              label="Descrição da Vaga"
              required
              value={publicacao.descricao}
              onChange={(e) => {
                const linhas = e.target.value.split('\n');
                const linhaAtual = e.target.selectionStart;
                let linhaNumero = 0;
                let posicaoAtual = 0;

                // Encontra a linha atual baseado na posição do cursor
                while (posicaoAtual <= linhaAtual && linhaNumero < linhas.length) {
                  posicaoAtual += linhas[linhaNumero].length + 1;
                  linhaNumero++;
                }
                linhaNumero--; // Ajusta o índice

                // Se a linha atual está vazia ou é um placeholder, limpa ela
                if (linhas[linhaNumero] && linhas[linhaNumero].includes('(')) {
                  linhas[linhaNumero] = '';
                }

                const novoValor = linhas.join('\n');
                setPublicacao(prev => ({ ...prev, descricao: novoValor }));
              }}
              fullWidth
              margin="dense"
              multiline
              rows={10}
              InputProps={{
                sx: {
                  fontFamily: 'monospace',
                  '& .MuiOutlinedInput-input': {
                    whiteSpace: 'pre-line'
                  }
                }
              }}
            />

            {/* Início da alteração: Substituindo TextField por Select */}
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
            {/* Fim da alteração */}

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