const {
  Model
} = require('sequelize'); // Importa a classe Model do Sequelize

module.exports = (sequelize, DataTypes) => {
  class projetosXcategorias extends Model {
    /**
     * Método auxiliar para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Define as associações com outros modelos
      projetosXcategorias.belongsTo(models.projetos, { foreignKey: 'projeto_id' }); // Cada relação pertence a um projeto
      projetosXcategorias.belongsTo(models.categorias, { foreignKey: 'categoria_id' }); // Cada relação pertence a uma categoria
    }
  }
  
  // Inicializa o modelo com os atributos
  projetosXcategorias.init({
    projeto_id: {
      type: DataTypes.INTEGER, // ID do projeto
      primaryKey: true // Define como chave primária
    },
    categoria_id: {
      type: DataTypes.INTEGER, // ID da categoria
      primaryKey: true // Define como chave primária
    }
  }, {
    sequelize, // Passa a instância do Sequelize
    modelName: 'projetosXcategorias', // Nome do modelo
  });
  
  return projetosXcategorias; // Retorna a classe do modelo
};
