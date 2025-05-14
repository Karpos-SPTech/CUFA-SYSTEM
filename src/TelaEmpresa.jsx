import Header from './components/Header';
import { Box } from '@mui/material';
import '../src/telaEmpresa.css';

const TelaEmpresa = () => {
  return (
    <Box className="tela-empresa-container">
      <Header />
      <div className="tela-empresa-content">
        <h1>Tela Empresa</h1>
        <p>Esta é a tela de cadastro ou visualização de empresas.</p>
      </div>
    </Box>
  );
};

export default TelaEmpresa;