// Gerenciador de imagens da empresa para sincronização entre componentes
class EmpresaImageManager {
  constructor() {
    this.listeners = [];
  }

  // Adicionar um listener para mudanças de imagem
  addListener(callback) {
    this.listeners.push(callback);
    
    // Retornar uma função para remover o listener
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notificar todos os listeners sobre mudança de imagem
  notifyImageChange(imageType, imageData) {
    this.listeners.forEach(callback => {
      callback(imageType, imageData);
    });
  }

  // Atualizar imagem de perfil da empresa
  updateProfileImage(imageData) {
    localStorage.setItem('empresaProfileImg', imageData);
    this.notifyImageChange('profile', imageData);
  }

  // Atualizar imagem de capa da empresa
  updateCoverImage(imageData) {
    localStorage.setItem('empresaCoverImg', imageData);
    this.notifyImageChange('cover', imageData);
  }

  // Remover imagem de perfil da empresa
  removeProfileImage() {
    localStorage.removeItem('empresaProfileImg');
    this.notifyImageChange('profile', null);
  }

  // Remover imagem de capa da empresa
  removeCoverImage() {
    localStorage.removeItem('empresaCoverImg');
    this.notifyImageChange('cover', null);
  }

  // Obter imagem de perfil atual
  getProfileImage() {
    return localStorage.getItem('empresaProfileImg');
  }

  // Obter imagem de capa atual
  getCoverImage() {
    return localStorage.getItem('empresaCoverImg');
  }
}

// Exportar uma instância única (singleton)
export default new EmpresaImageManager();
