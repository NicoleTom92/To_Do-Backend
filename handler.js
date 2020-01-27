const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/todo", function(_request, response) {

  response.status(200).json({
    todo: [
      {
        name: "Task 1",
        completed: false,
        available: true,
        dateCompleted: "2020-01-09",
        id: 1
      },
      {
        name: "Task 2",
        completed: false,
        available: true,
        dateCompleted: "2020-02-01",
        id: 2
      },
      {
        name: "Task 3",
        completed: false,
        available: false,
        dateCompleted: "2020-02-17",
        id: 3
      },
    ]
  });
});

app.put("/todo/:id", function(request, response) {
 
  const updatedtodo = request.body;
  const id = request.params.id;

  response.status(200).json({
    message: `Successfully updated Task ID ${id} with name: ${updatedtodo.name}, completed: ${updatedtodo.completed}, available: ${updatedtodo.available}`
  });
});

module.exports.app = serverlessHttp(app);