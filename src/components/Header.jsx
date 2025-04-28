import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home-icon.png";
import searchIcon from "../assets/search-icon.png";
import profilePic from "../assets/icon.png";
import logo from "../assets/Logo.png";
import Notifications from "./Notifications";
import "./App.css";

const Header = () => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // Controla o modal de ajustes

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const openSettingsModal = () => {
        setIsSettingsModalOpen(true); // Abre o modal
    };

    const closeSettingsModal = () => {
        setIsSettingsModalOpen(false); // Fecha o modal
    };

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <div
                        className="header-item"
                        onClick={() => navigate("/cufaSistema")}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={homeIcon} alt="Início" className="header-icon" />
                        <h1 className="header-text active">Início</h1>
                    </div>
                    <Notifications />
                </div>
                <div className="header-center">
                    <img src={logo} alt="Logo" className="header-logo" />
                </div>
                <div className="header-right">
                    <input type="text" placeholder="Pesquisar" />
                    <img src={searchIcon} alt="Pesquisar" className="header-icon" />
                    <div className="profile-container">
                        <img
                            src={profilePic}
                            alt="Perfil"
                            className="profile-pic"
                            onClick={toggleProfileMenu}
                            style={{ cursor: "pointer" }}
                        />
                        {isProfileMenuOpen && (
                            <div className="profile-menu">
                                <div className="profile-menu-item" onClick={() => navigate("/profile")}>
                                    <i className="fas fa-user"></i> Perfil
                                </div>
                                <div className="profile-menu-item" onClick={openSettingsModal}>
                                    <i className="fas fa-cog"></i> Ajustes
                                </div>
                                <div className="profile-menu-item" onClick={() => navigate("/")}>
                                    <i className="fas fa-sign-out-alt"></i> Sair
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Modal de Ajustes */}
            {isSettingsModalOpen && (
                <div className="settings-modal">
                    <div className="settings-modal-content">
                        <button className="close-modal-icon" onClick={closeSettingsModal}>
                            &times;
                        </button>
                        <h2 className="settings-title">Atualize seu Perfil</h2>
                        <form className="settings-form">
                            <div className="form-group">
                                <input type="text" placeholder="Nome" />
                                <input type="text" placeholder="Sobrenome" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="CPF" />
                                <input type="text" placeholder="Telefone" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Data de nascimento" />
                                <input type="text" placeholder="CEP" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Bairro" />
                                <input type="text" placeholder="Número" />
                            </div>
                            <div className="form-group endereço">

                                <input type="text" placeholder="Endereço" className="full-width" />
                            </div>
                            <button type="submit" className="settings-submit-button">
                                Atualizar Perfil
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;