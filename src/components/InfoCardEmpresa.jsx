import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Modal,
  TextField,
  Button,
  IconButton,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import editIcon from "/src/assets/pencil-icon.svg";
import empresaImageManager from "../utils/empresaImageManager";
import { formatCNPJ, removeMascara } from "../utils/formatters";

const InfoCardEmpresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cnpj: "",
  });

  // Estados para upload de imagens
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:8080/empresas", {
          method: "GET",
          credentials: "include", // para enviar o cookie JWT
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados da empresa");
        }

        const empresaData = await response.json();

        setEmpresa(empresaData);
        setFormData({
          nome: empresaData.nome || "",
          email: empresaData.email || "",
          cnpj: empresaData.cnpj ? formatCNPJ(empresaData.cnpj) : "",
        });

        // Carrega imagens salvas
        const savedProfileImg = empresaImageManager.getProfileImage();
        const savedCoverImg = empresaImageManager.getCoverImage();
        if (savedProfileImg) setProfileImg(savedProfileImg);
        if (savedCoverImg) setCoverImg(savedCoverImg);
      } catch (err) {
        console.error("Erro ao buscar dados da empresa:", err);
        setError("Não foi possível carregar os dados. Tente novamente.");
        setSnackbarMessage(
          "Erro ao carregar dados da empresa. Tente novamente."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funções para upload de imagens
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        alert("A imagem deve ter no máximo 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImg(ev.target.result);
        localStorage.setItem("empresaProfileImg", ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImg(null);
    localStorage.removeItem("empresaProfileImg");
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        alert("A imagem de capa deve ter no máximo 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCoverImg(ev.target.result);
        localStorage.setItem("empresaCoverImg", ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const empresaToken = localStorage.getItem("empresaToken");
      if (!empresaToken) {
        throw new Error("Token de autenticação não encontrado");
      }

      const response = await fetch(
        `http://localhost:8080/empresas/${empresa.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            cnpj: formData.cnpj ? removeMascara(formData.cnpj) : undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados da empresa");
      }

      const data = await response.json();
      setEmpresa(data);
      handleClose();

      setSnackbarMessage("Dados atualizados com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      setSnackbarMessage("Erro ao atualizar dados. Tente novamente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayValue = (value, type) => {
    if (loading) return <CircularProgress size={16} />;
    if (error) return `Não foi possível carregar ${type}`;
    return value || `Não foi possível carregar ${type}`;
  };

  return (
    <>
      <Paper
        sx={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          width: "100%",
          minHeight: "450px", // Aumentado para acomodar a foto de capa maior
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Capa da empresa */}
        <Box
          sx={{
            backgroundColor: coverImg ? "transparent" : "#006916",
            backgroundImage: coverImg ? `url(${coverImg})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "230px", // Aumentado para ocupar mais espaço da tela
            width: "100%",
            position: "relative",
          }}
        >
          <input
            type="file"
            accept="image/*"
            id="cover-upload-empresa"
            style={{ display: "none" }}
            onChange={handleCoverUpload}
          />
          <IconButton
            component="label"
            htmlFor="cover-upload-empresa"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.25)",
              color: "#fff",
              zIndex: 2,
            }}
          >
            <EditIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleCoverUpload}
            />
          </IconButton>
          {coverImg && (
            <IconButton
              size="medium"
              sx={{
                position: "absolute",
                top: 8,
                right: 48,
                bgcolor: "rgba(0,0,0,0.25)",
                color: "#fff",
                zIndex: 2,
                width: 40,
                height: 40,
                p: 1,
              }}
              onClick={() => {
                setCoverImg(null);
                localStorage.removeItem("empresaCoverImg");
              }}
            >
              <DeleteIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}
        </Box>

        <Box sx={{ p: 3, pt: 6, position: "relative" }}>
          <Box
            component="img"
            src={editIcon}
            alt="Editar informações"
            onClick={handleOpen}
            sx={{
              position: "absolute",
              top: 24,
              right: 24,
              cursor: "pointer",
              width: 20,
              height: 20,
              opacity: 0.6,
              "&:hover": {
                opacity: 1,
              },
            }}
          />

          {/* Avatar/Logo da empresa */}
          <Box
            sx={{
              position: "absolute",
              top: -60, // Ajustado para a nova altura da capa
              left: 24,
              width: 120, // Aumentado de 100px para 120px
              height: 120, // Aumentado de 100px para 120px
              borderRadius: "50%",
              border: "4px solid #fff",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleAvatarClick}
          >
            {profileImg ? (
              <Box
                component="img"
                src={profileImg}
                alt="Logo da empresa"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 110, // Ajustado para o novo tamanho do container
                  height: 110, // Ajustado para o novo tamanho do container
                  bgcolor: "#e3f2fd",
                  fontSize: "2.2rem", // Aumentado ligeiramente
                  fontWeight: "bold",
                  color: "#006916",
                }}
              >
                {empresa?.nome ? empresa.nome.charAt(0).toUpperCase() : "E"}
              </Avatar>
            )}

            {hover && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.45)",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  cursor: "pointer",
                }}
              >
                <EditIcon
                  sx={{ color: "#fff", fontSize: 24, mb: profileImg ? 0.5 : 0 }}
                />
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Trocar logo
                </Typography>
                {profileImg && (
                  <IconButton
                    size="small"
                    sx={{ mt: 0.5, color: "#fff", bgcolor: "rgba(0,0,0,0.25)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePhoto();
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Box>
            )}

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Box>

          <Box sx={{ ml: 15 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#1e1e1e",
                fontSize: "20px",
                fontWeight: "600",
                mb: 1,
              }}
            >
              {getDisplayValue(empresa?.nome, "o nome da empresa")}
            </Typography>
            <Typography
              sx={{
                color: "#666",
                fontSize: "14px",
                mb: 0.5,
              }}
            >
              {getDisplayValue(empresa?.email, "o email da empresa")}
            </Typography>
            <Typography
              sx={{
                color: "#666",
                fontSize: "14px",
              }}
            >
              {getDisplayValue(empresa?.cnpj, "o CNPJ da empresa")}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-editar-empresa"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "15px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            p: 4,
            outline: "none",
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
            sx={{ color: "#006916", mb: 3, fontWeight: "bold" }}
          >
            Editar informações da empresa
          </Typography>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              fullWidth
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome da empresa"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#E3EEE5",
                  height: "48px",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#E3EEE5",
                  height: "48px",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="CNPJ"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#E3EEE5",
                  height: "48px",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSave}
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
                "Salvar alterações"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InfoCardEmpresa;
