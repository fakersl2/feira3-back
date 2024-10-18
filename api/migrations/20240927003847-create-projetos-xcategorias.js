/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cria a tabela 'projetosXcategorias' para gerenciar a relação muitos-para-muitos entre projetos e categorias
    await queryInterface.createTable('projetosXcategorias', {
      projeto_id: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.INTEGER, // O tipo de dado é inteiro
        primaryKey: true, // Define este campo como parte da chave primária
        references: { model: 'projetos', key: 'id' } // Referência à tabela 'projetos'
      },
      categoria_id: {
        allowNull: false, // O campo não pode ser nulo
        type: Sequelize.INTEGER, // O tipo de dado é inteiro
        primaryKey: true, // Define este campo como parte da chave primária
        references: { model: 'categorias', key: 'id' } // Referência à tabela 'categorias'
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
    // Remove a tabela 'projetosXcategorias' caso seja necessário reverter a migração
    await queryInterface.dropTable('projetosXcategorias');
  }
};
