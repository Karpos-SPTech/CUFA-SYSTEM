import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material"; // Removidos Modal, TextField, Button
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CardPerfil({
  profileImg,
  hover,
  onMouseEnter,
  onMouseLeave,
  onAvatarClick,
  onRemovePhoto,
  fileInputRef,
  onFileChange,
  coverImg,
  onCoverChange,
}) {
  const [cover, setCover] = useState(coverImg || null);

  // Estados para os dados do perfil (nome, estado, cidade) - BIOGRAFIA REMOVIDA
  const [profileData, setProfileData] = useState({
    nome: "",
    estado: "",
    cidade: "",
    email: ""
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);

  // Mensagens padrão
  const defaultLocationMessage = "Não informado";
  const defaultNameMessage = "Nome do Usuário"; // Mensagem padrão para o nome

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoadingProfile(true);
      setProfileError(null);

      try {
        const response = await fetch("http://localhost:8080/api/usuarios", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Usuário não autenticado. Faça login novamente.");
          }
          const text = await response.text();
          let errorMessage = `Erro HTTP: ${response.status}`;
          if (text) {
            try {
              const errData = JSON.parse(text);
              errorMessage = errData.message || errorMessage;
            } catch {
              errorMessage = text;
            }
          }
          throw new Error(errorMessage);
        }

        let data = {};
        const contentLength = response.headers.get("content-length");
        const contentType = response.headers.get("content-type") || "";

        if (contentLength === "0") {
          data = {};
        } else {
          const text = await response.text();
          if (text) {
            try {
              data = JSON.parse(text);
            } catch (parseErr) {
              console.warn("Resposta recebida não é JSON:", text);
              data = {};
            }
          } else {
            data = {};
          }
        }

        console.log("Dados do perfil recebidos:", data);

        if (data.email) {
          localStorage.setItem("userEmail", data.email);
        }

        setProfileData({
          nome: data.nome ?? "",
          estado: data.estado ?? "",
          cidade: data.cidade ?? "",
          email: data.email ?? ""
        });
      } catch (err) {
        console.error("Erro ao buscar dados do perfil:", err);
        setProfileError(err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []); // Executa apenas uma vez ao montar o componente

  // Upload capa
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
        setCover(ev.target.result);
        if (onCoverChange) onCoverChange(ev.target.result);
        localStorage.setItem("coverImg", ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função utilitária para camel case (primeira letra de cada palavra maiúscula)
  function toCamelCase(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: 4,
          background: "transparent",
          position: "relative",
          p: 0,
          overflow: "hidden",
        }}
      >
        {/* Capa de perfil */}
        <Box
          sx={{
            width: "100%",
            height: 174,
            position: "relative",
            background: cover
              ? `url(${cover}) center/cover no-repeat`
              : "linear-gradient(90deg, #e5eee3 0%, #b6e2c2 100%)",
          }}
        >
          <IconButton
            component="label"
            htmlFor="cover-upload"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.25)",
              color: "#fff",
              zIndex: 2,
            }}
          >
            <input
              type="file"
              accept="image/*"
              id="cover-upload"
              style={{ display: "none" }}
              onChange={handleCoverUpload}
            />
          </IconButton>
          {cover && (
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
                setCover(null);
                localStorage.removeItem("coverImg");
                if (onCoverChange) onCoverChange(null);
              }}
            >
              <DeleteIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 2,
            px: 3,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 130, // aumentei para 130px
              height: 130, // aumentei para 130px
              mt: -7,
              ml: "auto",
              mr: "auto",
              border: "6px solid #fff",
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Avatar
              sx={{
                width: 118, // aumentei para ocupar quase todo o círculo
                height: 118, // aumentei para ocupar quase todo o círculo
                boxShadow: 2,
                bgcolor: "#006916",
                cursor: "pointer",
                borderRadius: "50%",
                objectFit: "cover",
                border: "none",
              }}
              src={profileImg || undefined}
              onClick={onAvatarClick}
            >
              {!profileImg && profileData.nome && (
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Círculo verde de fundo */}
                  <circle cx="30" cy="30" r="30" fill="#006916" />

                  {/* Primeira letra do nome centralizada */}
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="2.4rem"
                    fontWeight={500}
                    fill="white"
                    fontFamily="Arial, sans-serif"
                  >
                    {profileData.nome.charAt(0).toUpperCase()}
                  </text>
                </svg>
              )}
            </Avatar>
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
                onClick={onAvatarClick}
              >
                <EditIcon
                  sx={{ color: "#fff", fontSize: 32, mb: profileImg ? 1 : 0 }}
                />
                <Typography
                  sx={{ color: "#fff", fontSize: 13, fontWeight: 600 }}
                >
                  Trocar foto
                </Typography>
                {profileImg && (
                  <IconButton
                    size="small"
                    sx={{ mt: 1, color: "#fff", bgcolor: "rgba(0,0,0,0.25)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemovePhoto();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={onFileChange}
            />
          </Box>
        </Box>
        <CardContent sx={{ pt: 6, pb: 3, px: 5 }}>
          {loadingProfile ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} color="success" />
              <Typography sx={{ ml: 2, color: "#006916" }}>
                Carregando dados...
              </Typography>
            </Box>
          ) : profileError ? (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", py: 2 }}
            >
              Erro ao carregar dados do perfil: {profileError.message}
            </Typography>
          ) : (
            <>
              {/* Nome do usuário */}
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#006916", mb: 0.5 }}
              >
                {toCamelCase(profileData.nome) || defaultNameMessage}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#006916", fontWeight: 500 }}
              >
                {profileData.email}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* Localização (Cidade, Estado) */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 15 }}
                >
                  {profileData.cidade || defaultLocationMessage}
                  {profileData.cidade && profileData.estado ? `, ` : ""}
                  {profileData.estado ||
                    (profileData.cidade ? defaultLocationMessage : "")}
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
