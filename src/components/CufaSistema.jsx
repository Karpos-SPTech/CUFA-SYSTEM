import React, { useEffect }from 'react';
import { Routes, Route } from 'react-router-dom'; // Remover o Router daqui
import Header from './Header';
import ProfileCard from './ProfileCard';
import JobCard from './JobCard';
import './App.css'; // Importa o CSS global
import Filters from './Filters';
import Profile from './Profile'; // Importa o componente de perfil
import mcdonaldsLogo from '../assets/mcdonalds-logo.png';
import SavedItemsPage from './SavedItemsPage'; // Importe o componente de itens salvos
import { SavedItemsProvider } from './SavedItemsContext'; // Importe o contexto de itens salvos

const CufaSistema = () => {
    useEffect(() => {
    // Adiciona classes exclusivas para o CufaSistema
    document.body.classList.add('cufa-sistema-active');
    document.getElementById('root').classList.add('cufa-sistema-active');

    // Limpeza: remove as classes quando o componente for desmontado
    return () => {
      document.body.classList.remove('cufa-sistema-active');
      document.getElementById('root').classList.remove('cufa-sistema-active');
    };
  }, []);
    return (
        <SavedItemsProvider>
            <div className="App">
                <Header />
                <Routes>
                    {/* Rota para a página inicial */}
                    <Route
                        path="/"
                        element={
                            <div className="main-content">
                                {/* Sidebar esquerda */}
                                <div className="profile-container">
                                    <ProfileCard />
                                </div>

                                {/* Conteúdo principal */}
                                <div className="job-section">
                                    <JobCard
                                        logo={mcdonaldsLogo} // Passa a logo como prop
                                        company="Mc Donald's"
                                        type="Fast Food | CLT"
                                        time="Há 7 horas"
                                        title="🍟 Vem Trabalhar no Méqui!"
                                        description="📋 Descrição da vaga: Atue na preparação dos lanches na chapa, com qualidade e agilidade. 🍔🔥."
                                        functions={["Preparar lanches", "Manter a chapa em ordem", "Seguir padrão de qualidade"]}
                                        benefits={[
                                            "🍽 Vale-refeição/alimentação",
                                            "🩺 Plano de saúde e odontológico",
                                            "🚌 Vale-transporte",
                                        ]}
                                    />
                                </div>

                                {/* Sidebar direita */}
                                <Filters />
                            </div>
                        }
                    />

                    {/* Rota para a página de perfil */}
                    <Route path="/profile" element={<Profile />} />
                    {/* Rota para a página de itens salvos */}
                </Routes>
            </div>
        </SavedItemsProvider>
    );
};

export default CufaSistema;
