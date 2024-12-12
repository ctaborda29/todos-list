const express = require("express");
const router = express.Router();

const { todosModel } = require("../models/todos.model");

router.get("/", async (req, res) => {
    const todos = await todosModel.findAll();
    res.json(todos);
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const foundTodo = await todosModel.findOne({ where: { id } });
        res.json(foundTodo);
    } catch (err) {
        console.error(err);
    }
});

router.post("/", async (req, res) => {
    const { title, completed } = req.body;
    const newTodo = await todosModel.create({
        title,
        completed,
    });
    res.status(201).json(newTodo);
});

router.put("/:id", async (req, res) => {
    const { title, completed } = req.body;
    const id = parseInt(req.params.id);
    const foundTodo = await todosModel.findOne({ where: { id } });
    if (foundTodo) {
        await todosModel.update({ title, completed }, { where: { id } });
        res.status(200).json(foundTodo);
    } else {
        res.status(404).json({ message: "todo not found" });
    }
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const foundTodo = await todosModel.findOne({ where: { id } });
    if (foundTodo) {
        const deleted = await todosModel.destroy({ where: { id } });
        console.log(`${deleted}: todos deleted`);
        res.status(200).json(foundTodo);
    } else {
        res.status(404).json({ message: "todo not found" });
    }
});

module.exports.todosRouter = router;
