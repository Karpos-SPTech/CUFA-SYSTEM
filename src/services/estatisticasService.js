import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const estatisticasService = {
    getEstatisticasCandidatos: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/estatisticas/candidatos`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getEstatisticasPorFaixaEtaria: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/estatisticas/faixa-etaria`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getEstatisticasPorEscolaridade: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/estatisticas/escolaridade`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default estatisticasService;
