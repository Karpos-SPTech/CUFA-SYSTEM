import React, { useEffect } from "react";
import { useSavedItems } from "./SavedItemsContext";
import JobCard from "./JobCard";
import "./App.css"; // Importando o CSS global
import Header from "./Header";
import mcdonaldsLogo from '../assets/mcdonalds-logo.png';

const SavedItemsPage = () => {
    const { savedItems } = useSavedItems();
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
        <div>
            <Header />
            <div className="saved-items-page-container">
                {/* Div para o contador */}
                <div className="saved-items-counter">
                    <h3>Meus itens</h3>
                    <p>Vagas salvas</p>
                    <span>1</span>
                </div>

                {/* Div para os cards salvos */}
                <div className="saved-items-list">
                    <h2>Publicações Salvas</h2>
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
                </div>
            </div>
        </div>
    );
};

export default SavedItemsPage;