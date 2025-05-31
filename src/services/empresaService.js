import api from './api';

const empresaService = {
  cadastrarEmpresa: async (empresaData) => {
    try {
      const response = await api.post('/empresas', empresaData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // O servidor retornou um erro com status diferente de 2xx
        throw {
          message: error.response.data.message || 'Erro ao cadastrar empresa',
          status: error.response.status,
        };
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          status: 0,
        };
      } else {
        // Erro ao configurar a requisição
        throw {
          message: 'Erro ao processar a requisição',
          status: -1,
        };
      }
    }
  },

  login: async (loginData) => {
    try {
      const response = await api.post('/empresas/login', loginData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // O servidor retornou um erro com status diferente de 2xx
        throw {
          message: error.response.data.message || 'Erro ao fazer login',
          status: error.response.status,
        };
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          status: 0,
        };
      } else {
        // Erro ao configurar a requisição
        throw {
          message: 'Erro ao processar a requisição',
          status: -1,
        };
      }
    }
  },

  getEmpresaLogada: async () => {
    try {
      const response = await api.get('/empresas/perfil');
      return response.data;
    } catch (error) {
      if (error.response) {
        // O servidor retornou um erro com status diferente de 2xx
        throw {
          message: error.response.data.message || 'Erro ao buscar empresa logada',
          status: error.response.status,
        };
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          status: 0,
        };
      } else {
        // Erro ao configurar a requisição
        throw {
          message: 'Erro ao processar a requisição',
          status: -1,
        };
      }
    }
  },

  listarEmpresas: async () => {
    try {
      const response = await api.get('/empresas');
      return response.data;
    } catch (error) {
      if (error.response) {
        // O servidor retornou um erro com status diferente de 2xx
        throw {
          message: error.response.data.message || 'Erro ao listar empresas',
          status: error.response.status,
        };
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          status: 0,
        };
      } else {
        // Erro ao configurar a requisição
        throw {
          message: 'Erro ao processar a requisição',
          status: -1,
        };
      }
    }
  },

  atualizarEmpresa: async (id, empresaData) => {
    try {
      const response = await api.put(`/empresas/${id}`, empresaData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // O servidor retornou um erro com status diferente de 2xx
        throw {
          message: error.response.data.message || 'Erro ao atualizar empresa',
          status: error.response.status,
        };
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          status: 0,
        };
      } else {
        // Erro ao configurar a requisição
        throw {
          message: 'Erro ao processar a requisição',
          status: -1,
        };
      }
    }
  },

  deletarEmpresa: async (id) => {
    try {
      await api.delete(`/empresas/${id}`);
    } catch (error) {
      if (error.response) {
        // O servidor retornou um erro com status diferente de 2xx
        throw {
          message: error.response.data.message || 'Erro ao deletar empresa',
          status: error.response.status,
        };
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
          status: 0,
        };
      } else {
        // Erro ao configurar a requisição
        throw {
          message: 'Erro ao processar a requisição',
          status: -1,
        };
      }
    }
  },
};

export default empresaService;
