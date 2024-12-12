const express = require("express");
const { sequelize } = require("./sequelize");

const app = express();
const port = 3000;

app.use(express.json());

async function fullBD() {
  fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then(response => response.json())
    .then(response =>{
      response.forEach(async element => {
        const { title, completed, id } = element;
        const foundTodo  = await sequelize.findOne({ where: { id } });
        if(foundTodo ){
        await sequelize.create({
          title,
          completed,
        });
      }
    });
    })};

app.get("/fullBD", async (req, res) => {
  const todos = await sequelize.findAll();
  if (todos.length < 200) {
    fullBD();
  }
})

app.get("/", async (req, res) => {
  const todos = await sequelize.findAll();
  res.json(todos);
});


app.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    const foundTodo  = await sequelize.findOne({ where: { id } });
    res.json(foundTodo );
  }
  catch(err){
    console.error(err)
  }
});

app.post("/", async (req, res) => {
  const { title, completed } = req.body;
  const newTodo = await sequelize.create({
    title,
    completed,
  });
  res.status(201).json(newTodo);
});

app.put('/:id', async (req, res) => {
  const { title, completed } = req.body;
  const id = parseInt(req.params.id);
    const foundTodo  = await sequelize.findOne({ where: { id } });
    if (foundTodo ){
      await sequelize.update({ title, completed }, {where: { id },});
      res.status(200).json(foundTodo );
      }
else{
  res.status(404).json({ message: "todo not found" });
}
});

app.delete("/:id", async (req,res)=>{
  const id = Number(req.params.id);
    const foundTodo  = await sequelize.findOne({ where: { id } });
    if (foundTodo ){
      const deleted = await sequelize.destroy({ where: { id },});
      console.log(`${deleted}: todos deleted`)
      res.status(200).json(foundTodo );
      }
else{
  res.status(404).json({ message: "todo not found" });
}
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
