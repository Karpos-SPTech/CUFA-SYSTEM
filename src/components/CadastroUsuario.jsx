import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Grid, Alert } from "@mui/material";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const validarCadastroUsuario = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem("Todos os campos devem ser preenchidos.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setMensagem("Por favor, insira um email válido.");
      return false;
    }
    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return false;
    }
    if (!/[A-Za-z]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos uma letra.");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos um caractere especial.");
      return false;
    }
    if (/\d/.test(nome)) {
      setMensagem("O nome não pode conter números.");
      return false;
    }

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return false;
    }
    setMensagem("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCadastroUsuario()) return;

    const dados = { nome, email, senha };
    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (response.status === 201 || response.ok) {
        setMensagem("Cadastro realizado com sucesso!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return;
      }

      // Tenta obter erro da resposta
      const responseData = await response.text();
      let errorMessage = "Erro ao cadastrar usuário.";
      try {
        const errorJson = JSON.parse(responseData);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        errorMessage = responseData || errorMessage;
      }

      throw new Error(errorMessage);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem(error.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <Box
      sx={{
        "--light-green": "#E5EEE3",
        "--dark-green": "#006916",
        "--white": "#F1F1F1",
        "--text-dark": "#333333",
        backgroundColor: "var(--light-green)",
        padding: "50px 40px",
        borderRadius: "30px",
        textAlign: "center",
        mt: 5,
        position: "relative",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translate(-50%, -1%)",
          backgroundColor: "var(--dark-green)",
          color: "var(--white)",
          padding: "10px 40px",
          borderRadius: "0 0 20px 20px",
          fontSize: "1.25rem",
          fontWeight: "bold",
          fontFamily: "Paytone One, sans-serif",
        }}
      >
        CUFA
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
        Acesse sua conta
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          {/* Nome e Email lado a lado */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  borderRadius: "25px",
                  backgroundColor: "var(--white)",
                  padding: "0 20px",
                  color: "var(--dark-green)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--dark-green)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  borderRadius: "25px",
                  backgroundColor: "var(--white)",
                  padding: "0 20px",
                  color: "var(--dark-green)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--dark-green)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          </Grid>

          {/* Senha e Confirmação lado a lado */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  borderRadius: "25px",
                  backgroundColor: "var(--white)",
                  padding: "0 20px",
                  color: "var(--dark-green)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--dark-green)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Confirmação de senha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  borderRadius: "25px",
                  backgroundColor: "var(--white)",
                  padding: "0 20px",
                  color: "var(--dark-green)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--dark-green)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              height: "50px",
              width: "94%",
              backgroundColor: "var(--dark-green)",
              color: "var(--white)",
              fontWeight: "bold",
              fontSize: "1.2rem",
              borderRadius: "25px",
              "&:hover": { backgroundColor: "#00550f" },
            }}
          >
            Cadastrar
          </Button>
        </Box>

        {mensagem && (
          <Box mt={2}>
            <Alert
              severity={mensagem.includes("sucesso") ? "success" : "error"}
              sx={{
                fontWeight: "bold",
                color: mensagem.includes("sucesso") ? "var(--dark-green)" : "#d32f2f"
              }}
            >
              {mensagem}
            </Alert>
          </Box>
        )}

        <Box mt={2} textAlign="center">
          <Typography variant="body2" sx={{ color: "var(--text-dark)" }}>
            Você já possui uma conta?{" "}
            <Link
              to="/"
              style={{ color: "var(--dark-green)", fontWeight: "bold" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
