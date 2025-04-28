import React from 'react';
import '../styles/EscolhaPerfil.css';
import { Link } from 'react-router-dom';

// Importa as imagens
import usuarioImage from '../assets/usuario.png';
import empresaImage from '../assets/empresa.png';

export default function EscolherPerfil() {
    return (
        <div className="perfil-container">
            <div className="perfil-header-banner">
                CUFA
            </div>

            <h2>Escolha seu perfil e comece agora!</h2>

            <div className="perfil-opcoes">
                <div className="perfil-card">
                    <img src={usuarioImage} alt="Usuário" className="perfil-imagem1" />
                    <Link to="/cadastroUsuario">
                        <button className="perfil-botao">USUARIO</button>
                    </Link>
                </div>

                <div className="perfil-card">
                    <img src={empresaImage} alt="Empresa" className="perfil-imagem1" />
                    <Link to="/cadastroEmpresa">
                        <button className="perfil-botao">EMPRESA</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
