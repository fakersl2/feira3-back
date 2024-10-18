'use strict';

const fs = require('fs'); // Módulo para manipulação de arquivos
const path = require('path'); // Módulo para manipulação de caminhos
const Sequelize = require('sequelize'); // Importa a biblioteca Sequelize
const process = require('process'); // Módulo para manipulação de variáveis de ambiente
const basename = path.basename(__filename); // Obtém o nome do arquivo atual
const env = process.env.NODE_ENV || 'development'; // Define o ambiente (development por padrão)
const config = require(__dirname + '/../config/config.json')[env]; // Carrega a configuração do banco de dados para o ambiente atual
const db = {}; // Objeto para armazenar os modelos

let sequelize;
if (config.use_env_variable) {
  // Se a configuração usa variável de ambiente, inicializa o Sequelize com ela
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Caso contrário, usa as configurações do JSON
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lê todos os arquivos de modelo no diretório atual
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignora arquivos que começam com ponto
      file !== basename && // Ignora o próprio arquivo de configuração
      file.slice(-3) === '.js' && // Considera apenas arquivos .js
      file.indexOf('.test.js') === -1 // Ignora arquivos de teste
    );
  })
  .forEach(file => {
    // Para cada arquivo válido, requer o modelo e o adiciona ao objeto db
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Armazena o modelo no objeto db
  });

// Associa os modelos, se houver uma função associate definida
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adiciona a instância do Sequelize e a biblioteca Sequelize ao objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporta o objeto db contendo os modelos e a instância do Sequelize
module.exports = db;
