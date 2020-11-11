const Produto = require('../model/Produto')
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth')
const { route } = require('./usuario')

router.get("/", auth, async(req, res) => {
    try{
        const produtos = await Produto.find().sort({nome:1})
        res.json(produtos)
    } catch (e){
        res.send({error: `Erro ao obter os produtos: ${e.message}`})
    }
})

router.post("/", auth, 
[
    check("nome","Informe o nome do produto").not().isEmpty(),
    check("codigobarra","Código de barra deve possuir 13 caracteres")
    .isNumeric()
    .isLength({min:13, max:13}),
    check("preco","Informe um preço válido").isFloat({min:0})
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {nome, descricao, codigobarra, preco} = req.body
    try{
        let produto = new Produto({nome, descricao, codigobarra, preco})
        await produto.save()
        res.send(produto)
    } catch (err) {
        return res.status(500).json({
            errors: `Erro ao salvar o produto ${err.message}`
        })
    }
})

router.get("/:id", auth, async(req, res) => {
    Produto.findById(req.params.id)
    .then(produto => {
        res.send(produto)
    }).catch(err => {
        return res.status(500).send({
            message: `Erro ao obter o produto com o id: ${req.params.id}`
        })
    })
})

router.delete("/:id", auth, async(req, res) =>{
    await Produto.findByIdAndRemove(req.params.id)
    .then(produto => {
        res.send({message: "Produto removido com sucesso"})
    }).catch(err => {
        return res.status(500).send({
            message: `Não foi possível excluir o produto com o id: ${req.params.id}`
        })
    })
})

module.exports = router