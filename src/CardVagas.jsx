import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";

export default function Publicacoes() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para buscar as publicações
  useEffect(() => {
    const fetchPublicacoes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8080/publicacao/all");

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
          setPublicacoes(null); // Indica que não há publicações
        } else {
          setPublicacoes(data);
        }
      } catch (err) {
        console.error("Erro ao buscar publicações:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacoes();
  }, []);

  // --- Exibição de carregamento ---
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <CircularProgress color="success" />
        <Typography sx={{ ml: 2, color: "#006916" }}>Carregando publicações...</Typography>
      </Box>
    );
  }

  // --- Exibição de erro ---
  if (error) {
    return (
      <Box sx={{ maxWidth: 350, p: 2, border: "1px solid red", borderRadius: 3, textAlign: "center" }}>
        <Typography color="error">Erro: {error.message}</Typography>
        <Typography variant="body2" color="text.secondary">Não foi possível carregar as publicações.</Typography>
      </Box>
    );
  }

  // --- Se não houver publicações ---
  if (!publicacoes) {
    return (
      <Box sx={{ maxWidth: 350, p: 2, borderRadius: 3, textAlign: "center" }}>
        <Typography color="text.secondary">Não há publicações disponíveis.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 420, margin: "0 auto" }}>
      {publicacoes.map((publicacao) => (
        <Card key={publicacao.idPublicacao} sx={{ borderRadius: 3, boxShadow: 3, p: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "green" }}>
              {publicacao.nomeEmpresa}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tipo de contrato: {publicacao.tipoContrato}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Publicado em: {new Date(publicacao.dtPublicacao).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {publicacao.descricao}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
