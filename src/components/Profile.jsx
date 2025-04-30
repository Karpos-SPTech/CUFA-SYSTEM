import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import profilePic from "../assets/icon.png";
import Header from "./Header";

const Profile = () => {
  useEffect(() => {
    // Adiciona estilos globais ao body
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#e9f1e7";

    return () => {
      // Remove estilos globais ao desmontar o componente
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          padding: "20px",
          backgroundColor: "#e9f1e7",
          alignItems: "start",
        }}
      >
        {/* Cartão de Perfil */}
        <Box
          sx={{
            position: "relative",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#4caf50",
              height: "100px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Button
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "18px",
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  color: "#ddd",
                },
              }}
            >
              <i className="fas fa-pen"></i>
            </Button>
          </Box>
          <Box
            component="img"
            src={profilePic}
            alt="Guilherme Silva"
            sx={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid white",
              marginTop: "-50px",
              backgroundColor: "white",
              position: "relative",
              zIndex: 2,
            }}
          />
          <Typography
            sx={{
              color: "#2e7d32",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "10px 0 5px",
            }}
          >
            GUILHERME SILVA
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#555",
              margin: "5px 0",
            }}
          >
            "Pessoa dedicada, comunicativa e sempre em busca de aprendizado. Valoriza o respeito e a honestidade nas relações."
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#777",
              marginTop: "10px",
            }}
          >
            São Paulo, SP
          </Typography>
        </Box>

        {/* Seção Experiência */}
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              borderBottom: "2px solid #006916",
              paddingBottom: "10px",
            }}
          >
            <Typography
              sx={{
                color: "#006916",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Experiência
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "22px",
                  color: "#006916",
                  cursor: "pointer",
                }}
              >
                +
              </Typography>
              <Typography
                sx={{
                  fontSize: "22px",
                  color: "#006916",
                  cursor: "pointer",
                }}
              >
                ✎
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              maxHeight: "250px",
              overflowY: "auto",
            }}
          >
            {[{
              title: "Função",
              description: "Serviços Gerais",
              location: "Rio de Janeiro, RJ",
              period: "02/2020 - 01/2021",
            }, {
              title: "Função",
              description: "Entregador – App Delivery",
              location: "Rio de Janeiro, RJ",
              period: "04/2019 - 12/2019",
            }].map((exp, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "10px",
                  marginTop: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  borderLeft: "4px solid #006916",
                }}
              >
                <Box
                  component="img"
                  src={profilePic}
                  alt="Ícone"
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#e9f1e7",
                    border: "2px solid #006916",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#006916",
                      margin: 0,
                    }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#555",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    {exp.description}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#555",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    {exp.location}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#555",
                      margin: 0,
                      lineHeight: "1.5",
                    }}
                  >
                    {exp.period}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Seção Sobre */}
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <Typography
            sx={{
              color: "#006916",
              fontSize: "18px",
              marginBottom: "15px",
            }}
          >
            Sobre
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#555",
              lineHeight: "1.8",
              textAlign: "justify",
            }}
          >
            Tenho experiência como ajudante de obras, em serviços gerais e com entregas.
            Sou uma pessoa dedicada, responsável e sempre disposta a aprender novas funções.
            Busco crescer profissionalmente e contribuir de forma positiva por onde passo,
            com vontade de evoluir e fazer a diferença no ambiente de trabalho.
          </Typography>
        </Box>

        {/* Seção Currículo */}
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "450px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #006916",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            <Typography
              sx={{
                color: "#006916",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Currículo
            </Typography>
            <Typography
              sx={{
                fontSize: "22px",
                color: "#006916",
                cursor: "pointer",
              }}
            >
              ✎
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              color: "#555",
              lineHeight: "1.6",
              overflowY: "auto",
              maxHeight: "200px",
              marginBottom: "20px",
            }}
          >
            <Typography>
              <strong>Nome:</strong> Guilherme Silva
            </Typography>
            <Typography>
              <strong>Contato:</strong> (11) 99999-9999
            </Typography>
            <Typography>
              <strong>Email:</strong> guilherme@email.com
            </Typography>
            <Typography>
              <strong>Resumo:</strong>
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            </Typography>
            <Typography>
              <strong>Habilidades:</strong>
            </Typography>
            <Box component="ul" sx={{ margin: "10px 0", paddingLeft: "20px" }}>
              <Box component="li">Trabalho em equipe</Box>
              <Box component="li">Proatividade</Box>
              <Box component="li">Comunicação</Box>
            </Box>
            <Typography>
              <strong>Experiência:</strong>
            </Typography>
            <Box component="ul" sx={{ margin: "10px 0", paddingLeft: "20px" }}>
              <Box component="li">Empresa X (2024 - Atual)</Box>
              <Box component="li">Lorem ipsum dolor sit amet</Box>
              <Box component="li">Consectetur adipiscing elit</Box>
            </Box>
            <Typography>
              <strong>Educação:</strong>
            </Typography>
            <Box component="ul" sx={{ margin: "10px 0", paddingLeft: "20px" }}>
              <Box component="li">Lorem Ipsum University (2023 - 2025)</Box>
            </Box>
          </Box>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#006916",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#004d12",
              },
            }}
          >
            <span>Anexar</span>
            <i className="fas fa-paperclip" style={{ marginLeft: "10px", fontSize: "18px" }}></i>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;