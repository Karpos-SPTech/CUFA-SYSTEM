import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import homeIcon from '../assets/home-icon.png';
import searchIcon from "../assets/search-icon.png";
import profilePic from "../assets/profile-icon.png";
import logo from "../assets/cufaLogo.png";
import Notifications from "./Notifications";

import { IMaskInput } from 'react-imask'; // Importando IMaskInput
import { Phone } from "@mui/icons-material";

const PhoneMaskCustom = React.forwardRef(function PhoneMaskCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="(00) 00000-0000"
      definitions={{
        '0': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value } })
      }
      overwrite
    />
  );
});

// Componente auxiliar para a máscara de data
const DateMaskCustom = React.forwardRef(function DateMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="DD-MM-YYYY" // Máscara de data: Dia-Mês-Ano
      definitions={{
        'D': /[0-9]/, // Permite dígitos de 0 a 9
        'M': /[0-9]/,
        'Y': /[0-9]/,
      }}
      inputRef={ref}
      // onAccept é chamado com o valor formatado (dd-mm-yyyy)
      onAccept={(value) => onChange({ target: { name: props.name, value: value } })}
      overwrite // Sobrescreve caracteres quando digitado
    />
  );
});

const CPFMaskCustom = React.forwardRef(function CPFMaskCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="000.000.000-00"
      definitions={{
        '0': /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value } })
      }
      overwrite
    />
  );
});

