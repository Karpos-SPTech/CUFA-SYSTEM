import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/CadastroUsuario.css';

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const toggleConfirmarSenha = () => {
    setMostrarConfirmarSenha(!mostrarConfirmarSenha);
  };

  const validarCadastroUsuario = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem("Todos os campos devem ser preenchidos.");
      return false;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setMensagem("Por favor, insira um email válido.");
      return false;
    }
    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return false;
    }
    if (!/[A-Z]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos uma letra maiúscula.");
      return false;
    }
    if (!/\d/.test(senha)) {
      setMensagem("A senha deve conter pelo menos um número.");
      return false;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha)) {
      setMensagem("A senha deve conter pelo menos um caractere especial.");
      return false;
    }
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return false;
    }
    setMensagem(''); // Limpar mensagem de erro
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCadastroUsuario()) {
      return;
    }

    const dados = { nome, email, senha };
    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário.");
      }

      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="container">
      <div className="header-banner">
        <h1>CUFA</h1>
      </div>

      <h2>Crie a sua conta</h2>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="linha">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="linha">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            type={mostrarConfirmarSenha ? "text" : "password"}
            placeholder="Confirmação de senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <div>
            {/* <button type="button" onClick={toggleSenha}>
              {mostrarSenha ? "Ocultar Senha" : "Mostrar Senha"}
            </button>
            <button type="button" onClick={toggleConfirmarSenha}>
              {mostrarConfirmarSenha ? "Ocultar Confirmação" : "Mostrar Confirmação"}
            </button> */}
          </div>
        </div>

        <button type="submit" className="botao-cadastrar">
          Cadastrar
        </button>

        {mensagem && <p className="mensagem-erro">{mensagem}</p>}

        <p className="login-link">
          Você já possui uma conta? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
