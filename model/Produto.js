const mongoose = require('mongoose')

const ProdutoSchema = mongoose.Schema({
    nome: {
        type: String,  
        required: true
    },
    descricao: {
        type: String,  
        required: false
    },
    codigobarra: {
        type: String,
        required: true
    },
    preco: {
        type: Number,   
        required: true
    }
    }, {
        timestamps: true
    })

    module.exports = mongoose.model('Produtos',ProdutoSchema)