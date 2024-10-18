const database = require("../models"); // Importa o modelo do banco de dados
const { Op } = require('sequelize'); // Importa operadores do Sequelize para consultas

module.exports = class ProjetoController {
  static async buscaTodos(req, res) {
    try {
      const projetos = await database.projetos.findAll(); // Busca todos os projetos
      res.status(200).json(projetos); // Retorna os projetos com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async criaProjeto(req, res) {
    const { nome, descricao, categoria, turma } = req.body; // Extrai dados do corpo da requisição

    try {
      // PROCURA PROJETO
      const existe = await database.projetos.findOne({
        where: {
          turma_id: turma,
          categoria_id: categoria // Verifica se já existe um projeto com a mesma turma e categoria
        },
      });
      if (existe) {
        throw new Error("projeto ja existe"); // Lança erro se o projeto já existe
      }

      // PROCURA CATEGORIA
      const procuraCategoria = await database.categorias.findOne({
        where: {
          id: categoria, // Verifica se a categoria existe
        },
      });
      if (!procuraCategoria) {
        throw new Error("Nao foi possivel encontrar categoria"); // Lança erro se a categoria não for encontrada
      }

      // PROCURA TURMA
      const procuraTurma = await database.turmas.findOne({
        where: {
          id: turma, // Verifica se a turma existe
        },
      });
      if (!procuraTurma) {
        throw new Error("Nao foi possivel encontrar turma"); // Lança erro se a turma não for encontrada
      }

      // CRIA PROJETO
      const projeto = await database.projetos.create({
        nome: nome,
        descricao: descricao,
        turma_id: turma,
        categoria_id: categoria // Cria um novo projeto no banco de dados
      });

      // CRIA RELAÇÃO
      const criaRelacao = await database.projetosXcategorias.create({
        projeto_id: projeto.id,
        categoria_id: procuraCategoria.id, // Estabelece relação entre projeto e categoria
      });
      const criaRelacao2 = await database.projetosXturmas.create({
        projeto_id: projeto.id,
        turma_id: procuraTurma.id, // Estabelece relação entre projeto e turma
      });

      res.status(200).json({ projeto, criaRelacao, criaRelacao2 }); // Retorna o projeto e relações com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async criaCategoria(req, res) {
    const { nome } = req.body; // Extrai o nome da categoria do corpo da requisição
    try {
      const existe = await database.categorias.findOne({
        where: {
          nome: nome, // Verifica se a categoria já existe
        },
      });

      if (!existe) {
        const categoria = await database.categorias.create({
          nome: nome, // Cria a nova categoria
        });
        res.status(200).json(categoria); // Retorna a nova categoria com status 200
      }
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async criaTurma(req, res) {
    const { nome } = req.body; // Extrai o nome da turma do corpo da requisição
    try {
      const existe = await database.turmas.findOne({
        where: {
          nome: nome, // Verifica se a turma já existe
        },
      });

      if (!existe) {
        const turma = await database.turmas.create({
          nome: nome, // Cria a nova turma
        });
        res.status(200).json(turma); // Retorna a nova turma com status 200
      }
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async votar(req, res) {
    const { projeto_id } = req.params; // Extrai o ID do projeto da URL
    const { codigo, comentario, nota, usuario_id } = req.body; // Extrai os dados do corpo da requisição
    try {
      const jaVotou = await database.avaliacoes.findOne({
        where: {
          codigo: codigo,
          projeto_id: projeto_id, // Verifica se o usuário já votou no projeto
        },
      });

      if (jaVotou) {
        throw new Error("Usuario ja votou"); // Lança erro se o usuário já votou
      }

      const projetoId = parseInt(projeto_id, 10); // Converte o ID do projeto para inteiro

      const novoVoto = await database.avaliacoes.create({
        codigo: codigo,
        comentario: comentario,
        nota: nota,
        projeto_id: projetoId,
        usuario_id: usuario_id // Cria um novo voto no banco de dados
      });

      res.status(200).json(novoVoto); // Retorna o novo voto com status 200
    } catch (error) {
      console.log(error.message); // Loga o erro no console
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async buscaProjetoPorId(req, res) {
    const { id } = req.params; // Extrai o ID do projeto da URL

    try {
      const projeto = await database.projetos.findByPk(id); // Busca o projeto pelo ID

      res.status(200).json(projeto); // Retorna o projeto com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async procuraPorNome(req, res) {
    const { nome } = req.params; // Extrai o nome da URL
    try {
      const regex = new RegExp(nome, "i"); // Cria uma expressão regular para busca insensível a maiúsculas
      const projeto = await database.projetos.findAll({
        where: {
          nome: {
            [Op.like]: `%${regex.source}%`, // Usa o operador like para buscar projetos que tenham o nome semelhante
          },
        },
      });

      if (!projeto) {
        throw new Error('Nao foi possivel encontrar um projeto com esse nome'); // Lança erro se não encontrar projeto
      }

      res.status(200).json(projeto); // Retorna os projetos encontrados com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async procuraCategoriaPorId(req, res) {
    const { id } = req.params; // Extrai o ID da categoria da URL
    try {
      const categoria = await database.categorias.findByPk(id); // Busca a categoria pelo ID

      res.status(200).json(categoria); // Retorna a categoria com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async procuraTurmaPorId(req, res) {
    const { id } = req.params; // Extrai o ID da turma da URL
    try {
      const turma = await database.turmas.findByPk(id); // Busca a turma pelo ID

      res.status(200).json(turma); // Retorna a turma com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async pegaTodasCategorias(req, res) {
    try {
      const categorias = await database.categorias.findAll(); // Busca todas as categorias

      res.status(200).json(categorias); // Retorna as categorias com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async pegaTodasTurmas(req, res) {
    try {
      const turmas = await database.turmas.findAll(); // Busca todas as turmas

      res.status(200).json(turmas); // Retorna as turmas com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async filtrarCategoriaPorId(req, res) {
    const { id } = req.params; // Extrai o ID da categoria da URL
    try {
      const filtro = await database.projetos.findAll({
        where: {
          categoria_id: id // Filtra projetos pela categoria
        }
      });

      res.status(200).json(filtro); // Retorna os projetos filtrados com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async filtrarTurmaPorId(req, res) {
    const { id } = req.params; // Extrai o ID da turma da URL
    try {
      const filtro = await database.projetos.findAll({
        where: {
          turma_id: id // Filtra projetos pela turma
        }
      });

      res.status(200).json(filtro); // Retorna os projetos filtrados com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400
    }
  }

  static async procurarVotosPorId(req, res) {
    const { id } = req.params; // Extrai o ID do projeto da URL

    try {
      const avaliacao = await database.avaliacoes.findAll({
        where: {
          projeto_id: id // Busca todas as avaliações do projeto
        }
      });
      res.status(200).json(avaliacao); // Retorna as avaliações com status 200
    } catch (error) {
      res.status(400).json(error.message); // Retorna erro com status 400      
    }
  }
};
