// Importa as rotas dos módulos de usuário e projeto
const usuario = require('./usuarioRoute.js');
const projeto = require('./projetoRoute.js');

// Exporta uma função que recebe o aplicativo como parâmetro
module.exports = app => {
    // Configura o aplicativo para usar as rotas de usuário e projeto
    app.use(
        usuario, // Rotas relacionadas a usuários
        projeto  // Rotas relacionadas a projetos
    );
};
