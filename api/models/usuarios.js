const {
  Model
} = require('sequelize'); // Importa a classe Model do Sequelize

module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Método auxiliar para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Define a associação com o modelo avaliacoes
      usuarios.hasMany(models.avaliacoes, { foreignKey: 'usuario_id' }); // Cada usuário pode ter várias avaliações
    }
  }

  // Inicializa o modelo com os atributos
  usuarios.init({
    nome: DataTypes.STRING, // Atributo que representa o nome do usuário
    senha: DataTypes.STRING  // Atributo que representa a senha do usuário
  }, {
    sequelize, // Passa a instância do Sequelize
    modelName: 'usuarios', // Nome do modelo
  });

  return usuarios; // Retorna a classe do modelo
};
