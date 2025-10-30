import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const AtualizarSenhaPage = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const validarAtualizacaoSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      setMensagem("Todos os campos devem ser preenchidos.");
      return false;
    }
    if (novaSenha.length < 8) {
      setMensagem("A nova senha deve ter pelo menos 8 caracteres.");
      return false;
    }
    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return false;
    }
    setMensagem("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validarAtualizacaoSenha()) return;

    console.log("Nova senha definida com sucesso:", novaSenha);
    alert("Senha atualizada com sucesso!");
  };

  return (
    <Box
      sx={{
        "--light-green": "#E5EEE3",
        "--dark-green": "#006916",
        "--white": "#FFFFFF",
        "--text-dark": "#333333",
        "--text-gray": "#888888",
        backgroundColor: "var(--light-green)",
        padding: "60px 40px 40px",
        borderRadius: "30px",
        width: "100%",
        maxWidth: "400px",
        position: "relative",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        textAlign: "center",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "var(--dark-green)",
          color: "var(--white)",
          padding: "15px 50px",
          borderRadius: "0 0 30px 30px",
          fontFamily: "Paytone One, sans-serif",
          fontWeight: "bold",
        }}
      >
        <LockIcon sx={{ fontSize: 30 }} />
      </Box>

      <Typography
        variant="h6"
        component="h2"
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          fontSize: "1.5rem",
          color: "var(--dark-green)",
          fontFamily: "Paytone One, sans-serif",
          fontWeight: "bold",
        }}
      >
        Atualizar Senha
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Nova Senha"
            type={mostrarSenha ? "text" : "password"}
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 1 }}>
                  <LockIcon />
                </InputAdornment>
              ),
              sx: {
                height: "50px",
                borderRadius: "15px",
                backgroundColor: "var(--white)",
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
              },
            }}
          />

          <TextField
            fullWidth
            label="Confirmar Nova Senha"
            type={mostrarSenha ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 1 }}>
                  <LockIcon />
                </InputAdornment>
              ),
              sx: {
                height: "50px",
                borderRadius: "15px",
                backgroundColor: "var(--white)",
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
              },
            }}
          />

          {mensagem && (
            <Alert
              severity="error"
              sx={{ fontWeight: "bold", color: "var(--dark-green)" }}
            >
              {mensagem}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "10px",
              width: "100%",
              height: "50px",
              backgroundColor: "var(--dark-green)",
              color: "var(--white)",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "12px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#00550f",
              },
            }}
          >
            Atualizar Senha
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AtualizarSenhaPage;
