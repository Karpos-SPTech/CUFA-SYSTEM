import React from "react";
import { Card, CardContent, Typography, Box, IconButton, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

export default function CardCurriculo({ curriculoFile, curriculoFileName, curriculoInputRef, handleCurriculoClick, setCurriculoFile, setCurriculoFileName }) {
  return (
    <Card className="perfil-usuario-card" sx={{ flex: 1, borderRadius: 5, boxShadow: 4, background: '#fff', minHeight: 180, position: 'relative', p: 0 }}>
      <CardContent sx={{ px: 5, py: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#006916', mb: 1, fontSize: 20 }}>Currículo</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
          <input
            id="curriculo-upload"
            type="file"
            accept="application/pdf,.doc,.docx"
            style={{ display: 'none' }}
            ref={curriculoInputRef}
            onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              if (file.size > 5 * 1024 * 1024) {
                alert('O arquivo deve ter no máximo 5MB.');
                return;
              }
              const reader = new FileReader();
              reader.onload = (ev) => {
                localStorage.setItem('curriculoFile', ev.target.result);
                localStorage.setItem('curriculoFileName', file.name);
                setCurriculoFile(ev.target.result);
                setCurriculoFileName(file.name);
              };
              reader.readAsDataURL(file);
            }}
          />
          <button
            type="button"
            style={{ background: '#006916', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 6px #00691622' }}
            onClick={handleCurriculoClick}
          >
            {curriculoFile ? 'Trocar currículo' : 'Anexar currículo'}
          </button>
          {curriculoFile && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#333',
                  fontSize: 15,
                  fontWeight: 500,
                  maxWidth: 140,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flexShrink: 1,
                }}
                title={curriculoFileName}
              >
                {curriculoFileName}
              </Typography>
              <a
                href={curriculoFile}
                download={curriculoFileName || 'curriculo'}
                style={{
                  background: '#006916',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 18px',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px #00691622',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginLeft: 8
                }}
              >
                <svg style={{ marginRight: 4 }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 16.5a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v9.5a1 1 0 0 1-1 1Z"/><path fill="#fff" d="M7.21 13.79a1 1 0 0 1 1.42-1.42l2.29 2.3 2.3-2.3a1 1 0 1 1 1.41 1.42l-3 3a1 1 0 0 1-1.42 0l-3-3Z"/><path fill="#fff" d="M5 20a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2H5Z"/></svg>
                Baixar
              </a>
              <IconButton size="small" sx={{ color: '#b71c1c', background: '#fbe9e7', boxShadow: 1 }} onClick={() => {
                setCurriculoFile('');
                setCurriculoFileName('');
                localStorage.removeItem('curriculoFile');
                localStorage.removeItem('curriculoFileName');
              }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
