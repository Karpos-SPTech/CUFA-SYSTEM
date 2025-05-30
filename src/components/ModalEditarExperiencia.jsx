import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

export default function ModalEditarExperiencia({ open, onClose, experiencia, onEdit }) {
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  useEffect(() => {
    if (experiencia) {
      setCargo(experiencia.cargo || '');
      setEmpresa(experiencia.empresa || '');
      setInicio(experiencia.inicio || '');
      setFim(experiencia.fim || '');
    }
  }, [experiencia, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cargo || !empresa || !inicio || !fim) return;
    onEdit({ ...experiencia, cargo, empresa, inicio, fim });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 3, maxWidth: 400, mx: 'auto', mt: '10%', boxShadow: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#006916' }}>Editar Experiência</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Cargo" fullWidth sx={{ mb: 2 }} value={cargo} onChange={e => setCargo(e.target.value)} />
          <TextField label="Empresa" fullWidth sx={{ mb: 2 }} value={empresa} onChange={e => setEmpresa(e.target.value)} />
          <TextField label="Início" fullWidth sx={{ mb: 2 }} value={inicio} onChange={e => setInicio(e.target.value)} placeholder="Ex: Janeiro 2020" />
          <TextField label="Fim" fullWidth sx={{ mb: 2 }} value={fim} onChange={e => setFim(e.target.value)} placeholder="Ex: Dezembro 2020" />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={onClose} color="secondary">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#006916' }}>Salvar</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
