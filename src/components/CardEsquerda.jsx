import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Divider, Stack, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups";

export default function CardEsquerda({ onShowSaved, onShowAll, savedCount }) {
  return (
    <Box sx={{ maxWidth: 350 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          overflow: "visible",
          background: "linear-gradient(180deg, #4CAF50 0%, #fff 30%)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: -4 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              border: "4px solid #fff",
              boxShadow: 2,
              bgcolor: "#90caf9",
            }}
            src="" // Adicione o caminho da imagem se houver
          >
            {/* Ícone de avatar genérico */}
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="14" r="10" fill="#90caf9" />
              <ellipse cx="20" cy="32" rx="14" ry="8" fill="#e3f2fd" />
            </svg>
          </Avatar>
        </Box>
        <CardContent sx={{ pt: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "green", mb: 1, textTransform: "uppercase" }}
          >
            GUILHERME SILVA
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Experiência como ajudante de obras, serviços gerais e entregas. Sempre disposto a aprender e crescer profissionalmente.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            São Paulo, SP
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          mt: 2,
          background: "#f8f8f8",
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <BookmarkIcon color="success" />
            <Typography variant="body2" fontWeight="medium">
              Itens salvos
            </Typography>
            <Button
              size="small"
              onClick={onShowSaved}
              sx={{ ml: 1, color: '#006916', fontWeight: 600 }}
            >
              Ver ({savedCount})
            </Button>
            <Button
              size="small"
              onClick={onShowAll}
              sx={{ ml: 1, color: '#888', fontWeight: 500 }}
            >
              Todas
            </Button>
          </Stack>
          <Divider />
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <GroupsIcon color="success" />
            <Typography variant="body2" fontWeight="medium">
              Grupos
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}