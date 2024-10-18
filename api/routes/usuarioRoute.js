const { Router } = require('express'); // Importa o Router do Express
const usuarioController = require('../controllers/usuarioController.js'); // Importa o controlador de usuários

const router = Router(); // Cria uma instância do router

// Define as rotas relacionadas a usuários
router 
    .get('/usuarios', usuarioController.buscaTodos) // Busca todos os usuários
    .get('/usuarios/:id', usuarioController.buscaPorId) // Busca um usuário pelo ID
    .post('/usuarios', usuarioController.cadastrar) // Cadastra um novo usuário
    .post('/usuarios/login', usuarioController.login); // Realiza o login de um usuário

module.exports = router; // Exporta o router
