import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function CardDireita() {
  return (
    <Box sx={{ maxWidth: 350, width: "100%" }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          background: "#fff",
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "bold", color: "green", mb: 2 }}
          >
            Filtrar Vagas
          </Typography>

          {/* Stack principal para os checkboxes */}
          <Stack
            direction="row" // Alinha os grupos na mesma linha
            justifyContent="space-between" // Distribui o espaço entre os grupos
            alignItems="flex-start" // Alinha o início dos grupos (topo)
            sx={{ width: "100%", px: 1 }} // Garante que ocupe a largura total
          >
            {/* Grupo da Esquerda: CLT e Freelancer */}
            <Stack direction="column" spacing={0.5}> {/* Organiza verticalmente */}
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "green",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    CLT
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "green",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    Freelancer
                  </Typography>
                }
              />
            </Stack>

            {/* Grupo da Direita: PJ e Estágio */}
            <Stack direction="column" spacing={0.5}> {/* Organiza verticalmente */}
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "green",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    PJ
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "green",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    Estágio
                  </Typography>
                }
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}