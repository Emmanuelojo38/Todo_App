// Setup to be able to use API, handle database and setup cors 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());    // allows us to use content type .json
app.use(cors());    // to use cors

// to connect to database
mongoose.connect("mongodb://localhost:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connected to DB"))
    .catch(console.error);

const Todo = require("./models/Todo");  //import models  from Todo.js

// To call API and get the Todo list from the server
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);    // to display results
});

// To add a new Todo
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();    //to save new Todo to Todo collection

    res.json(todo);
});

// To delete a Todo
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

// To complete a todo
app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.listen(3001, () => console.log("Server started on port 3001"));