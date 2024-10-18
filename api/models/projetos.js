const {
  Model
} = require('sequelize'); // Importa a classe Model do Sequelize

module.exports = (sequelize, DataTypes) => {
  class projetos extends Model {
    /**
     * Método auxiliar para definir associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Define as associações com outros modelos
      projetos.hasMany(models.avaliacoes, { foreignKey: 'projeto_id' }); // Um projeto pode ter muitas avaliações
      projetos.hasMany(models.projetosXcategorias, { foreignKey: 'projeto_id' }); // Um projeto pode estar em muitas categorias
      projetos.hasMany(models.projetosXturmas, { foreignKey: 'projeto_id' }); // Um projeto pode estar em muitas turmas
    }
  }
  
  // Inicializa o modelo com os atributos
  projetos.init({
    nome: DataTypes.STRING, // Nome do projeto
    descricao: DataTypes.STRING, // Descrição do projeto
    categoria_id: DataTypes.INTEGER, // ID da categoria associada
    turma_id: DataTypes.INTEGER // ID da turma associada
  }, {
    sequelize, // Passa a instância do Sequelize
    modelName: 'projetos', // Nome do modelo
  });
  
  return projetos; // Retorna a classe do modelo
};
