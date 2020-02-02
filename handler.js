const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'TODOS'
});

//GET//tasks
app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM tasks", function (err, data) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        tasks: data
      });
    }
  });
});

//POST//tasks
app.post("/tasks", function (request, response) {
  const newTasks = request.body;
  connection.query("INSERT INTO tasks SET ?", [newTasks], function (err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      newTasks.id = data.insertId;
      response.status(201).json(newTasks);
    }
  });
});

//PUT//tasks
app.put("/tasks/:id", function (request, response) {
  const updatedTasks = request.body;
  const id = request.params.id;
  connection.query('UPDATE Tasks SET ? WHERE id= ?' , [updatedTasks, id],
    function (err) {
      if (err) {
        response.status(500).json({ error: err });
      } else {
        response.sendStatus(200);
      }
    });
});


//DELETE//
app.delete("/tasks/:id", function (request, response) {
  const id2 = request.params.id;
  connection.query("DELETE FROM Task WHERE id=?", [id2], function (err) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.sendStatus(200);
    }
  });
});

module.exports.todo = serverlessHttp(this.app);

