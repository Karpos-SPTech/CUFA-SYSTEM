// Formatadores para campos do formulário

export const formatCNPJ = (cnpj) => {
  // Remove tudo que não é dígito
  const cleaned = cnpj.replace(/\D/g, '');
  
  // Se não tiver 14 dígitos, apenas retorna a string limpa
  if (cleaned.length !== 14) return cleaned;
  
  // Formata como XX.XXX.XXX/XXXX-XX
  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

export const removeMascara = (str) => {
  return str.replace(/\D/g, '');
};
