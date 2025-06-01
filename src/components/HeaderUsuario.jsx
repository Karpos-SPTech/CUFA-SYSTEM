import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Modal,
  Button,
  Avatar,
  Divider,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import homeIcon from '../assets/home-icon.png';
import searchIcon from "../assets/search-icon.png";
import profilePic from "../assets/profile-icon.png";
import logo from "../assets/cufaLogo.png";
import Notifications from "./Notifications";

const Header = ({ hideNotifications }) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [escolaridade, setEscolaridade] = useState('');

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
          height: { xs: "70px", sm: "80px", md: "90px" },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Esquerda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 2, sm: 4 },
            flex: 1
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              height: "100%",
              justifyContent: "center",
              gap: 0.5
            }}

            onClick={() => navigate("/telaUsuario")}

          >          <Box
            component="img"
            src={homeIcon}
            alt="Início"
            sx={{ width: { xs: 22, sm: 28, md: 24 }, height: { xs: 22, sm: 28, md: 24 }, }}
          />
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 12, md: 15 },
                fontFamily: "'Paytone One', sans-serif",
                fontWeight: "bold",
                color: "#006916",
                textDecoration: "none",
                transition: "text-decoration 0.2s",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                }
              }}
            >
              Início
            </Typography>
          </Box>
          {!hideNotifications && <Notifications />}
        </Box>

        {/* Centro */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: { xs: 110, sm: 150, md: 157 },
              height: { xs: 40, sm: 50, md: 60 },
              objectFit: "contain"
            }}
          />
        </Box>

        {/* Direita */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "2px solid #006916",
              fontWeight: "bold",
              borderRadius: "20px",
              px: 1,
              py: 0.5,
              width: { xs: 120, sm: 160, md: 200 },
              background: "#fff",
              height: { xs: 32, sm: 36, md: 40 }
            }}
          >
            <InputBase
              placeholder="Pesquisar"
              sx={{
                flex: 1,
                fontSize: { xs: 12, sm: 14 },
                ml: 1,
                fontFamily: "'Paytone One', sans-serif",
              }}
            />
            <IconButton size="small">
              <Box
                component="img"
                src={searchIcon}
                alt="Pesquisar"
                sx={{ width: { xs: 22, sm: 28, md: 32 }, height: { xs: 22, sm: 28, md: 32 } }}
              />
            </IconButton>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ height: { xs: 60, sm: 60 }, borderColor: '#006916' }} />
          <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Avatar
              src={profilePic}
              alt="Perfil"
              onClick={toggleProfileMenu}
              sx={{
                width: { xs: 32, sm: 40, md: 35 },
                height: { xs: 32, sm: 40, md: 35 },
                bgcolor: isProfileMenuOpen ? "#e9f1e7" : "transparent",
                p: 0.5,
                cursor: "pointer",
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: isProfileMenuOpen ? "#e9f1e7" : "#f0f0f0",
                }
              }}
            />
            <Typography
              onClick={toggleProfileMenu}
              sx={{
                fontSize: { xs: 10, sm: 12, md: 15 },
                fontFamily: "'Paytone One', sans-serif",
                color: "#006916",
                fontWeight: "bold",
                textDecoration: "none",
                transition: "text-decoration 0.2s",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Perfil
            </Typography>
            {isProfileMenuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 40, sm: 50, md: 55 },
                  right: 0,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "150px",
                  zIndex: 1000,
                  padding: "10px 0",
                  borderTop: "5px solid #006916",
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "#006916",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontFamily: "'Paytone One', sans-serif",
                    transition: "background-color 0.2s",
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => { setIsProfileMenuOpen(false); navigate("/TelaPerfilUsuario"); }}
                >
                  <PersonIcon fontSize="small" /> Perfil
                </Box>
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "#006916",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontFamily: "'Paytone One', sans-serif",
                    transition: "background-color 0.2s",
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => { setIsProfileMenuOpen(false); openSettingsModal(); }}
                >
                  <SettingsIcon fontSize="small" /> Ajustes
                </Box>
                <Box
                  sx={{
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#006916",
                    cursor: "pointer",
                    fontFamily: "'Paytone One', sans-serif",
                    transition: "background-color 0.2s",
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => { setIsProfileMenuOpen(false); navigate("/"); }}
                >
                  <LogoutIcon fontSize="small" /> Sair
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Modal de Ajustes */}
      <Modal open={isSettingsModalOpen} onClose={closeSettingsModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: { xs: 2, sm: 4 },
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: { xs: '90vw', sm: 400, md: 600 },
            textAlign: "left",
            borderTop: "5px solid #006916",
          }}
        >
          <Button
            onClick={closeSettingsModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#006916",
              cursor: "pointer",
              zIndex: 10,
              '&:hover': {
                color: "#004d12",
              },
            }}
          >
            &times;
          </Button>          <Typography
            sx={{
              fontSize: { xs: 18, sm: 22, md: 24 },
              color: "#006916",
              marginBottom: "5px",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "'Paytone One', sans-serif",
            }}
          >
            Preencha os dados para cadastrar
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16, md: 18 },
              color: "#666",
              marginBottom: "20px",
              textAlign: "left",
              fontFamily: "'Paytone One', sans-serif",
            }}
          >
            Dados pessoais
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Box sx={{ display: "flex", gap: "15px" }}>              <InputBase
                placeholder="Nome Completo"
                sx={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: "14px",
                }}
              />
              <InputBase
                placeholder="CPF"
                sx={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: "14px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "15px" }}>              <InputBase
                placeholder="Telefone"
                sx={{
                  width: "96%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: "14px",
                }}
              />              <FormControl 
                fullWidth 
                sx={{ 
                  borderRadius: "8px",
                  color: "#333",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <Select
                  value={escolaridade}
                  onChange={(e) => setEscolaridade(e.target.value)}
                  displayEmpty                  sx={{                    width: "100%",
                    height: "41px",
                    borderRadius: "8px",
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    border: 'none',
                    fontFamily: "'Paytone One', sans-serif",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    '& .MuiSelect-select': {
                      padding: "0 12px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center"
                    }
                  }}                  renderValue={
                    escolaridade !== '' ? undefined : () => <span style={{ color: '#a0a0a0', fontFamily: "'Paytone One', sans-serif", fontSize: '14px', display: 'flex', alignItems: 'center', height: '100%' }}>Escolaridade</span>
                  }
                >
                  <MenuItem value="nenhuma">Nenhuma</MenuItem>
                  <MenuItem value="fundamental-incompleto">Ensino Fundamental Incompleto</MenuItem>
                  <MenuItem value="fundamental-completo">Ensino Fundamental Completo</MenuItem>
                  <MenuItem value="medio-incompleto">Ensino Médio Incompleto</MenuItem>
                  <MenuItem value="medio-completo">Ensino Médio Completo</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: "15px" }}>
              <InputBase
                placeholder="Data de nascimento"
                sx={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: "14px",
                }}
              />
              <InputBase
                placeholder="Estado Civil"
                sx={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: "14px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "15px" }}>
              <InputBase
                placeholder="Estado"
                sx={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: "14px",
                }}
              />
              <InputBase
                placeholder="Cidade"
                sx={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontFamily: "'Paytone One', sans-serif",
                  fontSize: "14px",
                }}
              />
            </Box>
            <InputBase
              placeholder="Biografia"
              multiline
              rows={3}
              sx={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontFamily: "'Paytone One', sans-serif",
                fontSize: "14px",
              }}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "#006916",
                color: "white",
                padding: "15px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
                fontFamily: "'Paytone One', sans-serif",
                textTransform: "none",
                '&:hover': {
                  backgroundColor: "#004d12",
                },
              }}
            >
              Finalizar Cadastro
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Header;