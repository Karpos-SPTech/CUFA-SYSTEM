import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

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
    if (!/[A-Z]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos uma letra maiúscula.");
      return false;
    }
    if (!/\d/.test(senha)) {
      setMensagem("A senha deve conter pelo menos um número.");
      return false;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos um caractere especial.");
      return false;
    }
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return false;
    }
    setMensagem('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCadastroUsuario()) return;

    const dados = { nome, email, senha };
    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (!response.ok) throw new Error("Erro ao cadastrar usuário.");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Box
      sx={{
        '--light-green': '#E5EEE3',
        '--dark-green': '#006916',
        '--white': '#F1F1F1',
        '--text-dark': '#333333',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
        padding: '50px 40px',
        backgroundColor: 'var(--light-green)',
        borderRadius: '30px',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -1%)',
          backgroundColor: 'var(--dark-green)',
          color: 'var(--white)',
          padding: '10px 40px',
          borderRadius: '0 0 20px 20px',
          fontSize: '1.25rem',
          fontWeight: 'bold',
        }}
      >
        CUFA
      </Box>

      <Typography
        variant="h2"
        sx={{
          marginTop: '20px',
          marginBottom: '30px',
          color: 'var(--dark-green)',
          fontSize: '1.1rem',
        }}
      >
        Crie a sua conta
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <TextField
            fullWidth
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            InputProps={{
              style: {
                height: '50px',
                padding: '0 20px',
                borderRadius: '25px',
                backgroundColor: 'var(--white)',
                fontSize: '1rem',
                color: 'var(--dark-green)',
              },
            }}
          />
          <TextField
            fullWidth
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: {
                height: '50px',
                padding: '0 20px',
                borderRadius: '25px',
                backgroundColor: 'var(--white)',
                fontSize: '1rem',
                color: 'var(--dark-green)',
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: '16px' }}>
          <TextField
            fullWidth
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            InputProps={{
              style: {
                height: '50px',
                padding: '0 20px',
                borderRadius: '25px',
                backgroundColor: 'var(--white)',
                fontSize: '1rem',
                color: 'var(--dark-green)',
              },
            }}
          />
          <TextField
            fullWidth
            type="password"
            placeholder="Confirmação de senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            InputProps={{
              style: {
                height: '50px',
                padding: '0 20px',
                borderRadius: '25px',
                backgroundColor: 'var(--white)',
                fontSize: '1rem',
                color: 'var(--dark-green)',
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          sx={{
            marginTop: '10px',
            height: '50px',
            width: '100%',
            backgroundColor: 'var(--dark-green)',
            color: 'var(--white)',
            borderRadius: '25px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#00550f',
            },
          }}
        >
          Cadastrar
        </Button>

        {mensagem && (
          <Typography sx={{ color: 'red', marginTop: '10px' }}>
            {mensagem}
          </Typography>
        )}

        <Typography
          sx={{
            marginTop: '15px',
            fontSize: '0.9rem',
            color: 'var(--text-dark)',
          }}
        >
          Você já possui uma conta?{' '}
          <Link
            to="/"
            style={{
              color: 'var(--dark-green)',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}