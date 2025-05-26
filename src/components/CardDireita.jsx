import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack,
  FormControlLabel,
  Checkbox,
  Slider,
  Switch,
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
            Filtros
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, justifyContent: "center" }}
          >
            <FormControlLabel
              control={
                <Checkbox defaultChecked sx={{ color: "green" }} />
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
              control={<Checkbox sx={{ color: "green" }} />}
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
              control={<Checkbox sx={{ color: "green" }} />}
              label={
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  FreeLancer
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "green" }} />}
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
          <Box sx={{ width: "100%", px: 1, mb: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: 500,
                }}
              >
                Distância
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: 500,
                }}
              >
                0-100Km
              </Typography>
            </Stack>
            <Slider
              defaultValue={100}
              min={0}
              max={100}
              sx={{
                color: "green",
                mt: 0.5,
                mb: 1,
                height: 6,
                "& .MuiSlider-thumb": {
                  color: "green",
                },
              }}
            />
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Box textAlign="center">
              <Typography
                sx={{ fontSize: 13, fontWeight: 500 }}
              >
                Horário
                <br />
                Flexível
              </Typography>
              <Switch
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "green",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "green",
                  },
                }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                sx={{ fontSize: 13, fontWeight: 500 }}
              >
                Aceita
                <br />
                Primeiro Emprego
              </Typography>
              <Switch
                defaultChecked
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "green",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "green",
                  },
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
