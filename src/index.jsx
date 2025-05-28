import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CadastroUsuario from './components/CadastroUsuario';
import CadastroEmpresa from './components/CadastroEmpresa';
import TelaUsuario from './TelaUsuario';
import TelaEmpresa from './TelaEmpresa';
import Escolha from './components/Escolha';
import AtualizarSenha from './components/AtualizarSenha';
import AtualizarSenhaPage from './components/AtualizarSenhaPage';
import DashboardCufa from './DashboardCufa';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Escolha" element={<Escolha />} />
        <Route path="/" element={<Login />} />
        <Route path="/AtualizarSenha" element={<AtualizarSenha />} />
        <Route path="/AtualizarSenhaPage" element={<AtualizarSenhaPage />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/telaUsuario" element={<TelaUsuario />} />
        <Route path="/telaEmpresa" element={<TelaEmpresa />} />
        <Route path="/DashboardCufa" element={<DashboardCufa />} />
        <Route path="/dashboard" element={<DashboardCufa />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);