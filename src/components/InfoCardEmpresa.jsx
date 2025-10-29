import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Avatar,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import empresaImageManager from "../utils/empresaImageManager";
import { formatCNPJ } from "../utils/formatters";

const InfoCardEmpresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const response = await fetch(
          `http://3.84.239.87:8080/empresas/${empresaId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados da empresa");
        }

        const empresaData = await response.json();

        if (empresaData) {
          setEmpresa({
            ...empresaData,
            cnpj: empresaData.cnpj ? formatCNPJ(empresaData.cnpj) : "",
          });
        }

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

  // Funções para upload de imagens
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
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

  const getDisplayValue = (value, type) => {
    if (loading) return <CircularProgress size={16} />;
    if (error) return `Não foi possível carregar ${type}`;
    return value || `Não foi possível carregar ${type}`;
  };

  const InfoItem = ({ icon, label, value }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2.5,
        borderRadius: "12px",
        transition: "all 0.2s ease",
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
        height: "85px",
        "&:hover": {
          backgroundColor: "#f5f9f6",
          borderColor: "#006916",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0, 105, 22, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          minWidth: 48,
          height: 48,
          borderRadius: "10px",
          backgroundColor: "#e8f5e9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
        }}
      >
        {React.cloneElement(icon, { sx: { color: "#006916", fontSize: 24 } })}
      </Box>
      <Box>
        <Typography
          sx={{
            color: "#666",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            color: "#1e1e1e",
            fontSize: "15px",
            fontWeight: "500",
            lineHeight: "1.4",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Paper
        sx={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          width: "100%",
          minHeight: "450px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Capa da empresa */}
        <Box
          sx={{
            backgroundColor: coverImg ? "transparent" : "#006916",
            backgroundImage: coverImg ? `url(${coverImg})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "230px",
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

        <Box sx={{ p: 4, pt: 6, position: "relative" }}>
          {/* Avatar/Logo da empresa */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              left: 24,
              width: 120,
              height: 120,
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
                  width: 110,
                  height: 110,
                  bgcolor: "#006916",
                  fontSize: "2.4rem",
                  fontWeight: "bold",
                  color: "white",
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

          <Box sx={{ ml: 6, width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
                position: "relative",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#006916",
                  fontSize: "36px",
                  fontWeight: "700",
                  mb: 1,
                  marginRight: "200px",
                  letterSpacing: "0.5px",
                }}
              >
                {getDisplayValue(empresa?.nome, "o nome da empresa")}
              </Typography>
              <Box
                sx={{
                  width: "95%",
                  height: "1px",
                  backgroundColor: "#e0e0e0",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                marginRight: "200px",
                maxWidth: "1000px",
                mx: "auto",
                px: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 3 }}>
                <InfoItem
                  icon={<EmailIcon />}
                  label="Email"
                  value={getDisplayValue(empresa?.email, "o email da empresa")}
                />
                <InfoItem
                  icon={<BusinessIcon />}
                  label="CNPJ"
                  value={getDisplayValue(empresa?.cnpj, "o CNPJ da empresa")}
                />
                <InfoItem
                  icon={<TagIcon />}
                  label="CEP"
                  value={getDisplayValue(empresa?.cep, "o CEP")}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 3 }}>
                <InfoItem
                  icon={<LocationOnIcon />}
                  label="Endereço"
                  value={getDisplayValue(empresa?.endereco, "o endereço")}
                />
                <InfoItem
                  icon={<HomeIcon />}
                  label="Número"
                  value={getDisplayValue(empresa?.numero, "o número")}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

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
