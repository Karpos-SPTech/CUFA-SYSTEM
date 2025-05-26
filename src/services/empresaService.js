import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const empresaService = {

  cadastrarEmpresa: async (empresaData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/empresas`, empresaData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 
  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/empresas/login`, loginData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 
  listarEmpresas: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/empresas`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  atualizarEmpresa: async (id, empresaData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/empresas/${id}`, empresaData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  deletarEmpresa: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/empresas/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getEmpresaLogada: async () => {
    try {

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado');
      }


      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const empresaId = tokenData.id;


      const response = await axios.get(`${API_BASE_URL}/empresas/${empresaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default empresaService;
