import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom'; 
import '../styles/CadastroEmpresa.css';

export default function CadastroEmpresa() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [area, setArea] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função para validar CNPJ
  const validarCNPJ = async (cnpj) => {
    try {
      const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj.replace(/\D/g, '')}`);
      const data = await response.json();
      if (!data.razao_social) {
        setMensagem('CNPJ inválido! Verifique os dados.');
        return false;
      }
      setMensagem('');
      return true;
    } catch (error) {
      console.error("Erro ao validar o CNPJ:", error);
      setMensagem("Erro ao validar o CNPJ.");
      return false;
    }
  };

  // Função para formatar o CNPJ
  const formatarCNPJ = (cnpj) => {
    return cnpj
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  // Função para manipular o campo CNPJ
  const handleCnpjChange = (e) => {
    let cnpj = e.target.value.replace(/\D/g, '');
    if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);
    setCnpj(formatarCNPJ(cnpj));
    if (cnpj.length === 14) {
      validarCNPJ(cnpj);
    }
  };

  // Função para manipular o campo CEP
  const handleCepChange = (e) => {
    let cep = e.target.value.replace(/\D/g, '');
    if (cep.length > 5) {
      setCep(`${cep.slice(0, 5)}-${cep.slice(5, 8)}`);
    } else {
      setCep(cep);
    }
  };

  const handleBlurCep = async () => {
    let cepValue = cep.replace(/\D/g, '');
    if (cepValue.length !== 8) {
      setMensagem("CEP inválido! Deve conter 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      if (data.erro) {
        setEndereco("CEP não encontrado!");
        return;
      }
      const enderecoFormatado = `${data.logradouro} - ${data.bairro}, ${data.localidade} - ${data.uf}`;
      setEndereco(enderecoFormatado);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setEndereco("Erro ao buscar o endereço. Tente novamente.");
    }
  };

  const validarCadastroEmpresa = async () => {
   
    if (!nome || !email || !cep || !senha || !numero || !endereco || !cnpj || !area || !confirmarSenha) {
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
    if (cnpj.replace(/\D/g, '').length !== 14) {
      setMensagem("CNPJ inválido! Deve conter 14 dígitos.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valido = await validarCadastroEmpresa();
    if (!valido) return;

    const dados = { nome, email, senha, cep, numero, endereco, cnpj, area };
    try {
      const response = await fetch("http://localhost:8080/empresas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });
      if (!response.ok) throw new Error("Erro ao cadastrar usuário.");
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

      <h2>Cadastre a sua empresa</h2>

      <form className="formulario" onSubmit={handleSubmit}>
        <div className="linha">
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="linha">
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <input type="password" placeholder="Confirmação de senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
        </div>

        <div className="linha">
          <input type="text" placeholder="CEP" value={cep} onChange={handleCepChange} onBlur={handleBlurCep} />
          <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </div>

        <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        <input type="text" placeholder="CNPJ" value={cnpj} onChange={handleCnpjChange} />
        <input type="text" placeholder="Área" value={area} onChange={(e) => setArea(e.target.value)} />

        <button type="submit" className="botao-cadastrar">Cadastrar</button>

        {mensagem && <p className="mensagem-erro">{mensagem}</p>}

        <p className="login-link">
          Você já possui uma conta? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
