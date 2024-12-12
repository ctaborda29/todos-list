const express = require("express");
const router = express.Router();

const { usersModel } = require("../models/users.model");
const { todosModel } = require("../models/todos.model");

router.get("/", async (req, res) => {
  const users = await usersModel.findAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const foundUser = await usersModel.findOne({
      where: { id },
      include: todosModel,
    });
    res.json(foundUser);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  const newUser = await usersModel.create({
    name,
    password,
  });
  res.status(201).json(newUser);
});

router.put("/:id", async (req, res) => {
  const { name, password, email } = req.body;
  const id = parseInt(req.params.id);
  const foundUser = await usersModel.findOne({
    where: { id },
    include: todosModel,
  });
  if (foundUser) {
    await usersModel.update({ name, password, email }, { where: { id } });
    const updateUser = await usersModel.findOne({ where: { id } });
    res.status(200).json(updateUser);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const foundUser = await usersModel.findOne({ where: { id } });
  if (foundUser) {
    const deleted = await usersModel.destroy({ where: { id } });
    console.log(`${deleted}: user deleted`);
    res.status(200).json(foundUser);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports.userRouter = router;
