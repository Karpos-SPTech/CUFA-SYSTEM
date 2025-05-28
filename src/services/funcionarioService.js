import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

axios.defaults.withCredentials = true;

const funcionarioService = {
  criarFuncionario: async (funcionarioData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/funcionarios`,
        funcionarioData,
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
};

export default funcionarioService;
