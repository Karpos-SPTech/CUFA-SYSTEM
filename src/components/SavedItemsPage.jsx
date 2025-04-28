import React, { useEffect } from "react";
import { useSavedItems } from "./SavedItemsContext";
import JobCard from "./JobCard";
import "./App.css"; // Importando o CSS global
import Header from "./Header";

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
                    <span>{savedItems.length}</span>
                </div>

                {/* Div para os cards salvos */}
                <div className="saved-items-list">
                    <h2>Publicações Salvas</h2>
                    {savedItems.length === 0 ? (
                        <p>Você ainda não salvou nenhuma publicação.</p>
                    ) : (
                        savedItems.map((item, index) => (
                            <JobCard key={index} {...item} customClass="saved-job-card" />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedItemsPage;