/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cria a tabela 'projetos'
    await queryInterface.createTable('projetos', {
      id: {
        allowNull: false, // O campo não pode ser nulo
        autoIncrement: true, // O ID será gerado automaticamente
        primaryKey: true, // Define este campo como chave primária
        type: Sequelize.INTEGER // O tipo de dado é inteiro
      },
      nome: {
        type: Sequelize.STRING // O campo 'nome' é do tipo string
      },
      descricao: {
        type: Sequelize.STRING // O campo 'descricao' é do tipo string
      },
      categoria_id: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.INTEGER, // O tipo de dado é inteiro
        references: { model: 'categorias', key: 'id' } // Referência à tabela 'categorias'
      },
      turma_id: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.INTEGER, // O tipo de dado é inteiro
        references: { model: 'turmas', key: 'id' } // Referência à tabela 'turmas'
      },
      createdAt: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.DATE // O tipo de dado é data
      },
      updatedAt: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.DATE // O tipo de dado é data
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    // Remove a tabela 'projetos' caso seja necessário reverter a migração
    await queryInterface.dropTable('projetos'); // Remove a tabela 'projetos'
    await queryInterface.sequelize.query('PRAGMA foreign_keys = ON;'); // Reativa as restrições de chave estrangeira
  }
};
