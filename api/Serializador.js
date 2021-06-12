const jsontoxml = require("jsontoxml")
const ValorNaoSuportado = require("./erros/ValorNaoSuportado")

class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }

    xml (dados) {
        let tag = this.tagSingular

        if (Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({[tag]: dados})
    }

    serializar (dados) {
        dados = this.filtrar(dados)
        if(this.contentType === 'application/json') {
            return this.json(dados)
        }
        if(this.contentType === 'application/xml') {
            return this.xml(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    filtarObjeto(dados) {
        const novoObjeto = {}

        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar (dados) {
        if (Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filtarObjeto(item)
            })
        }else {
            dados = this.filtarObjeto(dados)
        }

        return dados
    }
}

class SerializadorFornecedor extends Serializador {
    constructor(contentType, camposExtras) {
       super ()
       this.contentType = contentType
       this.camposPublicos = [
           'id',
           'empresa',
           'categoria'
        ].concat(camposExtras || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fonecedores'
    }
}

class SerializadorErro extends Serializador {
    constructor (contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'mensagem'
        ].concat (camposExtras || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

class SerializadorProduto extends Serializador {
    constructor (contentType, camposExtras) {
        super ()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'titulo'
        ].concat (camposExtras || [])
        this.tagSingular = 'produto'
        this.tagPlural = 'produtos'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    SerializadorProduto: SerializadorProduto,
    formatosAceitos: ['application/json','application/xml']
}

