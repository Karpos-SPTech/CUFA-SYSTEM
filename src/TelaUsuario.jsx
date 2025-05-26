import React, { useState } from 'react';
import Header from './components/Header';
import CardEsquerda from './components/CardEsquerda';
import CardVagas from './CardVagas';
import CardDireita from './components/CardDireita';
import CardSobre from './components/CardSobre';
import CardExperiencia from './components/CardExperiencia';
import CardCurriculo from './components/CardCurriculo';

// Exemplo de vagas simulando dados vindos do banco de dados
const vagasExemplo = [
  {
    id: 1,
    empresa: "Mc Donald’s",
    segmento: "Fast Food",
    tipo: "CLT",
    tempo: "Há 7 horas",
    titulo: "Atendente de Lanchonete",
    descricao: "Atendimento ao cliente, montagem de pedidos e organização do ambiente.",
    funcoes: ["Atendimento", "Montagem de pedidos", "Organização"],
    fraseAtrativa: "Venha fazer parte do nosso time!",
  },
  {
    id: 2,
    empresa: "Magazine Luiza",
    segmento: "Varejo",
    tipo: "PJ",
    tempo: "Há 2 dias",
    titulo: "Vendedor(a) Externo(a)",
    descricao: "Prospecção de clientes e vendas externas.",
    funcoes: ["Prospecção", "Vendas", "Relacionamento"],
    fraseAtrativa: "Comissão atrativa e plano de carreira!",
  },
  {
    id: 3,
    empresa: "XPTO Tech",
    segmento: "Tecnologia",
    tipo: "Estágio",
    tempo: "Há 1 dia",
    titulo: "Estagiário(a) de Suporte",
    descricao: "Auxílio no suporte técnico e atendimento ao usuário.",
    funcoes: ["Suporte", "Atendimento", "Documentação"],
    fraseAtrativa: "Oportunidade de crescimento na área de TI!",
  },
  {
    id: 4,
    empresa: "Construtora Alpha",
    segmento: "Construção Civil",
    tipo: "CLT",
    tempo: "Há 3 dias",
    titulo: "Auxiliar de Obras",
    descricao: "Apoio em obras, transporte de materiais e limpeza do canteiro.",
    funcoes: ["Apoio", "Transporte de materiais", "Limpeza"],
    fraseAtrativa: "Faça parte de grandes projetos!",
  },
  {
    id: 5,
    empresa: "Agência Criativa",
    segmento: "Publicidade",
    tipo: "FreeLancer",
    tempo: "Há 5 horas",
    titulo: "Designer Gráfico Freelancer",
    descricao: "Criação de peças gráficas para campanhas digitais.",
    funcoes: ["Criação", "Design", "Campanhas"],
    fraseAtrativa: "Mostre seu talento criativo!",
  },
];

const TelaUsuario = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const handleToggleSaveJob = (vaga) => {
    setSavedJobs((prev) => {
      if (prev.some((job) => job.id === vaga.id)) {
        // Remove se já está salvo
        return prev.filter((job) => job.id !== vaga.id);
      } else {
        // Adiciona se não está salvo
        return [...prev, vaga];
      }
    });
  };

  return (
    <>
      <Header />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 32,
        background: '#E5EEE3',
        minHeight: '100vh',
        width: '100%',
        paddingTop: 100, // espaço para o header fixo
        boxSizing: 'border-box',
        overflowX: 'auto',
      }}>
        <div style={{ flex: '0 1 350px', maxWidth: 350, minWidth: 300, marginTop: 32 }}>
          <CardEsquerda
            onShowSaved={() => setShowSaved(true)}
            onShowAll={() => setShowSaved(false)}
            savedCount={savedJobs.length}
          />
        </div>
        <div style={{ flex: '1 1 600px', maxWidth: 700, minWidth: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          {showSaved
            ? (savedJobs.length > 0
                ? savedJobs.map((vaga) => (
                    <CardVagas key={vaga.id} vaga={vaga} onSave={handleToggleSaveJob} saved />
                  ))
                : <p style={{ color: '#006916', fontWeight: 600 }}>Nenhuma vaga salva.</p>
              )
            : vagasExemplo.map((vaga) => (
                <CardVagas key={vaga.id} vaga={vaga} onSave={handleToggleSaveJob} saved={!!savedJobs.find(j => j.id === vaga.id)} />
              ))
          }
        </div>
        <div style={{ flex: '0 1 380px', maxWidth: 420, minWidth: 360 }}>
          <CardDireita />
        </div>
      </div>
    </>
  );
};

export default TelaUsuario;