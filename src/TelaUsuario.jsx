import React, { useState, useEffect } from 'react';
import HeaderUsuario from './components/HeaderUsuario';
import CardVagas from './CardVagas';
import CardEsquerda from './components/CardEsquerda';
import CardDireita from './components/CardDireita'; // Certifique-se de que está importado

const TelaUsuario = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedContractTypes, setSelectedContractTypes] = useState([]);

  const [selectedDateFilter, setSelectedDateFilter] = useState('');

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
        setJobs(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleToggleSaveJob = (vagaToSave) => {
    setSavedJobs((prevSavedJobs) => {
      const isSaved = prevSavedJobs.some(
        (job) => job.idPublicacao === vagaToSave.idPublicacao
      );
      if (isSaved) {
        return prevSavedJobs.filter(
          (job) => job.idPublicacao !== vagaToSave.idPublicacao
        );
      } else {
        return [...prevSavedJobs, vagaToSave];
      }
    });
  };

  const handleToggleShowSaved = () => {
    setShowSaved(!showSaved);
  };

  const handleContractFilterChange = (type, isChecked) => {
    setSelectedContractTypes((prevTypes) => {
      if (isChecked) {
        return [...prevTypes, type];
      } else {
        return prevTypes.filter((t) => t !== type);
      }
    });
  };

  // --- NOVA FUNÇÃO PARA LIDAR COM MUDANÇAS NO FILTRO DE DATA ---
  const handleDateFilterChange = (filterValue) => {
    setSelectedDateFilter(filterValue);
  };

  // --- LÓGICA DE FILTRO COMBINADA ---
  const filteredJobs = jobs.filter((vaga) => {
    // 1. Filtrar por Tipo de Contrato
    const matchesContractType =
      selectedContractTypes.length === 0 ||
      selectedContractTypes.includes(vaga.tipoContrato);

    // 2. Filtrar por Data de Publicação
    let matchesDateFilter = true;
    if (selectedDateFilter) {
      const vagaDate = new Date(vaga.dtPublicacao);
      const now = new Date();

      switch (selectedDateFilter) {
        case 'Ultima hora':
          matchesDateFilter = now.getTime() - vagaDate.getTime() <= 60 * 60 * 1000; // 1 hora em ms
          break;
        case 'Ultimas 24 horas':
          matchesDateFilter = now.getTime() - vagaDate.getTime() <= 24 * 60 * 60 * 1000; // 24 horas em ms
          break;
        case 'Ultima semana':
          matchesDateFilter = now.getTime() - vagaDate.getTime() <= 7 * 24 * 60 * 60 * 1000; // 7 dias em ms
          break;
        case 'Ultimo Mes':
          // Aproximação para 30 dias, pois meses têm durações diferentes
          matchesDateFilter = now.getTime() - vagaDate.getTime() <= 30 * 24 * 60 * 60 * 1000; // 30 dias em ms
          break;
        default:
          matchesDateFilter = true; // Se não houver filtro, não aplica restrição
      }
    }

    // Retorna true apenas se ambos os filtros corresponderem
    return matchesContractType && matchesDateFilter;
  });

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
          />
        </div>
        <div style={{ flex: '1 1 600px', maxWidth: 700, minWidth: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          {loading ? (
            <p style={{ color: '#006916', fontWeight: 600 }}>Carregando vagas...</p>
          ) : error ? (
            <p style={{ color: 'red', fontWeight: 600 }}>Erro ao carregar vagas: {error.message}</p>
          ) : showSaved ? (
            savedJobs.length > 0 ? (
              savedJobs.map((vaga) => (
                <CardVagas key={vaga.idPublicacao} vaga={vaga} onSave={handleToggleSaveJob} saved />
              ))
            ) : (
              <p style={{ color: '#006916', fontWeight: 600 }}>Nenhuma vaga salva.</p>
            )
          ) : (
            filteredJobs.length > 0 ? (
              filteredJobs.map((vaga) => (
                <CardVagas key={vaga.idPublicacao} vaga={vaga} onSave={handleToggleSaveJob} saved={!!savedJobs.find(j => j.idPublicacao === vaga.idPublicacao)} />
              ))
            ) : (
              <p style={{ color: '#006916', fontWeight: 600 }}>Nenhuma vaga disponível com os filtros selecionados.</p>
            )
          )}
        </div>
        <div style={{ flex: '0 1 380px', maxWidth: 420, minWidth: 360 }}>
          <CardDireita
            onContractFilterChange={handleContractFilterChange} // Renomeado para clareza
            selectedContractTypes={selectedContractTypes}
            onDateFilterChange={handleDateFilterChange} // Nova prop
            selectedDateFilter={selectedDateFilter} // Nova prop
          />
        </div>
      </div>
    </div>
  );
};

export default TelaUsuario;