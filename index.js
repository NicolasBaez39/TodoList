const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
let todos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/todo/add", (req, res) => {

   const todo = req.body.todo;

   todo.id = "" + new Date().getTime();

   todos.push(todo);

   res.json({result: "Ok"});

});

app.get("/todo", (req, res) => {

   res.json({todos: todos});

});

app.put("/todo/complete", (req, res) => {

   const todo = req.body;

   try {

      todos = todos.map((element) => {

         if (element.id === todo.id) {

            element.completed = true;

         }

         return element;

      })

   } catch (e) {

      console.log(e);

   }

   res.json({result: "Ok"});

});

app.delete("/todo/:id", (req, res) => {

   todos = todos.filter((element) => element.id !== req.params.id);

   res.json({result: "Ok"});  

})

server.listen(80, () => {
  console.log("- server running");
});