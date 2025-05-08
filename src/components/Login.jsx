import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import googleLogo from '../assets/google-logo.png';
import microsoftLogo from '../assets/microsoft-logo.png';
import emailIcon from '../assets/Icon-Email.png';
import passwordIcon from '../assets/Icon-Senha.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  const toggleSenha = () => {
    setShowSenha(!showSenha);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/cufaSistema');
  };

  return (
    <Box
      sx={{
        '--light-green': '#E5EEE3',
        '--dark-green': '#006916',
        '--white': '#FFFFFF',
        '--text-dark': '#333333',
        '--text-gray': '#888888',
        backgroundColor: 'var(--light-green)',
        padding: '60px 40px 40px',
        borderRadius: '30px',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.25)',
        textAlign: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--dark-green)',
          color: 'var(--white)',
          padding: '15px 50px',
          borderRadius: '0 0 30px 30px',
          fontSize: '1.25rem',
          fontWeight: 'bold',
        }}
      >
        CUFA
      </Box>

      <Typography
        variant="h6"
        component="h2"
        sx={{
          marginTop: '80px',
          marginBottom: '30px',
          fontSize: '1.5rem',
          color: 'var(--dark-green)',
          fontFamily: 'Paytone One, sans-serif',
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
                <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
                  <img src={emailIcon} alt="Email Icon" style={{ width: 20, height: 20 }} />
                </InputAdornment>
              ),
              sx: {
                height: '50px',
                borderRadius: '15px',
                backgroundColor: 'var(--white)',
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
                paddingLeft: '0px',
              },
            }}
          />

          <TextField
            fullWidth
            label="Senha"
            type={showSenha ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginLeft: '10px' }}>
                  <img src={passwordIcon} alt="Password Icon" style={{ width: 20, height: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleSenha} edge="end">
                    {showSenha ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                height: '50px',
                borderRadius: '15px',
                backgroundColor: 'var(--white)',
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
                paddingLeft: '0px',
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              textAlign: 'right',
              fontSize: '0.85rem',
              color: 'var(--text-gray)',
              marginTop: '5px',
            }}
          >
            <Link to="#" style={{ textDecoration: 'none', color: 'var(--text-gray)' }}>
              Esqueceu sua senha?
            </Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: '10px',
              width: '100%',
              height: '50px',
              backgroundColor: 'var(--dark-green)',
              color: 'var(--white)',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderRadius: '12px',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
              '&:hover': {
                backgroundColor: '#00550f',
              },
            }}
          >
            Entrar
          </Button>

          <Typography
            variant="body2"
            sx={{
              marginTop: '15px',
              fontSize: '0.85rem',
              color: 'var(--text-gray)',
              textAlign: 'center',
            }}
          >
            Não tem uma conta?{' '}
            <Link to="/escolha" style={{ color: 'var(--dark-green)', fontWeight: 'bold' }}>
              Cadastre-se
            </Link>
          </Typography>

          <Divider sx={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-gray)' }}>
            Ou entre com
          </Divider>

          <Stack direction="row" spacing={2} sx={{ marginTop: '10px' }}>
            <Button
              variant="outlined"
              startIcon={<img src={googleLogo} alt="Google" style={{ width: 20, height: 20 }} />}
              sx={{
                flex: 1,
                height: '45px',
                borderRadius: '12px',
                fontWeight: 'bold',
                color: 'var(--text-dark)',
                fontSize: '0.95rem',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<img src={microsoftLogo} alt="Microsoft" style={{ width: 20, height: 20 }} />}
              sx={{
                flex: 1,
                height: '45px',
                borderRadius: '12px',
                fontWeight: 'bold',
                color: 'var(--text-dark)',
                fontSize: '0.95rem',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              Microsoft
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}