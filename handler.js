const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todo"
})

const app = express();
app.use(cors());
app.use(bodyParser.json());

//GET//
app.get("/todo", function (request, response) {
  connection.query("SELECT * FROM Task", function (err, data) {
    if (err) {
      response.status(500).json({ error: err });
    } else {
      response.status(200).json(data)
    }
  });
});

//POST//
app.post("/todo", function (request, response) {
  const text = request.body;
  const date = request.body;
  response.status(200).json({
    message: `Received a request to add task ${text} with date ${date}`
  });
});

//PUT//
app.put("/todo/:id", function (request, response) {
  const updatedtodo = request.body;
  const id = request.params.id;

  connection.query(
    [updatedtodo, id],
    function (err) {
      if (err) {
        response.status(500).json({ error: err });
      } else {
        response.sendStatus(200);
      }
    }
  );
});


//DELETE//
app.delete("/todo/:id", function (request, response) {
  const id = request.params.id;
  response.status(200).json({
    message: `Successfully deleted the task with ID ${id}.`
  })
});

module.exports.todo = serverlessHttp(this.todo);

