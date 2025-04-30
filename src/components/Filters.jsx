import React, { useState } from "react";
import { Box, Typography, Checkbox, Slider, FormControlLabel, Switch } from "@mui/material";

const Filters = () => {
  const [distance, setDistance] = useState(100);
  const [flexibleHours, setFlexibleHours] = useState(false);
  const [dressCode, setDressCode] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        marginLeft: "80px",
        width: "130%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "green",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Filtros
      </Typography>

      {/* Opções de tipo de contrato */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        {["CLT", "PJ", "FreeLancer", "Estágio"].map((label) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#006916",
                  },
                }}
              />
            }
            label={label}
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "normal",
              fontSize: "14px",
            }}
          />
        ))}
      </Box>

      {/* Controle de distância */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "15px",
          fontWeight: "normal",
        }}
      >
        <Typography>Distância</Typography>
        <Slider
          value={distance}
          onChange={(e, newValue) => setDistance(newValue)}
          min={0}
          max={100}
          sx={{
            width: "150px",
            color: "#006916",
            "& .MuiSlider-thumb": {
              backgroundColor: "#006916",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#006916",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#ccc",
            },
          }}
        />
        <Typography
          sx={{
            color: "#006916",
            fontWeight: "bold",
          }}
        >
          {distance} Km
        </Typography>
      </Box>

      {/* Alternativas de horário flexível e vestimenta livre */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "black",
            fontWeight: "normal",
          }}
        >
          <Typography>Horário Flexível</Typography>
          <Switch
            checked={flexibleHours}
            onChange={() => setFlexibleHours(!flexibleHours)}
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "black",
            fontWeight: "normal",
          }}
        >
          <Typography>Vestimenta Livre</Typography>
          <Switch
            checked={dressCode}
            onChange={() => setDressCode(!dressCode)}
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
      </Box>
    </Box>
  );
};

export default Filters;