import React, { useState } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ModalAdicionarExperiencia from './ModalAdicionarExperiencia';
import ModalEditarExperiencia from './ModalEditarExperiencia';

export default function CardExperiencia() {
  const [experiencias, setExperiencias] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [experienciaEditando, setExperienciaEditando] = useState(null);

  const handleAdd = (exp) => {
    setExperiencias(prev => [{ ...exp, id: Date.now() }, ...prev]); // mais recente primeiro
    setOpenAddModal(false);
  };
  const handleEdit = (exp) => {
    setExperiencias(prev => prev.map(e => e.id === exp.id ? exp : e));
    setOpenEditModal(false);
  };
  const handleEditClick = (exp) => {
    setExperienciaEditando(exp);
    setOpenEditModal(true);
  };
  const handleDelete = (id) => {
    setExperiencias(prev => prev.filter(e => e.id !== id));
  };

  return (
    <>
      <Card className="perfil-usuario-card" sx={{ borderRadius: 5, boxShadow: 4, background: '#fff', minHeight: 555, height: 555, position: 'relative', p: 0, display: 'flex', flexDirection: 'column', justifyContent: experiencias.length ? 'flex-start' : 'center', maxWidth: '95%', width: '100%', mx: 'auto' }}>
        <CardContent sx={{ px: 4, pt: 3, pb: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: experiencias.length ? 'flex-start' : 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', fontSize: 24 }}>Experiência</Typography>
            <Box>
              <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', mr: 1, boxShadow: 1 }} onClick={() => setOpenAddModal(true)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: experiencias.length ? 'flex-start' : 'center' }}>
            {experiencias.length === 0 && (
              <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mt: 2 }}>
                Nenhuma experiência cadastrada.
              </Typography>
            )}
            {experiencias.map(exp => (
              <Card key={exp.id} sx={{ background: '#f9f9f9', p: 2, borderRadius: 2, boxShadow: 1, position: 'relative', minHeight: 70, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: '#333', fontSize: 16, wordBreak: 'break-word' }}>
                  {exp.cargo} na {exp.empresa}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', fontSize: 14, wordBreak: 'break-word' }}>
                  {exp.inicio} - {exp.fim}
                </Typography>
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                  <IconButton size="small" sx={{ color: '#006916', background: '#e5eee3', boxShadow: 1 }} onClick={() => handleEditClick(exp)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#b71c1c', background: '#fbe9e7', boxShadow: 1 }} onClick={() => handleDelete(exp.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
      <ModalAdicionarExperiencia open={openAddModal} onClose={() => setOpenAddModal(false)} onAdd={handleAdd} />
      <ModalEditarExperiencia open={openEditModal} onClose={() => setOpenEditModal(false)} experiencia={experienciaEditando} onEdit={handleEdit} />
    </>
  );
}
