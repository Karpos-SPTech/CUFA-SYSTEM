import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

export default function ModalAdicionarExperiencia({ open, onClose, onAdd }) {
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cargo || !empresa || !inicio || !fim) return;
    onAdd({ cargo, empresa, inicio, fim });
    setCargo('');
    setEmpresa('');
    setInicio('');
    setFim('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 3, maxWidth: 400, mx: 'auto', mt: '10%', boxShadow: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#006916' }}>Adicionar Experiência</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Cargo" fullWidth sx={{ mb: 2 }} value={cargo} onChange={e => setCargo(e.target.value)} />
          <TextField label="Empresa" fullWidth sx={{ mb: 2 }} value={empresa} onChange={e => setEmpresa(e.target.value)} />
          <TextField label="Início" fullWidth sx={{ mb: 2 }} value={inicio} onChange={e => setInicio(e.target.value)} placeholder="Ex: Janeiro 2020" />
          <TextField label="Fim" fullWidth sx={{ mb: 2 }} value={fim} onChange={e => setFim(e.target.value)} placeholder="Ex: Dezembro 2020" />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={onClose} color="secondary">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#006916' }}>Adicionar</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
