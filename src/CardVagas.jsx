import React from "react";
import { Card, CardContent, Typography, Box, Avatar, IconButton, Button, Stack } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// Componente pronto para receber props de vaga
export default function CardVagas({ vaga, onSave, saved }) {
  return (
    <Box sx={{ maxWidth: 420, margin: "0 auto" }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, position: "relative" }}>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Avatar
            variant="rounded"
            src={vaga?.logoUrl || "https://upload.wikimedia.org/wikipedia/commons/4/4f/McDonalds_Logo.svg"}
            alt={vaga?.empresa || "Logo"}
            sx={{ width: 64, height: 64, bgcolor: "#fff" }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: "green", fontWeight: "bold", lineHeight: 1 }}>
              {vaga?.empresa || "Mc Donald’s"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vaga?.segmento || "Fast Food"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vaga?.tipo || "CLT"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vaga?.tempo || "Há 7 horas"}
            </Typography>
          </Box>
          <IconButton onClick={() => onSave && onSave(vaga)}>
            {saved ? (
              <BookmarkIcon sx={{ color: "green" }} />
            ) : (
              <BookmarkBorderIcon sx={{ color: "green" }} />
            )}
          </IconButton>
        </Stack>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "green", fontWeight: "bold", mt: 2, mb: 1 }}
        >
          {vaga?.titulo || "Título da publicação"}
        </Typography>
        <Box
          sx={{
            background: "#f3f6ee",
            borderRadius: 3,
            p: 2,
            mb: 2,
          }}
        >
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <b>Vaga oferecida pela empresa</b>
            </li>
          </ul>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <b>Descrição da empresa - </b>
            {vaga?.descricao ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae provident unde accusantium quidem eos non explicabo suscipit. Quidem, quisquam obcaecati, sunt magnam repellendus libero itaque nihil eaque architecto, cum pariatur?"}
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <b>O que o usuário irá realizar:</b>
            </li>
          </ul>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {vaga?.funcoes
              ? vaga.funcoes.map((f, i) => (
                  <div key={i}><b>{f}</b></div>
                ))
              : (
                <>
                  <b>Função 1</b><br />
                  <b>Função 2</b><br />
                  <b>Função 3</b>
                </>
              )}
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>
              <b>Benefícios:</b>
            </li>
          </ul>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <b>Vale-refeição ou alimentação</b><br />
            <b>Plano de saúde e odontológico</b><br />
            <b>Vale transporte</b>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {vaga?.fraseAtrativa || "Frase atrativa para chamar a atenção do usuário !!"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "green",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            borderRadius: 2,
            boxShadow: 1,
            "&:hover": { background: "#388e3c" },
          }}
        >
          ME CANDIDATAR
        </Button>
      </Card>
    </Box>
  );
}