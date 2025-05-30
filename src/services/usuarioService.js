import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

axios.defaults.withCredentials = true;

const usuarioService = {
  cadastrarUsuario: async (usuarioData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/usuarios`,
        usuarioData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (loginData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/usuarios/login`,
        loginData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUsuarioLogado: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/usuarios/perfil`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  listarUsuarios: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/usuarios`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  atualizarUsuario: async (id, usuarioData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/usuarios/${id}`,
        usuarioData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletarUsuario: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/usuarios/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export default usuarioService;
