const express = require("express");

const { sequelize } = require("./models/sequelize");

const { todosRouter } = require("./routes/todos.route");
const { userRouter } = require("./routes/users.route");

const app = express();
const port = 3000;

// this is caca
sequelize.sync({});

app.use(express.json());

// routes
app.use("/todos", todosRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
