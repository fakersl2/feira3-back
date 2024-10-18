const {
  Model
} = require('sequelize'); // Importa a classe Model do Sequelize

module.exports = (sequelize, DataTypes) => {
  class turmas extends Model {
    /**
     * Método auxiliar para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Define a associação com o modelo projetosXturmas
      turmas.hasMany(models.projetosXturmas, { foreignKey: 'turma_id' }); // Cada turma pode ter várias relações com projetos
    }
  }

  // Inicializa o modelo com os atributos
  turmas.init({
    nome: DataTypes.STRING // Atributo que representa o nome da turma
  }, {
    sequelize, // Passa a instância do Sequelize
    modelName: 'turmas', // Nome do modelo
  });

  return turmas; // Retorna a classe do modelo
};
