import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

axios.defaults.withCredentials = true;

const empresaService = {
  cadastrarEmpresa: async (empresaData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/empresas`,
        empresaData,
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
        `${API_BASE_URL}/empresas/login`,
        loginData
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  listarEmpresas: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/empresas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  atualizarEmpresa: async (id, empresaData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/empresas/${id}`,
        empresaData,
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

  deletarEmpresa: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/empresas/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getEmpresaLogada: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/empresas/me`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default empresaService;
