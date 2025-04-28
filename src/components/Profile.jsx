import React, { useEffect } from "react";
import profilePic from "../assets/icon.png";
import "./App.css";
import Header from "./Header";

const Profile = () => {
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
            <div className="perfil-pagina">
                {/* Cartão de Perfil */}
                <div className="perfil-cartao">
                    <div className="perfil-cabecalho">
                        <button className="perfil-botao-editar">
                            <i className="fas fa-pen"></i>
                        </button>
                    </div>
                    <img
                        src={profilePic}
                        alt="Guilherme Silva"
                        className="perfil-imagem"
                    />
                    <h2 className="perfil-nome">GUILHERME SILVA</h2>
                    <p className="perfil-descricao">"Pessoa dedicada, comunicativa e sempre em busca de aprendizado. Valoriza o respeito e a honestidade nas relações.</p>
                    <p className="perfil-localizacao">São Paulo, SP</p>
                    <button className="perfil-icone-editar">
                        <i className="fas fa-pen"></i>
                    </button>
                </div>

                {/* Seção Experiência */}
                <div className="perfil-experiencia">
                    <div className="perfil-experiencia-cabecalho">
                        <h3>Experiência</h3>
                        <div className="perfil-experiencia-acoes">
                            <span className="perfil-experiencia-icone-adicionar">+</span>
                            <span className="perfil-experiencia-icone-editar">✎</span>
                        </div>
                    </div>
                    <div className="experiencias">
                        <div className="perfil-experiencia-cartao">
                            <img
                                src={profilePic}
                                alt="Ícone"
                            />
                            <div>
                                <h4>Função</h4>
                                <p>Serviços Gerais</p>
                                <p>Rio de Janeiro, RJ</p>
                                <p>02/2020 - 01/2021</p>
                            </div>
                        </div>
                        <div className="perfil-experiencia-cartao">
                            <img
                                src={profilePic}
                                alt="Ícone"
                            />
                            <div>
                                <h4>Função</h4>
                                <p>Entregador – App Delivery</p>
                                <p>Rio de Janeiro, RJ</p>
                                <p>04/2019 - 12/2019</p>
                            </div>
                        </div>
                        <div className="perfil-experiencia-cartao">
                            <img
                                src={profilePic}
                                alt="Ícone"
                            />
                            <div>
                                <h4>Função</h4>
                                <p>Chapeiro – McDonald's</p>
                                <p>Rio de Janeiro, RJ</p>
                                <p>01/2022 - 12/2023</p>
                            </div>
                        </div><div className="perfil-experiencia-cartao">
                            <img
                                src={profilePic}
                                alt="Ícone"
                            />
                            <div>
                                <h4>Função</h4>
                                <p>Ajudante de Obras</p>
                                <p>Rio de Janeiro, RJ</p>
                                <p>03/2021 - 11/2021</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção Sobre */}
                <div className="perfil-sobre">
                    <h3>Sobre</h3>
                    <p>
                        Tenho experiência como ajudante de obras, em serviços gerais e com entregas.
                        Sou uma pessoa dedicada, responsável e sempre disposta a aprender novas funções.
                        Busco crescer profissionalmente e contribuir de forma positiva por onde passo,
                        com vontade de evoluir e fazer a diferença no ambiente de trabalho.
                    </p>
                </div>

                {/* Seção Currículo */}
                <div className="perfil-curriculo">
                    <div className="perfil-curriculo-cabecalho">
                        <h3>Currículo</h3>
                        <span className="perfil-curriculo-icone-editar">✎</span>
                    </div>
                    <div className="perfil-curriculo-cartao">
                        <p><strong>Nome:</strong> Guilherme Silva</p>
                        <p><strong>Contato:</strong> (11) 99999-9999</p>
                        <p><strong>Email:</strong> guilherme@email.com</p>
                        <p><strong>Resumo:</strong></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                        <p><strong>Habilidades:</strong></p>
                        <ul>
                            <li>Trabalho em equipe</li>
                            <li>Proatividade</li>
                            <li>Comunicação</li>
                        </ul>
                        <p><strong>Experiência:</strong></p>
                        <ul>
                            <li>Empresa X (2024 - Atual)</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Consectetur adipiscing elit</li>
                        </ul>
                        <p><strong>Educação:</strong></p>
                        <ul>
                            <li>Lorem Ipsum University (2023 - 2025)</li>
                        </ul>
                    </div>
                    <button className="perfil-curriculo-botao">
                        <span>Anexar</span>
                        <i className="fas fa-paperclip"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;