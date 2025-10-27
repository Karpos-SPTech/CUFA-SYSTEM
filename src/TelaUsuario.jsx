import React, { useState, useEffect, useMemo } from 'react';
import HeaderUsuario from './components/HeaderUsuario';
import CardVagas from './CardVagas';
import CardEsquerda from './components/CardEsquerda';
import CardDireita from './components/CardDireita';
import { Box, Typography, Button } from '@mui/material'; // Importado Button para a paginação

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

  // Estados de Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const vagasPorPagina = 5; // Constante para o número de vagas por página

  // Efeito para buscar todas as vagas
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://10.0.132.210/publicacao/all', {
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

  // Efeito para buscar vagas candidatas
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) return;

      try {
        const response = await fetch(`http://10.0.132.210/candidatura/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include"
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

  // Handlers para salvar/exibir vagas
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
    if (!showSaved) {
      setShowApplied(false);
      setCurrentPage(1); // Resetar paginação ao trocar de tela
    }
  };

  const handleToggleShowApplied = () => {
    setShowApplied(!showApplied);
    if (!showApplied) {
      setShowSaved(false);
      setCurrentPage(1); // Resetar paginação ao trocar de tela
    }
  };

  // Handlers de filtro
  const handleContractFilterChange = (type, isChecked) => {
    setSelectedContractTypes((prevTypes) =>
      isChecked ? [...prevTypes, type] : prevTypes.filter((t) => t !== type)
    );
    setCurrentPage(1); // Resetar paginação ao aplicar filtro
  };

  const handleDateFilterChange = (filterValue) => {
    setSelectedDateFilter(filterValue);
    setCurrentPage(1); // Resetar paginação ao aplicar filtro
  };

  // Lógica de filtragem (função reutilizável)
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

  // Vagas a serem exibidas na tela (Todas/Salvas/Candidatadas) APÓS a aplicação dos filtros
  const vagasParaExibir = useMemo(() => {
    if (showSaved) {
      return filtrarVagas(savedJobs);
    }
    if (showApplied) {
      return filtrarVagas(appliedJobs);
    }
    return filtrarVagas(jobs);
  }, [jobs, savedJobs, appliedJobs, showSaved, showApplied, selectedContractTypes, selectedDateFilter]);

  // Lógica de Paginação
  const totalPages = Math.ceil(vagasParaExibir.length / vagasPorPagina);
  const indexUltimaVaga = currentPage * vagasPorPagina;
  const indexPrimeiraVaga = indexUltimaVaga - vagasPorPagina;
  const vagasAtuais = vagasParaExibir.slice(indexPrimeiraVaga, indexUltimaVaga);

  const handlePageChange = (novaPagina) => {
    setCurrentPage(novaPagina);
    // Tenta rolar a tela para o topo da lista de vagas
    const vagasContainer = document.getElementById('vagas-container');
    if (vagasContainer) {
        vagasContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // fallback
    }
  };

  // Renderização da lista de vagas
  const renderVagas = () => {
    if (loading) {
      return <Typography color="primary" fontWeight={600}>Carregando vagas...</Typography>;
    }
    if (error) {
      return <Typography color="error" fontWeight={600}>Erro ao carregar vagas: {error.message}</Typography>;
    }
    
    // Texto de "Nenhuma vaga"
    if (vagasParaExibir.length === 0) {
        const baseMessage = showSaved
            ? 'Nenhuma vaga salva'
            : showApplied
            ? 'Nenhuma vaga candidatada'
            : 'Nenhuma vaga disponível';
        const filterMessage = (selectedContractTypes.length > 0 || selectedDateFilter)
            ? ' com os filtros selecionados.'
            : '.';
        
        return <Typography color="green" fontWeight={600}>{baseMessage}{filterMessage}</Typography>;
    }

    // Renderiza as vagas da página atual
    return vagasAtuais.map((vaga) => (
        <CardVagas
            key={vaga.idPublicacao}
            vaga={vaga}
            onSave={handleToggleSaveJob}
            saved={!!savedJobs.find(j => j.idPublicacao === vaga.idPublicacao)}
        />
    ));
  };


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
        {/* Coluna Esquerda: Filtros/Status */}
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

        {/* Coluna Central: Listagem de Vagas e Paginação */}
        <div 
            id="vagas-container" // Adicionamos um ID para facilitar o scroll na mudança de página
            style={{
                flex: '1 1 600px',
                maxWidth: 700,
                minWidth: 350,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 32
            }}
        >
          {/* Título da Seção */}
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

          {/* Renderização das Vagas */}
          {renderVagas()}
          
          {/* Paginação */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4, gap: 1 }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  sx={{
                    backgroundColor: currentPage === i + 1 ? '#006916' : '#f5f5f5',
                    color: currentPage === i + 1 ? '#fff' : '#006916',
                    border: '1px solid #006916',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    minWidth: 35,
                    '&:hover': { backgroundColor: '#005713', color: '#fff' }
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </Box>
          )}
        </div>

        {/* Coluna Direita: Filtros */}
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