import React, { useEffect, useState } from 'react';
import HeaderUsuario from './components/HeaderUsuario';
import CardEsquerda from './components/CardEsquerda';
import CardVagas from './CardVagas';
import CardDireita from './components/CardDireita';
import './TelaUsuario.css';

const TelaUsuario = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8080/publicacao/all");

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        setJobs(data.length > 0 ? data : []);
      } catch (err) {
        console.error("Erro ao buscar vagas:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleToggleSaveJob = (vaga) => {
    setSavedJobs((prev) =>
      prev.some((job) => job.idPublicacao === vaga.idPublicacao)
        ? prev.filter((job) => job.idPublicacao !== vaga.idPublicacao)
        : [...prev, vaga]
    );
  };

  const handleToggleShowSaved = () => {
    setShowSaved((prev) => !prev);
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
            jobs.length > 0 ? (
              jobs.map((vaga) => (
                <CardVagas key={vaga.idPublicacao} vaga={vaga} onSave={handleToggleSaveJob} saved={!!savedJobs.find(j => j.idPublicacao === vaga.idPublicacao)} />
              ))
            ) : (
              <p style={{ color: '#006916', fontWeight: 600 }}>Nenhuma vaga disponível no momento.</p>
            )
          )}
        </div>
        <div style={{ flex: '0 1 380px', maxWidth: 420, minWidth: 360 }}>
          <CardDireita />
        </div>
      </div>
    </div>
  );
};

export default TelaUsuario;
