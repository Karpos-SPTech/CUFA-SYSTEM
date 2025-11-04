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
  const [area, setArea] = useState("");
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
      !area ||
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
    if (senha.length > 60) {  // Adicionando limite máximo para senha
      setMensagem("A senha não pode ter mais que 60 caracteres.");
      return false;
    }
    if (!/[A-Za-z]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos uma letra.");
      return false;
    }
    if (/\d/.test(nome)) {
      setMensagem("O nome não pode conter números.");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos um caractere especial.");
      return false;
    }

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return false;
    }
    return true;
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(""); // Limpa mensagens existentes
    
    try {
      // Primeiro valida o formulário
      const isValid = await validarCadastroEmpresa();
      if (!isValid) {
        return; // Se não for válido, retorna mantendo a mensagem de validação
      }

      // Valida o CNPJ antes de enviar
      const cnpjValido = await validarCNPJ(cnpj);
      if (!cnpjValido) {
        return; // Retorna se o CNPJ for inválido
      }

      // Remove formatação do CEP e CNPJ
      const cepLimpo = cep.replace(/\D/g, "");
      const cnpjLimpo = cnpj.replace(/\D/g, "");

      const dados = {
        nome,
        email,
        senha,
        cep: cepLimpo,
        numero,
        endereco,
        cnpj: cnpjLimpo,
        area,
        biografia: "",
        dtCadastro: new Date().toISOString().split('T')[0]
      };

      const response = await fetch("/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      
      const responseData = await response.text();
      let responseJson;
      
      try {
        responseJson = JSON.parse(responseData);
      } catch (e) {
        // Se não for JSON válido, usa o texto como está
        responseJson = { message: responseData };
      }

      if (response.status === 201) {
        setMensagem("Cadastro realizado com sucesso!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return;
      }

      // Tratamento específico para diferentes tipos de erro
      if (responseJson.message) {
        if (responseJson.message.includes("já existe")) {
          setMensagem(responseJson.message);
        } else if (responseJson.message.includes("Falha em cadastrar empresa")) {
          const match = responseJson.message.match(/Falha em cadastrar empresa: (.*)/);
          setMensagem(match ? match[1] : responseJson.message);
        } else {
          setMensagem(responseJson.message);
        }
      } else {
        setMensagem("Erro ao cadastrar empresa. Por favor, verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar empresa:", error);
      setMensagem("Erro de conexão. Por favor, tente novamente mais tarde.");
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
                    marginLeft: "10px",
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
                  marginLeft: "10px",
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
                  marginLeft: "10px",
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

          <Grid item sx={{ width: '93%' }}>
            <TextField
              fullWidth
              label="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  marginLeft: "10px",
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


          {/* CNPJ já foi movido para outra posição */}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Área de Atuação"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  marginLeft: "10px",
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
              label="CNPJ"
              value={cnpj}
              onChange={handleCnpjChange}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  marginLeft: "10px",
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
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px",
                  marginLeft: "10px",
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
                  marginLeft: "10px",
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
    </Container>
  );
}