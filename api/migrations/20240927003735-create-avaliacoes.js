/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cria a tabela 'avaliacoes'
    await queryInterface.createTable('avaliacoes', {
      id: {
        allowNull: false, // O campo não pode ser nulo
        autoIncrement: true, // O ID será gerado automaticamente
        primaryKey: true, // Define este campo como chave primária
        type: Sequelize.INTEGER // O tipo de dado é inteiro
      },
      codigo: {
        type: Sequelize.INTEGER // O campo 'codigo' é do tipo inteiro
      },
      nota: {
        type: Sequelize.STRING // O campo 'nota' é do tipo string
      },
      comentario: {
        type: Sequelize.STRING // O campo 'comentario' é do tipo string
      },
      projeto_id: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.INTEGER, // O tipo de dado é inteiro
        references: { model: 'projetos', key: 'id' } // Referência à tabela 'projetos'
      },
      usuario_id: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.INTEGER, // O tipo de dado é inteiro
        references: { model: 'usuarios', key: 'id' } // Referência à tabela 'usuarios'
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
    // Remove a tabela 'avaliacoes' caso seja necessário reverter a migração
    await queryInterface.dropTable('avaliacoes');
  }
};
