import React, { useState, useEffect } from "react";
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
  Modal,
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
  const [checkingCandidacy, setCheckingCandidacy] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const checkUserCandidacy = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !vaga?.idPublicacao) {
        setCheckingCandidacy(false);
        return;
      }

      try {
        const response = await fetch(`http://3.84.239.87:8080/candidatura/verificar/${userId}/${vaga.idPublicacao}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // A API retorna um boolean (true/false) diretamente
          const alreadyApplied = await response.json();
          if (alreadyApplied) {
            setCandidaturaSucesso(true);
            setBotaoCandidaturaTexto("JÁ SE CANDIDATOU");
          }
        } else {
          // Se a resposta não for OK, algo deu errado no backend, mas não significa
          // que o usuário já se candidatou. Apenas logamos o erro.
          console.warn("Erro ao verificar candidatura:", response.status, await response.text());
        }
      } catch (error) {
        console.error("Erro na comunicação para verificar candidatura:", error);
      } finally {
        setCheckingCandidacy(false); // Finaliza o estado de carregamento
      }
    };

    // Garante que a vaga existe e tem um ID antes de tentar verificar
    if (vaga?.idPublicacao) {
      checkUserCandidacy();
    }
  }, [vaga?.idPublicacao]); // Dependência: re-executa se o ID da publicação mudar

  // Lógica de handleCandidatar permanece a mesma, mas agora o botão será desabilitado corretamente
  const handleCandidatar = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
      alert("ID do usuário não encontrado. Faça login para se candidatar.");
      return;
    }
    if (!vaga?.idPublicacao || !vaga?.fkEmpresa) {
      console.log("Debug de Vaga Incompleta:", vaga);
      alert("Informações da vaga incompletas para candidatura.");
      return;
    }

    try {
      const candidaturaData = {
        fkUsuario: Number(userId),
        fkPublicacao: vaga.idPublicacao,
        fkEmpresa: vaga.fkEmpresa,
      };

      const response = await fetch("http://3.84.239.87:8080/candidatura", {
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
        setOpenModal(true);
      } else {
        const errorData = await response.json();
        // Se a API retornar uma mensagem específica para "já candidatado" ou um status 409
        if (response.status === 409 || (errorData.message && errorData.message.includes("já se candidatou"))) {
          setCandidaturaSucesso(true);
          setBotaoCandidaturaTexto("JÁ SE CANDIDATOU");
          alert("Você já se candidatou a esta vaga.");
        } else {
          alert(`Erro ao candidatar: ${errorData.message || response.statusText}`);
        }
      }
    } catch (error) {
      console.error("Erro na candidatura:", error);
      alert("Erro ao tentar se candidatar.");
    }
  };

  return (
    <Box sx={{ width: 550, margin: "0 auto" }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, position: "relative" }}>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Box sx={{ width: 85, height: 85 }}>
            {vaga?.logoUrl ? (
              <Avatar
                variant="rounded"
                src={vaga.logoUrl}
                alt={vaga.nomeEmpresa || "Logo"}
                sx={{ width: 85, height: 85, bgcolor: "#fff" }}
              />
            ) : (
              <Box
                component="svg"
                width={82}
                height={82}
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
                sx={{mt: 1}}
              >
                {/* Fundo quadrado verde */}
                <rect width="60" height="60" fill="#006916" rx="6" ry="6" />

                {/* Primeira letra do nome da empresa */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="28px"
                  fontWeight={500}
                  fill="white"
                  fontFamily="Arial, sans-serif"
                >
                  {vaga?.nomeEmpresa?.charAt(0).toUpperCase() || "?"}
                </text>
              </Box>
            )}
          </Box>
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

        {checkingCandidacy ? (
          <Typography variant="body2" align="center" sx={{ color: "gray", mb: 1 }}>
            Verificando status de candidatura...
          </Typography>
        ) : (
          <>
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
          </>
        )}
      </Card>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-success"
        aria-describedby="modal-success-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" component="h2" sx={{ color: 'green', mb: 2, fontWeight: 'bold' }}>
            Parabéns! 🎉
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Você se candidatou com sucesso para a vaga:
          </Typography>
          <Typography variant="h6" sx={{ color: 'green', mb: 3, fontWeight: 'bold' }}>
            {vaga?.titulo || ""}
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{
              background: 'green',
              color: '#fff',
              '&:hover': {
                background: '#006400',
              },
            }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}