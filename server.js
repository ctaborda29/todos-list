const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


let listToDo = [];

 fetch(`https://jsonplaceholder.typicode.com/todos`)
.then(response => response.json()).then(response =>{ listToDo = response});





app.get("/", (req, res) => {
  res.json(listToDo);
});

app.post("/", (req, res) => {
  const toDoBody = req.body;
  const newToDo = { id: ++listToDo.length,...toDoBody}
  listToDo.push(newToDo);
  res.status(201).json(newToDo);

});

app.put("/:id", (req, res) => {
    const newData = req.body;
   const id = Number(req.params.id);
   const element = listToDo.find(item => item.id === id);
   res.send(element);
})


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
