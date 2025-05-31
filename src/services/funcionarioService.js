import api from "./api";

const funcionarioService = {
  criarFuncionario: async (funcionarioData) => {
    try {
      const response = await api.post("/funcionarios", funcionarioData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar funcionário:", error.response || error);
      throw error;
    }
  },
};

export default funcionarioService;
