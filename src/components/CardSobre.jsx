import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Modal, TextField, Button, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function CardSobre() {
  const [sobre, setSobre] = useState('Experiência como ajudante de obras, serviços gerais e entregas. Sempre disposto a aprender e crescer profissionalmente.');
  const [openEdit, setOpenEdit] = useState(false);
  const [sobreDraft, setSobreDraft] = useState(sobre);

  const handleSave = () => {
    setSobre(sobreDraft);
    setOpenEdit(false);
  };

  return (
    <>
      <Card className="perfil-usuario-card" sx={{ flex: 1, borderRadius: 5, boxShadow: 4, background: '#fff', minHeight: 180, position: 'relative', p: 0 }}>
        <CardContent sx={{ px: 5, py: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', mb: 1, fontSize: 20 }}>Sobre</Typography>
          <Typography variant="body1" sx={{ color: '#333', fontSize: 17 }}>
            {sobre}
          </Typography>
        </CardContent>
        <IconButton sx={{ position: 'absolute', right: 24, top: 24, color: '#006916', background: '#e5eee3', boxShadow: 1 }} onClick={() => { setSobreDraft(sobre); setOpenEdit(true); }}>
          <EditIcon />
        </IconButton>
      </Card>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 3, maxWidth: 400, mx: 'auto', mt: '10%', boxShadow: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#006916' }}>Editar Sobre</Typography>
          <TextField
            label="Sobre"
            fullWidth
            multiline
            minRows={3}
            value={sobreDraft}
            onChange={e => setSobreDraft(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={() => setOpenEdit(false)} color="secondary">Cancelar</Button>
            <Button variant="contained" sx={{ bgcolor: '#006916' }} onClick={handleSave}>Salvar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
