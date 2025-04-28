import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
// IMPORTA as imagens
import googleLogo from '../assets/google-logo.png';
import microsoftLogo from '../assets/microsoft-logo.png';
import emailLogo from '../assets/Icon-Email.png';
import passwordLogo from '../assets/Icon-Senha.png';

export default function Login() {
    const navigate = useNavigate(); // Navegação com React Router
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [divMensagem, setDivMensagem] = useState('');

    const [showSenha, setShowSenha] = useState(false); // Para alternar a visibilidade da senha

    // Função para alternar a visibilidade da senha
    const toggleSenha = () => {
        setShowSenha(!showSenha);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !senha) {
            setDivMensagem("Por favor, preencha todos os campos.");
            return;
        }

        if (!email.includes("@") || !email.includes(".com")) {
            setDivMensagem("Por favor, insira um email válido.");
            return;
        }

        const loginData = { email, senha };

        try {
            let response = await fetch("http://localhost:8080/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const user = await response.json();
                console.log("Usuário logado com sucesso:", user);
                navigate("/cufaSistema");
                return;
            }

            response = await fetch("http://localhost:8080/empresas/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const empresa = await response.json();
                console.log("Empresa logada com sucesso:", empresa);
                navigate("/cufaSistema");
                return;
            }

            setDivMensagem("Email ou senha incorretos.");

        } catch (error) {
            console.error("Erro ao realizar o login:", error);
            setDivMensagem("Erro ao tentar fazer login. Tente novamente.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-header-banner">CUFA</div>

            <h2>Acesse sua conta</h2>

            <form className="login-formulario" onSubmit={handleSubmit}>
                <input
                    className="login-full login-input-email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    
                />
                
                <div className="password-container">
                    <input
                        className="login-full"
                        type={showSenha ? "text" : "password"}
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    {/* <button type="button" onClick={toggleSenha} className="toggle-senha">
                        {showSenha ? "Ocultar" : "Mostrar"}
                    </button> */}
                </div>

                {divMensagem && <div className="div-mensagem">{divMensagem}</div>}

                <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '0.9rem' }}>
                    <a href="#" style={{ color: 'var(--dark-green)', fontWeight: 'bold', textDecoration: 'none' }}>
                        Esqueceu sua senha?
                    </a>
                </div>

                <button type="submit" className="login-botao-entrar">
                    Entrar
                </button>

                <p className="login-link">
                    Não tem uma conta? <Link to="/escolha">Cadastre-se</Link>
                </p>

                <div style={{ marginTop: '30px', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                    Ou entre com
                </div>

                <div className="login-linha" style={{ marginTop: '10px' }}>
                    <button
                        type="button"
                        className="login-botao-social"
                        style={{
                            backgroundColor: 'var(--white)',
                            color: 'var(--dark-green)',
                            border: '1px solid var(--dark-green)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                        }}
                    >
                        <img
                            src={googleLogo}
                            alt="Google logo"
                            style={{ width: '20px', height: '20px' }}
                        />
                        Google
                    </button>
                    <button
                        type="button"
                        className="login-botao-social"
                        style={{
                            backgroundColor: 'var(--white)',
                            color: 'var(--dark-green)',
                            border: '1px solid var(--dark-green)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                        }}
                    >
                        <img
                            src={microsoftLogo}
                            alt="Microsoft logo"
                            style={{ width: '20px', height: '20px' }}
                        />
                        Microsoft
                    </button>
                </div>
            </form>
        </div>
    );
}
