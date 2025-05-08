import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CadastroUsuario from './components/CadastroUsuario';
import CadastroEmpresa from './components/CadastroEmpresa';
import TelaUsuario from './TelaUsuario';
import TelaEmpresa from './TelaEmpresa';
import Escolha from './components/Escolha';

const CadastroLogin = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Escolha />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/telaUsuario" element={<TelaUsuario />} />
        <Route path="/telaEmpresa" element={<TelaEmpresa />} />
      </Routes>
    </Router>
  );
};

export default CadastroLogin;