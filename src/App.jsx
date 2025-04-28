import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './components/CadastroUsuario';
import Login from './components/Login';
import Escolha from './components/escolha';
import CadastroEmpresa from './components/CadastroEmpresa';
import CufaSistema from './components/CufaSistema';
import Profile from './components/Profile';
import SavedItemsPage from './components/SavedItemsPage';
import ProfileCard from './components/ProfileCard';
import { SavedItemsProvider } from './components/SavedItemsContext';

function App() {
  return (
    <Router>
      <SavedItemsProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/escolha" element={<Escolha />} />
          <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
          <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="/cufaSistema" element={<CufaSistema />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-items" element={<SavedItemsPage />} />
        </Routes>
      </SavedItemsProvider>
    </Router>
  );
}

export default App;
