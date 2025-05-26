import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from './components/Login';

// Este componente agora é apenas um redirecionamento para a página de Login
const CadastroLogin = () => {

  return <Navigate to="/" replace />;

};

export default CadastroLogin;