import React from "react";

export default function CardVagas({ vaga }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 8,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: 16,
      width: '100%',
      maxWidth: 600,
    }}>
      <h3>{vaga.titulo}</h3>
      <p>{vaga.descricao}</p>
      {/* Adicione outros campos da vaga conforme necessário */}
    </div>
  );
}
