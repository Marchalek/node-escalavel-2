const roteador = require ('express').Router({ mergeParams: true})
const Produto = require('./Produto')
const Tabela = require('./TabelaProduto')

roteador.get('/', async (requisicao, resposta) => {
    const produtos = await Tabela.listar(requisicao.fornecedor.id)
    resposta.send(
        JSON.stringify(produtos)
    )
})

roteador.post('/', async (requisicao, resposta,proximo) => {
    try {
        const idFornecedor = requisicao.fornecedor.id
        const corpo = requisicao.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor})
        const produto = new Produto(dados)
        await produto.criar()
        resposta.status(201)
        resposta.send(produto)
    } catch (erro) {
        proximo(erro)
    }
   
})

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        fornecedor: requisicao.fornecedor.id
    }
    const produto = new Produto(dados)
    await produto.apagar()
    resposta.status(204)
    resposta.send("Porduto apagado")
})

module.exports = roteador