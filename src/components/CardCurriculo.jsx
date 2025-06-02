import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
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
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              if (file.size > 5 * 1024 * 1024) {
                alert('O arquivo deve ter no máximo 5MB.');
                return;
              }

              const userId = localStorage.getItem('userId');
              const userToken = localStorage.getItem('token');

              const formData = new FormData();
              formData.append("file", file);

              try {
                const response = await fetch("http://localhost:8080/curriculos/upload", {
                  method: "POST",
                  body: formData,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                  }
                });

                if (response.ok) {
                  const fileNameFromServer = await response.text();
                  setCurriculoFile(fileNameFromServer); // nome retornado do backend
                  setCurriculoFileName(file.name); // nome original do arquivo para exibir ao usuário
                } else {
                  alert("Erro ao enviar currículo");
                }
              } catch (error) {
                alert("Erro de rede ao enviar currículo");
              }
            }}
          />
          <button
            type="button"
            style={{
              background: '#006916',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '6px 18px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 6px #00691622'
            }}
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
                href={`http://localhost:8080/curriculos/download/${curriculoFile}`}
                download
                target="_blank"
                rel="noopener noreferrer"
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
                <DownloadIcon fontSize="small" />
                Baixar
              </a>
              <IconButton size="small" sx={{ color: '#b71c1c', background: '#fbe9e7', boxShadow: 1 }} onClick={() => {
                setCurriculoFile('');
                setCurriculoFileName('');
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
