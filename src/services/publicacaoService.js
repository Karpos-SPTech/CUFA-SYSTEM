import axios from 'axios';

const API_BASE_URL = 'http://localhost:5174';

axios.defaults.withCredentials = true;

const publicacaoService = {
  criarPublicacao: async (publicacaoData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/publicacao`, publicacaoData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  listarPublicacoes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/publicacao`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default publicacaoService;
