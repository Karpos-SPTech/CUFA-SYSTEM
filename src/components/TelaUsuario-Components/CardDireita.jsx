
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";

export default function CardDireita({
  onContractFilterChange,
  selectedContractTypes,
  onDateFilterChange,
  selectedDateFilter,
}) {

  const handleContractChange = (event) => {
    const { name, checked } = event.target;
    onContractFilterChange(name, checked);
  };

  const handleDateChange = (event) => {
    onDateFilterChange(event.target.value);
  };

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

          {/* Seção de Filtro por Tipo de Contrato */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "green", mb: 1 }}
          >
            Tipo de Contrato:
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ width: "100%", px: 1, mb: 3 }} 
          >
            <Stack direction="column" spacing={0.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="CLT"
                    checked={selectedContractTypes.includes("CLT")}
                    onChange={handleContractChange}
                    sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                    CLT
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox name="FreeLancer"
                    checked={selectedContractTypes.includes("FreeLancer")}
                    onChange={handleContractChange}
                    sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                    FreeLancer
                  </Typography>
                }
              />
            </Stack>

            <Stack direction="column" spacing={0.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="PJ"
                    checked={selectedContractTypes.includes("PJ")}
                    onChange={handleContractChange}
                    sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                    PJ
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="Jovem Aprendiz"
                    checked={selectedContractTypes.includes("Jovem Aprendiz")}
                    onChange={handleContractChange}
                    sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                    Jovem Aprendiz
                  </Typography>
                }
              />
            </Stack>
          </Stack>

          {/* --- NOVA SEÇÃO DE FILTRO POR DATA --- */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "green", mb: 1 }}
          >
            Data de Publicação:
          </Typography>
          <RadioGroup
            aria-label="date-filter"
            name="dateFilter"
            value={selectedDateFilter} 
            onChange={handleDateChange} 
          >
            <FormControlLabel
              value="" // Valor vazio para "Todos" ou "Qualquer data"
              control={<Radio sx={{ color: "green", "&.Mui-checked": { color: "green" } }} />}
              label={
                <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Qualquer data
                </Typography>
              }
            />
            <FormControlLabel
              value="Ultima hora"
              control={<Radio sx={{ color: "green", "&.Mui-checked": { color: "green" } }} />}
              label={
                <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Última hora
                </Typography>
              }
            />
            <FormControlLabel
              value="Ultimas 24 horas"
              control={<Radio sx={{ color: "green", "&.Mui-checked": { color: "green" } }} />}
              label={
                <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Últimas 24 horas
                </Typography>
              }
            />
            <FormControlLabel
              value="Ultima semana"
              control={<Radio sx={{ color: "green", "&.Mui-checked": { color: "green" } }} />}
              label={
                <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Última semana
                </Typography>
              }
            />
            <FormControlLabel
              value="Ultimo Mes"
              control={<Radio sx={{ color: "green", "&.Mui-checked": { color: "green" } }} />}
              label={
                <Typography sx={{ fontSize: 14, color: "black", fontWeight: 600 }}>
                  Último Mês
                </Typography>
              }
            />
          </RadioGroup>
        </CardContent>
      </Card>
    </Box>
  );
}