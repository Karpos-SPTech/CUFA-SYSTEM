import React, { useEffect } from "react";
import { Box, Typography, Card } from "@mui/material";
import { useSavedItems } from "./SavedItemsContext";
import JobCard from "./JobCard";
import Header from "./Header";
import mcdonaldsLogo from "../assets/mcdonalds-logo.png";

const SavedItemsPage = () => {
  const { savedItems } = useSavedItems();

  useEffect(() => {
    // Adiciona classes exclusivas para o CufaSistema
    document.body.style.backgroundColor = "#e9f1e7";

    return () => {
      // Limpeza: remove as classes quando o componente for desmontado
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#e9f1e7",
          minHeight: "100%",
        }}
      >
        {/* Contador de itens salvos */}
        <Card
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            textAlign: "center",
            width: "150px",
            height: "150px",
            fontFamily: "Arial, sans-serif",
            color: "#006916",
            borderTop: "5px solid #006916",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Meus itens
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            Vagas salvas
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {savedItems.length}
          </Typography>
        </Card>

        {/* Lista de itens salvos */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#006916",
              marginBottom: "20px",
            }}
          >
            Publicações Salvas
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            {savedItems.length > 0 ? (
              savedItems.map((item, index) => (
                <JobCard
                  key={index}
                  logo={item.logo || mcdonaldsLogo}
                  company={item.company || "Mc Donald's"}
                  type={item.type || "Fast Food | CLT"}
                  time={item.time || "Há 7 horas"}
                  title={item.title || "🍟 Vem Trabalhar no Méqui!"}
                  description={
                    item.description ||
                    "📋 Descrição da vaga: Atue na preparação dos lanches na chapa, com qualidade e agilidade. 🍔🔥."
                  }
                  functions={item.functions || ["Preparar lanches", "Manter a chapa em ordem", "Seguir padrão de qualidade"]}
                  benefits={item.benefits || ["🍽 Vale-refeição/alimentação", "🩺 Plano de saúde e odontológico", "🚌 Vale-transporte"]}
                />
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#777",
                  textAlign: "center",
                }}
              >
                Nenhuma vaga salva.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SavedItemsPage;