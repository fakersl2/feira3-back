const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Define a classe 'categorias' que herda de Model
  class categorias extends Model {
    /**
     * Método auxiliar para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Define a relação de 'categorias' com 'projetosXcategorias'
      categorias.hasMany(models.projetosXcategorias, { foreignKey: 'categoria_id' });
    }
  }

  // Inicializa o modelo 'categorias' com seus atributos e opções
  categorias.init({
    nome: DataTypes.STRING // Nome da categoria (string)
  }, {
    sequelize, // Instância do Sequelize
    modelName: 'categorias', // Nome do modelo
  });

  return categorias; // Retorna o modelo 'categorias'
};
