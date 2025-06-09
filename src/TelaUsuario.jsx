import React, { useState, useEffect } from 'react';
import HeaderUsuario from './components/HeaderUsuario';
import CardVagas from './CardVagas';
import CardEsquerda from './components/CardEsquerda';
import CardDireita from './components/CardDireita';
import { Box, Typography } from '@mui/material';

const TelaUsuario = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedContractTypes, setSelectedContractTypes] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showApplied, setShowApplied] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/publicacao/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // ✅ Ordena do mais recente para o mais antigo
        const ordenadas = data.sort(
          (a, b) => new Date(b.dtPublicacao) - new Date(a.dtPublicacao)
        );
        setJobs(ordenadas);

      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) return;

      try {
        const response = await fetch(`http://localhost:8080/candidatura/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setAppliedJobs(data);
      } catch (e) {
        console.error("Erro ao buscar vagas candidatas:", e);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleToggleSaveJob = (vagaToSave) => {
    setSavedJobs((prevSavedJobs) => {
      const isSaved = prevSavedJobs.some(
        (job) => job.idPublicacao === vagaToSave.idPublicacao
      );
      return isSaved
        ? prevSavedJobs.filter((job) => job.idPublicacao !== vagaToSave.idPublicacao)
        : [...prevSavedJobs, vagaToSave];
    });
  };

  const handleToggleShowSaved = () => {
    setShowSaved(!showSaved);
    if (!showSaved) setShowApplied(false);
  };

  const handleToggleShowApplied = () => {
    setShowApplied(!showApplied);
    if (!showApplied) setShowSaved(false);
  };

  const handleContractFilterChange = (type, isChecked) => {
    setSelectedContractTypes((prevTypes) =>
      isChecked ? [...prevTypes, type] : prevTypes.filter((t) => t !== type)
    );
  };

  const handleDateFilterChange = (filterValue) => {
    setSelectedDateFilter(filterValue);
  };

  // Reutilizável para qualquer array de vagas
  const filtrarVagas = (vagas) => {
    return vagas.filter((vaga) => {
      const matchesContractType =
        selectedContractTypes.length === 0 ||
        selectedContractTypes.includes(vaga.tipoContrato);

      let matchesDateFilter = true;
      if (selectedDateFilter) {
        const vagaDate = new Date(vaga.dtPublicacao);
        const now = new Date();

        switch (selectedDateFilter) {
          case 'Ultima hora':
            matchesDateFilter = now - vagaDate <= 60 * 60 * 1000;
            break;
          case 'Ultimas 24 horas':
            matchesDateFilter = now - vagaDate <= 24 * 60 * 60 * 1000;
            break;
          case 'Ultima semana':
            matchesDateFilter = now - vagaDate <= 7 * 24 * 60 * 60 * 1000;
            break;
          case 'Ultimo Mes':
            matchesDateFilter = now - vagaDate <= 30 * 24 * 60 * 60 * 1000;
            break;
          default:
            matchesDateFilter = true;
        }
      }

      return matchesContractType && matchesDateFilter;
    });
  };

  const filteredJobs = filtrarVagas(jobs);

  return (
    <div className="tela-usuario-main">
      <HeaderUsuario />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 32,
        background: '#E5EEE3',
        minHeight: '100vh',
        width: '100%',
        paddingTop: 50,
        boxSizing: 'border-box',
        overflowX: 'auto',
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        <div style={{ flex: '0 1 350px', maxWidth: 500, minWidth: 300, marginTop: 2 }}>
          <CardEsquerda
            showSaved={showSaved}
            toggleShowSaved={handleToggleShowSaved}
            savedCount={savedJobs.length}
            showApplied={showApplied}
            toggleShowApplied={handleToggleShowApplied}
            appliedCount={appliedJobs.length}
          />
        </div>

        <div style={{
          flex: '1 1 600px',
          maxWidth: 700,
          minWidth: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32
        }}>
          <Box sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            height: 65,
            color: '#006916',
            fontWeight: "bold",
            width: '550px',
            background: "#f8f8f8",
            boxShadow: 3,
            mb: -2,
          }}>
            <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
              {showSaved
                ? 'Minhas Vagas Salvas'
                : showApplied
                  ? 'Minhas Candidaturas'
                  : 'Todas as Publicações'}
            </Typography>
          </Box>

          {loading ? (
            <Typography color="primary" fontWeight={600}>Carregando vagas...</Typography>
          ) : error ? (
            <Typography color="error" fontWeight={600}>Erro ao carregar vagas: {error.message}</Typography>
          ) : showSaved ? (
            filtrarVagas(savedJobs).length > 0 ? (
              filtrarVagas(savedJobs).map((vaga) => (
                <CardVagas key={vaga.idPublicacao} vaga={vaga} onSave={handleToggleSaveJob} saved />
              ))
            ) : (
              <Typography color="green" fontWeight={600}>Nenhuma vaga salva com os filtros selecionados.</Typography>
            )
          ) : showApplied ? (
            filtrarVagas(appliedJobs).length > 0 ? (
              filtrarVagas(appliedJobs).map((vaga) => (
                <CardVagas
                  key={vaga.idPublicacao}
                  vaga={vaga}
                  onSave={handleToggleSaveJob}
                  saved={!!savedJobs.find(j => j.idPublicacao === vaga.idPublicacao)}
                />
              ))
            ) : (
              <Typography color="green" fontWeight={600}>Nenhuma vaga candidatada com os filtros selecionados.</Typography>
            )
          ) : (
            filteredJobs.length > 0 ? (
              filteredJobs.map((vaga) => (
                <CardVagas
                  key={vaga.idPublicacao}
                  vaga={vaga}
                  onSave={handleToggleSaveJob}
                  saved={!!savedJobs.find(j => j.idPublicacao === vaga.idPublicacao)}
                />
              ))
            ) : (
              <Typography color="green" fontWeight={600}>Nenhuma vaga disponível com os filtros selecionados.</Typography>
            )
          )}
        </div>

        <div style={{ flex: '0 1 380px', maxWidth: 420, minWidth: 360 }}>
          <CardDireita
            onContractFilterChange={handleContractFilterChange}
            selectedContractTypes={selectedContractTypes}
            onDateFilterChange={handleDateFilterChange}
            selectedDateFilter={selectedDateFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default TelaUsuario;
