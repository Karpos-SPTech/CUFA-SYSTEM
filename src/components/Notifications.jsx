import React, { useState } from "react";
import notificationsIcon from "../assets/notifications-icon.png";
import avatar1 from "../assets/mcdonalds-logo.png";
import avatar2 from "../assets/assai-logo.jpg";
import "./App.css";

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false); // Controla a visibilidade do menu

    const toggleNotifications = () => {
        setIsOpen(!isOpen); // Alterna entre abrir e fechar
    };

    return (
        <div className="notificacao-container">
            <div
                className="notificacao-icon"
                onClick={toggleNotifications}
                style={{ cursor: "pointer", textAlign: "center" }} // Centraliza o texto
            >
                <img src={notificationsIcon} alt="Notificações" />
                <h1 className="header-text">Notificações</h1>
            </div>
            {isOpen && (
                <div className="notificacao-menu">
                    <h3 className="notificacao-title">Notificações</h3>
                    <span className="notificacao-count">99+</span>
                    <div className="notificacao-list">
                        <div className="notificacao-item">
                            <div className="notificacao-avatar">
                            <img src={avatar1} alt="Avatar" />
                            </div>
                            <div className="notificacao-content">
                                <p className="notificacao-name">McDonald's</p>
                                <p className="notificacao-message">Nova vaga disponível para Chapeiro! Pode ser a oportunidade que você está esperando.</p>
                            </div>
                        </div>
                        <div className="notificacao-item">
                            <div className="notificacao-avatar">
                            <img src={avatar2} alt="Avatar" />
                            </div>
                            <div className="notificacao-content">
                                <p className="notificacao-name">RH da Empresa Assaí</p>
                                <p className="notificacao-message">Seu perfil foi selecionado! Temos uma vaga que pode te interessar. Confira agora!</p>
                            </div>
                        </div>
                        {/* Adicione mais notificações aqui */}
                        <div className="notificacao-item">
                            <div className="notificacao-avatar"></div>
                            <div className="notificacao-content">
                                <p className="notificacao-name">Novo no site</p>
                                <p className="notificacao-message">Novas vagas foram adicionadas na sua área de interesse! Dê uma olhada e se inscreva.</p>
                            </div>
                        </div>
                        <div className="notificacao-item">
                            <div className="notificacao-avatar"></div>
                            <div className="notificacao-content">
                            <p className="notificacao-name">RH da Empresa Elera</p>
                            <p className="notificacao-message">Estamos impressionados com o seu perfil! Uma vaga de Assistente Administrativo está disponível para você.</p>
                            </div>
                        </div>
                        <div className="notificacao-item">
                            <div className="notificacao-avatar"></div>
                            <div className="notificacao-content">
                            <p className="notificacao-name">CUFA Conecta</p>
                            <p className="notificacao-message">Acabamos de adicionar novas vagas para ajudante de obras. Veja se alguma é do seu interesse!</p>
                            </div>
                        </div>
                        <div className="notificacao-item">
                            <div className="notificacao-avatar"></div>
                            <div className="notificacao-content">
                            <p className="notificacao-name">Equipe de Recrutamento</p>
                            <p className="notificacao-message">A empresa Renner acaba de abrir uma vaga de serviços gerais. Acreditamos que seu perfil se encaixa perfeitamente!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;