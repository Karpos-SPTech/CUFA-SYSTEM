import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/icon.png";

const ProfileCard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "120%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        marginLeft: "-150px",
        borderTop: "5px solid #4caf50",
      }}
    >
      <Box
        component="img"
        src={profilePic}
        alt="Guilherme Silva"
        sx={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #4caf50",
          backgroundColor: "white",
        }}
      />
      <Typography
        sx={{
          color: "#2e7d32",
          fontSize: "20px",
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
          lineHeight: "1.5",
        }}
      >
        Experiência como ajudante de obras, serviços gerais e entregas. Sempre
        disposto a aprender e crescer profissionalmente.
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          color: "#777",
          marginTop: "5px",
        }}
      >
        São Paulo, SP
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "10px",
          marginTop: "15px",
          color: "#006916",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={() => navigate("/saved-items")}
        >
          <i className="fas fa-bookmark"></i>
          <Typography>Itens salvos</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <i className="fas fa-users"></i>
          <Typography>Grupos</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;