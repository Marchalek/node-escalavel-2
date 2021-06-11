const Modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
]

async function criarTabelas () {
    for (let contador = 0; contador < Modelos.length; contador ++) {
        const modelo = Modelos[contador]
        await modelo.sync()
    }
}

criarTabelas()