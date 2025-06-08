import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  Stack,
  List,
  ListItem,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// Helper: tempo atrás
const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `Há ${Math.floor(interval)} ${Math.floor(interval) === 1 ? "ano" : "anos"}`;
  interval = seconds / 2592000;
  if (interval > 1) return `Há ${Math.floor(interval)} ${Math.floor(interval) === 1 ? "mês" : "meses"}`;
  interval = seconds / 86400;
  if (interval > 1) return `Há ${Math.floor(interval)} ${Math.floor(interval) === 1 ? "dia" : "dias"}`;
  interval = seconds / 3600;
  if (interval > 1) return `Há ${Math.floor(interval)} ${Math.floor(interval) === 1 ? "hora" : "horas"}`;
  interval = seconds / 60;
  if (interval > 1) return `Há ${Math.floor(interval)} ${Math.floor(interval) === 1 ? "minuto" : "minutos"}`;
  return "Há alguns segundos";
};

// Formato BR para datas
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Quebra descrição em partes
const formatarDescricao = (descricao) => {
  if (!descricao) return { descricaoGeral: "", funcoes: [], beneficios: [], fraseAtrativa: "" };
  const secoes = descricao.split("\n\n");
  const resultado = { descricaoGeral: "", funcoes: [], beneficios: [], fraseAtrativa: "" };

  if (secoes.length > 0) resultado.descricaoGeral = secoes[0].trim();

secoes.forEach((secao) => {
  if (secao.startsWith("O que o contratado irá realizar:")) {
    resultado.funcoes = secao.split("\n").slice(1).filter(Boolean).map(item =>
      item.trim());
  } else if (secao.startsWith("Benefícios:")) {
    resultado.beneficios = secao.split("\n").slice(1).filter(Boolean).map(item =>
      item.trim());
  } else if (secao.startsWith("Frase atrativa:")) {
    resultado.fraseAtrativa = secao.replace("Frase atrativa:", "").trim();
  }
});

  return resultado;
};

// Componente principal
export default function CardVagas({ vaga, onSave, saved }) {
  const secoesDaVaga = formatarDescricao(vaga?.descricao);
  const [candidaturaSucesso, setCandidaturaSucesso] = useState(false);
  const [botaoCandidaturaTexto, setBotaoCandidaturaTexto] = useState("ME CANDIDATAR");

  const handleCandidatar = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) return alert("ID do usuário não encontrado. Faça login para se candidatar.");
    if (!vaga?.idPublicacao || !vaga?.fkEmpresa) {
      console.log("Debug de Vaga Incompleta:", vaga);
      return alert("Informações da vaga incompletas para candidatura.");
    }

    try {
      const candidaturaData = {
        fkUsuario: Number(userId),
        fkPublicacao: vaga.idPublicacao,
        fkEmpresa: vaga.fkEmpresa,
      };

      const response = await fetch("http://localhost:8080/candidatura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(candidaturaData),
      });

      if (response.ok) {
        setCandidaturaSucesso(true);
        setBotaoCandidaturaTexto("JÁ SE CANDIDATOU");
        alert("Candidatura feita, parabéns!");
      } else {
        const errorData = await response.json();
        alert(`Erro ao candidatar: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro na candidatura:", error);
      alert("Erro ao tentar se candidatar.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto" }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, position: "relative" }}>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Avatar
            variant="rounded"
            src={vaga?.logoUrl || "https://upload.wikimedia.org/wikipedia/commons/4/4f/McDonalds_Logo.svg"}
            alt={vaga?.nomeEmpresa || "Logo"}
            sx={{ width: 64, height: 64, bgcolor: "#fff" }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
              {vaga?.nomeEmpresa || "Nome da Empresa"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vaga?.tipoContrato || "CLT"}
            </Typography>
            {vaga?.dtPublicacao && (
              <Typography variant="body2" color="text.secondary">
                {timeAgo(vaga.dtPublicacao)}
              </Typography>
            )}
            {vaga?.dtExpiracao && (
              <Typography variant="body2" color="text.secondary">
                Expira em: {formatDate(vaga.dtExpiracao)}
              </Typography>
            )}
          </Box>
          <IconButton onClick={() => onSave && onSave(vaga)}>
            {saved ? <BookmarkIcon sx={{ color: "green" }} /> : <BookmarkBorderIcon sx={{ color: "green" }} />}
          </IconButton>
        </Stack>

        <Typography variant="h6" align="center" sx={{ color: "green", fontWeight: "bold", mt: 1.5 }}>
          {vaga?.titulo || "Título da Vaga"}
        </Typography>

        <Box sx={{ background: "#f3f6ee", borderRadius: 3, p: 4, mb: 2 }}>
          {secoesDaVaga.descricaoGeral && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Sobre a vaga
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {secoesDaVaga.descricaoGeral}
              </Typography>
            </>
          )}

          {secoesDaVaga.funcoes.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                O que o contratado irá realizar:
              </Typography>
              <List>
                {secoesDaVaga.funcoes.map((funcao, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <Typography variant="body2">{funcao}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {secoesDaVaga.beneficios.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Benefícios:
              </Typography>
              <List>
                {secoesDaVaga.beneficios.map((b, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <Typography variant="body2">{b}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {secoesDaVaga.fraseAtrativa && (
            <Typography
              variant="body2"
              sx={{ color: "#006916", fontStyle: "italic", fontWeight: "bold", mt: 2 }}
            >
              {secoesDaVaga.fraseAtrativa}
            </Typography>
          )}
        </Box>

        {candidaturaSucesso && (
          <Typography variant="body1" align="center" sx={{ color: "green", fontWeight: "bold", mb: 1 }}>
            Candidatura feita, parabéns!
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleCandidatar}
          disabled={candidaturaSucesso}
          sx={{
            background: candidaturaSucesso ? "#81c784" : "green",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            borderRadius: 2,
            mt: 1,
          }}
        >
          {botaoCandidaturaTexto}
        </Button>
      </Card>
    </Box>
  );
}
