const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let listToDo = [];
 function fullList() {
 fetch(`https://jsonplaceholder.typicode.com/todos`)
.then(response => response.json()).then(response =>{ listToDo = response});
}

app.get("/", (req, res) => {
  res.json(listToDo);
});

app.get("/full", async (req, res) => {
  if (listToDo.length <= 100){
  fullList();
  res.json(listToDo);
}
  else
  res.status(200).send("fully!!");
});

app.get("/:id", (req, res) => {
  const toDoBody = req.body;
  const id = Number(req.params.id);
  const element = listToDo.find((item) => item.id === id);
  res.status(201).json(element);
});

app.post("/", (req, res) => {
  const toDoBody = req.body;
  const newToDo = { id: ++listToDo.length, ...toDoBody };
  listToDo.push(newToDo);
  res.status(201).json(newToDo);
});

app.put("/:id", (req, res) => {
  const newData = req.body;
  const id = Number(req.params.id);
  const element = listToDo.find((item) => item.id === id);
  res.send(element);
});

app.delete("/:id", (req, res) => {
  const newData = req.body;
  const id = Number(req.params.id);
  const index = listToDo.findIndex((item) => item.id === id);

  if (index === -1) res.status(404).send("not found");
  else res.json(listToDo.splice(index, 1));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
