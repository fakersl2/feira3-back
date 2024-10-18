const { Router } = require('express'); // Importa o Router do Express
const projetoController = require('../controllers/projetoController.js'); // Importa o controlador de projetos

const router = Router(); // Cria uma instância do router

// Define as rotas relacionadas a projetos, categorias, turmas e votos
router 
    .get('/projetos', projetoController.buscaTodos) // Busca todos os projetos
    .get('/projetos/:id', projetoController.buscaProjetoPorId) // Busca um projeto pelo ID
    .get('/projetos/nome/:nome', projetoController.procuraPorNome) // Busca projetos pelo nome
    .get('/categorias/', projetoController.pegaTodasCategorias) // Busca todas as categorias
    .get('/categorias/:id', projetoController.procuraCategoriaPorId) // Busca uma categoria pelo ID
    .get('/categorias/filtro/:id', projetoController.filtrarCategoriaPorId) // Filtra projetos por categoria
    .get('/turmas/', projetoController.pegaTodasTurmas) // Busca todas as turmas
    .get('/turmas/:id', projetoController.procuraTurmaPorId) // Busca uma turma pelo ID
    .get('/turmas/filtro/:id', projetoController.filtrarTurmaPorId) // Filtra projetos por turma
    .get('/votos/:id', projetoController.procurarVotosPorId) // Busca votos de um projeto pelo ID
    .post('/projetos', projetoController.criaProjeto) // Cria um novo projeto
    .post('/categorias', projetoController.criaCategoria) // Cria uma nova categoria
    .post('/turmas', projetoController.criaTurma) // Cria uma nova turma
    .post('/votos/:projeto_id', projetoController.votar); // Registra um voto em um projeto

module.exports = router; // Exporta o router
