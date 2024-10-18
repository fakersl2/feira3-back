const database = require('../models'); // Importa o modelo do banco de dados

module.exports = class UsuarioController {
    static async cadastrar(req, res) {
        const { nome, senha } = req.body; // Extrai nome e senha do corpo da requisição
        console.log(nome, senha); // Loga o nome e a senha no console

        try {
            const usuario = await database.usuarios.findOne({
                where: {
                    nome: nome,
                    senha: senha // Verifica se já existe um usuário com o mesmo nome e senha
                }
            });

            if (!usuario) {
                const novoUsuario = await database.usuarios.create({
                    nome: nome,
                    senha: senha // Cria um novo usuário no banco de dados
                });
                res.status(200).json(novoUsuario); // Retorna o novo usuário com status 200
            }
        } catch (error) {
            res.status(400).json(error.message); // Retorna erro com status 400
        }
    }

    static async login(req, res) {
        const { cod } = req.body; // Extrai o código (senha) do corpo da requisição
        try {
            const verificado = await database.usuarios.findOne({
                where: {
                    senha: cod // Verifica se existe um usuário com a senha fornecida
                }
            });
            if (!verificado) {
                throw new Error("erro ao fazer login"); // Lança erro se a senha estiver incorreta
            }
            res.status(200).json(verificado.id); // Retorna o ID do usuário com status 200
        } catch (error) {
            res.status(400).json(error.message); // Retorna erro com status 400
        }
    }

    static async buscaTodos(req, res) {
        try {
            const usuarios = await database.usuarios.findAll(); // Busca todos os usuários

            res.status(200).json(usuarios); // Retorna os usuários com status 200
        } catch (error) {
            res.status(400).json(error.message); // Retorna erro com status 400
        }
    }

    static async buscaPorId(req, res) {
        const { id } = req.params; // Extrai o ID do usuário da URL
        try {
            const usuario = await database.usuarios.findByPk(id); // Busca o usuário pelo ID

            res.status(200).json(usuario); // Retorna o usuário com status 200
        } catch (error) {
            res.status(400).json(error.message); // Retorna erro com status 400
        }
    }
};
