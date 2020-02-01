const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'TODOS'
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
  const task = request.body; 
  task.completed = false;
  connection.query(task, function (err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      task.id = data.insertid;
      response.status(201).json(task);
    }
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
  connection.query("DELETE FROM Task WHERE is=?", [id], function (err, data) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.sendStatus(200);
    }
  });
});

module.exports.todo = serverlessHttp(this.todo);