const Header = ({ hideNotifications }) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [escolaridade, setEscolaridade] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
    estado: '',
    cidade: '',
    biografia: '',
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Estado para foto de perfil
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    // Tenta buscar a foto de perfil do localStorage
    const saved = localStorage.getItem('profileImg');
    if (saved) setProfileImg(saved);
  }, []);

  // Atualiza a foto de perfil automaticamente ao mudar no localStorage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'profileImg') {
        setProfileImg(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
    fetchUserProfileForForm();
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
    setFormData({
      nome: '', cpf: '', telefone: '', dataNascimento: '', estado: '', cidade: '', biografia: '',
    });
    setEscolaridade('');
    setEstadoCivil('');
    setProfileError(null);
    setSubmitError(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Função para buscar os dados do perfil (para preencher o modal)
  const fetchUserProfileForForm = async () => {
    setLoadingProfile(true);
    setProfileError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios`, {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type': 'application/json'}
      });

      if (!response.ok) {
        let errorData = {};
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          errorData = await response.json();
        }
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Dados do perfil recebidos (GET):", data);

      setFormData({
        nome: data.nome ?? '',
        cpf: data.cpf ?? '',
        telefone: data.telefone ?? '',
        dataNascimento: data.dtNascimento,
        estado: data.estado ?? '',
        cidade: data.cidade ?? '',
        biografia: data.biografia ?? '',
      });
      setEscolaridade(data.escolaridade ?? '');
      setEstadoCivil(data.estadoCivil ?? '');

    } catch (err) {
      console.error("Erro ao buscar dados do perfil para o formulário (GET):", err);
      setProfileError(err);
      setSnackbarMessage(`Erro ao carregar perfil: ${err.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com a submissão do formulário (FETCH PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // --- CONVERTE dataNascimento do formato DD-MM-YYYY para YYYY-MM-DD para envio ---
    let dataNascimentoParaEnvio = formData.dataNascimento;
    if (dataNascimentoParaEnvio && dataNascimentoParaEnvio.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const parts = dataNascimentoParaEnvio.split('-');
      // Verifica se a data é completa antes de reordenar
      if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
        dataNascimentoParaEnvio = `${parts[2]}-${parts[1]}-${parts[0]}`; // Reordena para yyyy-mm-dd
      } else {
        console.warn("Data de nascimento incompleta ou inválida:", dataNascimentoParaEnvio);
        // Se a data for incompleta, envie como null ou string vazia, ou trate como erro
        dataNascimentoParaEnvio = null; // Ou ''
      }
    } else if (dataNascimentoParaEnvio === '') {
      dataNascimentoParaEnvio = null; // Se estiver vazia, envia como null
    } else {
      console.warn("Formato de data de nascimento inesperado para envio. Mantendo original ou definindo como null:", dataNascimentoParaEnvio);
      dataNascimentoParaEnvio = null; // Caso a string não seja do formato dd-mm-yyyy ou vazia
    }
    // --- FIM DA CONVERSÃO ---

    // Cria o objeto com os dados a serem enviados (incluindo escolaridade e data convertida)
    const dataToSubmit = {
      cpf: formData.cpf,
      telefone: formData.telefone,
      escolaridade: escolaridade,
      dtNascimento: formData.dataNascimento, 
      estadoCivil: estadoCivil,
      estado: formData.estado,
      cidade: formData.cidade,
      biografia: formData.biografia,
    };

    // Filtra campos vazios/nulos antes de enviar (opcional, dependendo da sua API)
    // Se a API espera um campo específico mesmo que seja vazio, não filtre.
    const filteredDataToSubmit = Object.fromEntries(
      Object.entries(dataToSubmit).filter(([_, value]) => value !== '' && value !== null)
    );

    console.log("Dados do formulário para atualização (PUT):", filteredDataToSubmit);

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(filteredDataToSubmit),
      });

      if (!response.ok) {
        let errorData = {};
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          errorData = await response.json();
        }
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type');
      let responseBody = null;
      if (response.status !== 204 && contentType && contentType.includes('application/json')) {
        responseBody = await response.json();
      }

      console.log("Perfil atualizado com sucesso:", responseBody);

      setSnackbarMessage("Perfil atualizado com sucesso!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      closeSettingsModal();
    } catch (err) {
      console.error("Erro ao atualizar perfil (PUT):", err);
      setSubmitError(err);
      setSnackbarMessage(`Erro ao atualizar perfil: ${err.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/usuarios/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.error("Erro de rede ao tentar logout:", err);
    }
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
        {/* ... (Conteúdo do cabeçalho - esquerda, centro, direita - permanece o mesmo) ... */}
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
          >
            <Box
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
                sx={{ width: { xs: 22, sm: 28, md: 28 }, height: { xs: 21, sm: 28, md: 28 }, }}
              />
            </IconButton>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ height: { xs: 60, sm: 60 }, borderColor: '#006916' }} />
          <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Avatar
              src={profileImg || undefined}
              alt="Perfil"
              onClick={toggleProfileMenu}
              sx={{
                width: { xs: 48, sm: 56, md: 55 },
                height: { xs: 48, sm: 56, md: 55 },
                bgcolor: isProfileMenuOpen ? "#e9f1e7" : "#f0f0f0",
                p: 0,
                cursor: "pointer",
                transition: "background-color 0.2s",
                borderRadius: '50%',
                boxShadow: 2,
                border: '3px solid #fff',
                objectFit: 'cover',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!profileImg && <PersonIcon sx={{ color: '#006916', fontSize: 36, mx: 'auto', my: 'auto' }} />}
            </Avatar>
            {isProfileMenuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: 40, sm: 50, md: 55 },
                  right: -8,
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
                  <EditIcon fontSize="small" /> Editar
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
                  onClick={handleLogout}
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
          </Button>
          <Typography
            sx={{
              fontSize: { xs: 18, sm: 22, md: 24 },
              color: "#006916",
              marginBottom: "5px",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "'Paytone One', sans-serif",
            }}
          >
            Ajustes do Perfil
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

          {/* Renderização Condicional do Formulário */}
          {loadingProfile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress color="success" />
              <Typography sx={{ ml: 2, color: '#006916' }}>Carregando dados...</Typography>
            </Box>
          ) : profileError ? (
            <Box sx={{ textAlign: 'center', color: 'error.main', mt: 2 }}>
              <Typography>Erro ao carregar dados: {profileError.message}</Typography>
              <Typography variant="body2">Por favor, tente novamente.</Typography>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Box sx={{ display: "flex", gap: "15px" }}>
                <InputBase
                  placeholder="Nome Completo"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  sx={{
                    width: "100%", padding: "12px", border: "none", borderRadius: "8px",
                    backgroundColor: "#f0f0f0", color: "#333", fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                  }}
                />
                <InputBase
                  placeholder="CPF"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  inputComponent={CPFMaskCustom}
                  sx={{
                    width: "100%", padding: "12px", border: "none", borderRadius: "8px",
                    backgroundColor: "#f0f0f0", color: "#333", fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <InputBase
                  placeholder="Telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  inputComponent={PhoneMaskCustom}
                  sx={{
                    width: "95%", padding: "12px", border: "none", borderRadius: "8px",
                    backgroundColor: "#f0f0f0", color: "#333", fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                  }}
                />
                <FormControl
                  fullWidth
                  sx={{
                    borderRadius: "8px", color: "#333", alignItems: "center", backgroundColor: "#f0f0f0",
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  }}
                >
                  <Select
                    value={escolaridade}
                    onChange={(e) => setEscolaridade(e.target.value)}
                    displayEmpty sx={{
                      width: "100%", height: "55px", borderRadius: "8px", backgroundColor: "#f0f0f0",
                      color: "#333", border: 'none', fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                      display: "flex", alignItems: "center",
                      '& .MuiSelect-select': { padding: "0 12px", height: "100%", display: "flex", alignItems: "center" }
                    }} renderValue={
                      escolaridade !== '' ? undefined : () => <span style={{ color: '#a0a0a0', fontFamily: "'Paytone One', sans-serif", fontSize: '14px', display: 'flex', alignItems: 'center', height: '100%' }}>Escolaridade</span>
                    }
                  >
                    <MenuItem value="Nenhuma">Nenhuma</MenuItem>
                    <MenuItem value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</MenuItem>
                    <MenuItem value="Ensino Fundamental Completo">Ensino Fundamental Completo</MenuItem>
                    <MenuItem value="Ensino Médio Incompleto">Ensino Médio Incompleto</MenuItem>
                    <MenuItem value="Ensino Médio Completo">Ensino Médio Completo</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <InputBase
                  placeholder="Data de nascimento (DD-MM-AAAA)" // Placeholder atualizado
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  inputComponent={DateMaskCustom} // USANDO O COMPONENTE DE MÁSCARA AQUI
                  sx={{
                    width: "95%", padding: "12px", border: "none", borderRadius: "8px",
                    backgroundColor: "#f0f0f0", color: "#333", fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                  }}
                />
                <FormControl
                  fullWidth
                  sx={{
                    borderRadius: "8px", color: "#333", alignItems: "center", backgroundColor: "#f0f0f0",
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  }}
                >
                  <Select
                    value={estadoCivil}
                    onChange={(e) => setEstadoCivil(e.target.value)}
                    displayEmpty sx={{
                      width: "100%", height: "55px", borderRadius: "8px", backgroundColor: "#f0f0f0",
                      color: "#333", border: 'none', fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                      display: "flex", alignItems: "center",
                      '& .MuiSelect-select': { padding: "0 12px", height: "100%", display: "flex", alignItems: "center" }
                    }} renderValue={
                      estadoCivil !== '' ? undefined : () => <span style={{ color: '#a0a0a0', fontFamily: "'Paytone One', sans-serif", fontSize: '14px', display: 'flex', alignItems: 'center', height: '100%' }}>Estado Civil</span>
                    }
                  >
                    <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
                    <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                    <MenuItem value="Separado(a) Judicialmente">Separado(a) Judicialmente</MenuItem>
                    <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                    <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
                    <MenuItem value="União Estável">União Estável</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", gap: "15px" }}>
                <InputBase
                  placeholder="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  sx={{
                    width: "100%", padding: "12px", border: "none", borderRadius: "8px",
                    backgroundColor: "#f0f0f0", color: "#333", fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                  }}
                />
                <InputBase
                  placeholder="Cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  sx={{
                    width: "100%", padding: "12px", border: "none", borderRadius: "8px",
                    backgroundColor: "#f0f0f0", color: "#333", fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                  }}
                />
              </Box>
              <InputBase
                placeholder="Biografia"
                name="biografia"
                value={formData.biografia}
                onChange={handleInputChange}
                multiline
                rows={3}
                sx={{
                  width: "100%", padding: "12px", border: "none", borderRadius: "8px",
                  backgroundColor: "#f0f0f0", color: "#333", fontFamily: "'Paytone One', sans-serif", fontSize: "14px",
                }}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#006916", color: "white", padding: "15px", borderRadius: "8px",
                  fontSize: "16px", fontWeight: "bold", marginTop: "10px", fontFamily: "'Paytone One', sans-serif",
                  textTransform: "none",
                  '&:hover': { backgroundColor: "#004d12" },
                }}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Finalizar Cadastro"}
              </Button>
            </Box>
          )}
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;