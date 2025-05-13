import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Alert,
} from "@mui/material";

export default function CadastroEmpresa() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [mensagem, setMensagem] = useState("");

  const validarCNPJ = async (cnpj) => {
    try {
      const response = await fetch(
        `https://publica.cnpj.ws/cnpj/${cnpj.replace(/\D/g, "")}`
      );
      const data = await response.json();
      if (!data || !data.razao_social) {
        // Verifica se o CNPJ é inválido ou não existe
        setMensagem("CNPJ inválido! O CNPJ não existe.");
        return false;
      }
      setMensagem("");
      return true;
    } catch (error) {
      console.error("Erro ao validar o CNPJ:", error);
      setMensagem("Erro ao validar o CNPJ.");
      return false;
    }
  };

  const formatarCNPJ = (cnpj) => {
    return cnpj
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handleCnpjChange = (e) => {
    let cnpj = e.target.value.replace(/\D/g, "");
    if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);
    setCnpj(formatarCNPJ(cnpj));
    if (cnpj.length === 14) {
      validarCNPJ(cnpj);
    }
  };

  const handleCepChange = (e) => {
    let cep = e.target.value.replace(/\D/g, "");
    if (cep.length > 5) {
      setCep(`${cep.slice(0, 5)}-${cep.slice(5, 8)}`);
    } else {
      setCep(cep);
    }
  };

  const handleBlurCep = async () => {
    let cepValue = cep.replace(/\D/g, "");
    if (cepValue.length !== 8) {
      setMensagem("CEP inválido! Deve conter 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepValue}/json/`
      );
      const data = await response.json();
      if (data.erro) {
        setEndereco("CEP não encontrado!");
        return;
      }
      const enderecoFormatado = `${data.logradouro} - ${data.bairro}, ${data.localidade} - ${data.uf}`;
      setEndereco(enderecoFormatado);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setEndereco("Erro ao buscar o endereço. Tente novamente.");
    }
  };

  const validarCadastroEmpresa = async () => {
    if (
      !nome ||
      !email ||
      !cep ||
      !senha ||
      !numero ||
      !endereco ||
      !cnpj ||
      !confirmarSenha
    ) {
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
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valido = await validarCadastroEmpresa();
    if (!valido) return;

    const dados = { nome, email, senha, cep, numero, endereco, cnpj };
    try {
      const response = await fetch("http://localhost:8080/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!response.ok) throw new Error("Erro ao cadastrar usuário.");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Container
      maxWidth="sm"
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
        Cadastre a sua empresa
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            ["Nome", nome, setNome],
            ["E-mail", email, setEmail, "email"],
          ].map(([label, value, setter, type = "text"], index) => (
            <Grid item xs={12} key={index}>
              <TextField
                fullWidth
                label={label}
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "50px",
                    marginLeft: "5px",
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
          ))}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CEP"
              value={cep}
              onChange={handleCepChange} // Uses handleCepChange function
              onBlur={handleBlurCep} // Uses handleBlurCep function
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  marginLeft: "5px",
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
              label="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  marginLeft: "5px",
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="CNPJ"
              value={cnpj}
              onChange={handleCnpjChange} // Uses handleCnpjChange function
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  marginLeft: "5px",
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

          {[["Endereço", endereco, setEndereco]].map(
            ([label, value, setter], index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  label={label}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "50px",
                      marginLeft: "5px",
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
            )
          )}
          {[
            ["Senha", senha, setSenha],
            ["Confirmação de senha", confirmarSenha, setConfirmarSenha],
          ].map(([label, value, setter], index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={label}
                type="password"
                value={value}
                onChange={(e) => setter(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "50px",
                    marginLeft: "5px",
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
          ))}
        </Grid>

        <Box mt={2}>
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              height: "50px",
              width: "530px",
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
              severity="error"
              sx={{ fontWeight: "bold", color: "var(--dark-green)" }}
            >
              {mensagem}
            </Alert>
          </Box>
        )}

        <Box mt={2} textAlign="center">
          <Typography variant="body2" sx={{ color: "var(--text-dark)" }}>
            Você já possui uma conta?{" "}
            <Link
              to="/login"
              style={{ color: "var(--dark-green)", fontWeight: "bold" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
}
