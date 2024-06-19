const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
    async cadastrar(informacoes) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: informacoes.email
            }
        })

        if (usuario) {
            throw new Error('Usuário já cadastrado');
        }

        try {
            const senhaHash = await hash(informacoes.senha, 8);

            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: informacoes.nome,
                email: informacoes.email,
                senha: senhaHash
            })

            return novoUsuario;
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário');
        }
    }
}

module.exports = UsuarioService;