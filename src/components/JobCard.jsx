import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useSavedItems } from "../components/SavedItemsContext";

const JobCard = ({ logo, company, type, time, title, description, functions, benefits }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { addSavedItem, removeSavedItem } = useSavedItems();

  const toggleSave = () => {
    const jobData = { logo, company, type, time, title, description, functions, benefits };
    if (isSaved) {
      removeSavedItem(jobData);
    } else {
      addSavedItem(jobData);
    }
    setIsSaved(!isSaved);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        gap: "20px",
      }}
    >
      {/* Cabeçalho do cartão */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt={company}
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "10px",
          }}
        />
        <Box
          sx={{
            flex: 1,
            marginLeft: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              color: "#006916",
              fontWeight: "bold",
              marginBottom: "-5px",
              textAlign: "start",
            }}
          >
            {company}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#666",
              textAlign: "start",
            }}
          >
            {type} | {time}
          </Typography>
        </Box>
        <IconButton onClick={toggleSave}>
          <Box
            component="i"
            className={`fas fa-bookmark ${isSaved ? "saved" : "unsaved"}`}
            sx={{
              fontSize: "20px",
              border: "2px solid white",
              borderRadius: "5px",
              padding: "5px",
              color: isSaved ? "white" : "#006916",
              backgroundColor: isSaved ? "#006916" : "white",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        </IconButton>
      </Box>

      {/* Título da vaga */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
          color: "#006916",
          marginTop: "10px",
          marginBottom: "-20px",
        }}
      >
        {title}
      </Typography>

      {/* Descrição da vaga */}
      <Box
        sx={{
          backgroundColor: "#e9f1e7",
          margin: "20px 0",
          padding: "20px",
          borderRadius: "8px",
          fontSize: "14px",
          lineHeight: "1.6",
          textAlign: "start",
        }}
      >
        <Typography>
          <strong>🍔 Vaga de Chapeiro – McDonald's</strong>
        </Typography>
        <Typography>{description}</Typography>
        <Typography>
          <strong>👨‍🍳 Suas atividades:</strong>
        </Typography>
        <Box component="ul" sx={{ paddingLeft: "20px", marginBottom: "10px" }}>
          {functions.map((func, index) => (
            <Box component="li" key={index}>
              {func}
            </Box>
          ))}
        </Box>
        <Typography>
          <strong>Benefícios:</strong>
        </Typography>
        <Box component="ul" sx={{ paddingLeft: "20px", marginBottom: "10px" }}>
          {benefits.map((benefit, index) => (
            <Box component="li" key={index}>
              {benefit}
            </Box>
          ))}
        </Box>
        <Typography>
          <em>✨ Venha fazer parte do time que é referência em sabor e agilidade! #VemProMéqui</em>
        </Typography>
      </Box>

      {/* Botão de candidatura */}
      <Button
        sx={{
          marginTop: "auto",
          padding: "15px",
          backgroundColor: "#006916",
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: "18px",
          borderRadius: "10px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#004d12",
          },
        }}
      >
        ME CANDIDATAR
      </Button>
    </Box>
  );
};

export default JobCard;