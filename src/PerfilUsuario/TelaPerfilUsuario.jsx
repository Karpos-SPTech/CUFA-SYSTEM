import React, { useRef, useState, useEffect } from "react";
import HeaderUsuario from "../components/HeaderUsuario";
import { Box } from "@mui/material";
import "./PerfilUsuario.css";
import CardCurriculo from '../components/PerfilUsuario-Components/CardCurriculo';
import CardExperiencia from '../components/CardExperiencia';
import CardPerfil from '../components/PerfilUsuario-Components/CardPerfil';
import CardSobre from '../components/PerfilUsuario-Components/CardSobre';

const MAX_SIZE_MB = 2;

export default function TelaPerfilUsuario() {
  const [profileImg, setProfileImg] = useState(null);
  const [hover, setHover] = useState(false);
  const [curriculoFileName, setCurriculoFileName] = useState(localStorage.getItem('curriculoFileName') || '');
  const [curriculoFile, setCurriculoFile] = useState(localStorage.getItem('curriculoFile') || '');
  const [experiencias, setExperiencias] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [experienciaEditando, setExperienciaEditando] = useState(null);
  const fileInputRef = useRef();
  const curriculoInputRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem('profileImg');
    if (saved) setProfileImg(saved);
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      localStorage.setItem('profileImg', ev.target.result);
      setProfileImg(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem('profileImg');
    setProfileImg(null);
  };

  const handleCurriculoClick = () => {
    curriculoInputRef.current.click();
  };

  const handleDeleteExperiencia = (id) => {
    setExperiencias(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="perfil-usuario-main">
      <Box sx={{ background: '#e5eee3', maxHeight: '100vh', width: '100%', pb: 6 }}>
        <HeaderUsuario />
        <Box sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start',
          gap: 2, pt: 4, px: 1, maxWidth: 1300, margin: '0 auto', width: '100%'
        }}>
          {/* Coluna principal esquerda */}
          <Box sx={{ flex: 2, maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Card do perfil */}
            <CardPerfil
              profileImg={profileImg}
              hover={hover}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onAvatarClick={handleAvatarClick}
              onRemovePhoto={handleRemovePhoto}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
            />
            {/* Cards "Sobre" e "Currículo" */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              {/* Card Sobre */}
              <CardSobre />
              {/* Card Currículo */}
              <CardCurriculo
                curriculoFile={curriculoFile}
                curriculoFileName={curriculoFileName}
                curriculoInputRef={curriculoInputRef}
                handleCurriculoClick={handleCurriculoClick}
                setCurriculoFile={setCurriculoFile}
                setCurriculoFileName={setCurriculoFileName}
              />
            </Box>
          </Box>
          {/* Coluna lateral direita - Experiência ocupa altura dos 3 cards à esquerda */}
          <Box sx={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <CardExperiencia
              experiencias={experiencias}
              onAddClick={() => setOpenAddModal(true)}
              onEditClick={exp => { setExperienciaEditando(exp); setOpenEditModal(true); }}
              onDeleteClick={handleDeleteExperiencia}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
