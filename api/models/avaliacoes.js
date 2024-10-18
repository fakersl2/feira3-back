const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Define a classe 'avaliacoes' que herda de Model
  class avaliacoes extends Model {
    /**
     * Método auxiliar para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Define a relação de 'avaliacoes' com 'projetos'
      avaliacoes.belongsTo(models.projetos, { foreignKey: 'projeto_id' });
      // Define a relação de 'avaliacoes' com 'usuarios'
      avaliacoes.belongsTo(models.usuarios, { foreignKey: 'usuario_id' });
    }
  }

  // Inicializa o modelo 'avaliacoes' com seus atributos e opções
  avaliacoes.init({
    nota: DataTypes.STRING, // Nota do usuário (string)
    comentario: DataTypes.STRING, // Comentário do usuário (string)
    codigo: DataTypes.INTEGER, // Código da avaliação (inteiro)
    projeto_id: DataTypes.INTEGER, // ID do projeto relacionado (inteiro)
    usuario_id: DataTypes.INTEGER // ID do usuário que fez a avaliação (inteiro)
  }, {
    sequelize, // Instância do Sequelize
    modelName: 'avaliacoes', // Nome do modelo
  });

  return avaliacoes; // Retorna o modelo 'avaliacoes'
};
