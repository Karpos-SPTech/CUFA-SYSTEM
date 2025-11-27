import React from "react";
import { Box, Typography, Button, Card, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import usuarioImage from "../assets/usuario.png";
import empresaImage from "../assets/empresa.png";

export default function EscolherPerfil() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#006916",
      }}
    >
      <Box
        sx={{
          "--light-green": "#E5EEE3",
          backgroundColor: "var(--light-green)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "40px",
          height: "500px",
          maxWidth: "600px",
          width: "100%",
          borderRadius: "30px",
          padding: "30px",
        }}
      >
        {/* Cabeçalho */}
        <Box
          sx={{
            backgroundColor: "#006916",
            transform: "translate(0, -65%)",
            padding: "10px 50px",
            color: "white",
            fontSize: "1.5rem",
            borderBottomLeftRadius: "25px",
            borderBottomRightRadius: "25px",
            marginBottom: "20px",
            fontWeight: "bold",
            fontFamily: "Paytone One, sans-serif",
          }}
        >
          CUFA
        </Box>

        {/* Título */}
        <Typography
          variant="h2"
          sx={{
            color: "#006916",
            fontWeight: "bold",
            marginBottom: "40px",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          Escolha seu perfil e comece agora!
        </Typography>

        {/* Cartões de escolha */}
        <Box
          sx={{
            display: "flex",
            gap: "50px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Cartão Usuário */}
          <Card
            sx={{
              backgroundColor: "#006916",
              padding: "20px",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardMedia
              component="img"
              image={usuarioImage}
              alt="Usuário"
              sx={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            />
            <Link to="/cadastroUsuario" style={{ textDecoration: "none" }}>
              <Button
                aria-label="Escolher perfil de usuário"
                sx={{
                  backgroundColor: "white",
                  color: "#006916",
                  fontWeight: "bold",
                  padding: "10px 30px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#005f00",
                    color: "white",
                  },
                }}
              >
                CANDIDATO
              </Button>
            </Link>
          </Card>

          {/* Cartão Empresa */}
          <Card
            sx={{
              backgroundColor: "#006916",
              padding: "20px",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardMedia
              component="img"
              image={empresaImage}
              alt="Empresa"
              sx={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            />
            <Link to="/cadastroEmpresa" style={{ textDecoration: "none" }}>
              <Button
                aria-label="Escolher perfil de empresa"
                sx={{
                  backgroundColor: "white",
                  color: "#006916",
                  fontWeight: "bold",
                  padding: "10px 30px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#005f00",
                    color: "white",
                  },
                }}
              >
                EMPRESA
              </Button>
            </Link>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
