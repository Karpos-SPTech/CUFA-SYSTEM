import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import emailIcon from "../assets/Icon-Email.png";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você chamaria a API de redefinição de senha
    console.log("E-mail enviado para redefinição:", email);
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
        <LockResetIcon sx={{ fontSize: 30 }} />
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
        Redefinir Senha
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Endereço de Email"
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

          <Link to="/AtualizarSenhaPage" style={{ textDecoration: "none" }}>
            <Button
              type="button" // não "submit", pois não queremos que envie o formulário
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
              Enviar Link de Redefinição
            </Button>
          </Link>
        </Stack>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;
