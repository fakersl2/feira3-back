/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cria a tabela 'turmas'
    await queryInterface.createTable('turmas', {
      id: {
        allowNull: false, // O campo não pode ser nulo
        autoIncrement: true, // O ID será gerado automaticamente
        primaryKey: true, // Define este campo como chave primária
        type: Sequelize.INTEGER // O tipo de dado é inteiro
      },
      nome: {
        type: Sequelize.STRING // O campo 'nome' é do tipo string
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
    // Remove a tabela 'turmas' caso seja necessário reverter a migração
    await queryInterface.dropTable('turmas'); // Remove a tabela 'turmas'
    await queryInterface.sequelize.query('PRAGMA foreign_keys = ON;'); // Reativa as restrições de chave estrangeira
  }
};
