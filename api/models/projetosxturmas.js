const {
  Model
} = require('sequelize'); // Importa a classe Model do Sequelize

module.exports = (sequelize, DataTypes) => {
  class projetosXturmas extends Model {
    /**
     * Método auxiliar para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Define as associações com outros modelos
      projetosXturmas.belongsTo(models.projetos, { foreignKey: 'projeto_id' }); // Cada relação pertence a um projeto
      projetosXturmas.belongsTo(models.turmas, { foreignKey: 'turma_id' }); // Cada relação pertence a uma turma
    }
  }

  // Inicializa o modelo com os atributos
  projetosXturmas.init({
    projeto_id: {
      type: DataTypes.INTEGER, // ID do projeto
      primaryKey: true // Define como chave primária
    },
    turma_id: {
      type: DataTypes.INTEGER, // ID da turma
      primaryKey: true // Define como chave primária
    }
  }, {
    sequelize, // Passa a instância do Sequelize
    modelName: 'projetosXturmas', // Nome do modelo
  });

  return projetosXturmas; // Retorna a classe do modelo
};
