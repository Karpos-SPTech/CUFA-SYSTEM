import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import emailIcon from "../assets/Icon-Email.png";
import passwordIcon from "../assets/Icon-Senha.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const toggleSenha = () => {
    setShowSenha(!showSenha);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      setMensagem("Por favor, insira um email válido.");
      return;
    }

    const loginData = { email, senha };

    try {
      let response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Usuário logado com sucesso:", user);

        // Armazena o ID do usuário no localStorage
        localStorage.setItem("userId", user.id);
        localStorage.setItem("token", user.token); // <--- Adição aqui

        navigate("/telaUsuario");
        return;
      }

      // ... (restante do seu código para login de empresas/funcionários)
      response = await fetch("http://localhost:8080/api/empresas/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
      });

      if (response.ok) {
        const empresa = await response.json();
        console.log("Empresa logada com sucesso:", empresa);
        // Se quiser guardar o ID da empresa também
        localStorage.setItem("empresaId", empresa.id);
        localStorage.setItem("empresaNome", empresa.nome); // Exemplo para empresa
        navigate("/telaEmpresa");
        return;
      }

      response = await fetch("http://localhost:8080/api/funcionarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const funcionario = await response.json();
        console.log("Funcionário logado com sucesso:", funcionario);
        // Se quiser guardar o ID do funcionário
        localStorage.setItem("funcionarioId", funcionario.id);
        localStorage.setItem("funcionarioId", funcionario.token); // Exemplo para funcionário
        navigate("/telaEmpresa");
        return;
      }


      setMensagem("Email ou senha incorretos.");

    } catch (error) {
      console.error("Erro ao realizar o login:", error);
      setMensagem("Erro ao tentar fazer login. Tente novamente.");
    }

  };

  // O retorno do JSX deve estar FORA da função handleSubmit
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
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginLeft: "10px" }}>
                  <img
                    src={emailIcon}
                    alt="Email Icon"
                    style={{ width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
              sx: {
                height: "50px",
                borderRadius: "15px",
                backgroundColor: "var(--white)",
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                paddingLeft: "0px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Senha"
            type={showSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginLeft: "10px" }}>
                  <img
                    src={passwordIcon}
                    alt="Password Icon"
                    style={{ width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                </InputAdornment>
              ),
              sx: {
                height: "50px",
                borderRadius: "15px",
                backgroundColor: "var(--white)",
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                paddingLeft: "0px",
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              textAlign: "right",
              fontSize: "0.85rem",
              color: "var(--text-gray)",
              marginTop: "5px",
            }}
          >
            <Link
              component={RouterLink}
              to="/AtualizarSenha"
              sx={{
                textDecoration: "none",
                color: "var(--dark-green)",
                "&:hover": {
                  color: "blue",
                },
              }}
            >
              Esqueceu sua senha?
            </Link>
          </Typography>
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
            Entrar
          </Button>

          <Typography
            variant="body2"
            sx={{
              marginTop: "15px",
              fontSize: "0.85rem",
              color: "var(--text-gray)",
              textAlign: "center",
            }}
          >
            Não tem uma conta?{" "}
            <Link
              component={RouterLink}
              to="/Escolha"
              style={{ color: "var(--dark-green)", fontWeight: "bold" }}
            >
              Cadastre-se
            </Link>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
}