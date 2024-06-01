const Tarefa = require('../models/Tarefa')

async function create(req, res) {
    const tarefa = new Tarefa(req.body)
    const tarefaCriada = await tarefa.save()
    res.status(201).json(tarefaCriada)
}

async function getAll(req, res) {
    res.json(await Tarefa.find().populate(['funcionario', 'projeto']))
}

async function getById(req, res) {
    const tarefa = await Tarefa.findById(req.params.id).populate(['funcionario', 'projeto'])
    if (tarefa) {
        res.json(tarefa)
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" })
    }
}

async function update(req, res) {
    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (tarefaAtualizada) {
        res.json(tarefaAtualizada)
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" })
    }
}

async function remove(req, res) {
    const tarefaExcluida = await Tarefa.findByIdAndDelete(req.params.id)
    if (tarefaExcluida) {
        res.json({
            mensagem: "Tarefa excluida com sucesso!",
            tarefaExcluida
        })
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" })
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}
