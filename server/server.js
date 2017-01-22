var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {User} = require("./models/user");
var {Note} = require("./models/note");

var app = express();

app.use(bodyParser.json());

app.post("/notes", (req, res) => {
    console.log(req.body);
    var note = new Note({
        text: req.body.text
    });
    note.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123

app.listen(3000, () => {
    console.log("Started on port 3000");
});

// var newUser = new User({
//     email: "test@testmail.com"
// });

// newUser.save().then((doc) => {
//     console.log("Saved user", doc);
// }, (e) => {
//     console.log("Unable to save user", e);
// });

// var newNote = new Note({
//     text: "Cook Dinner",
//     completed: false
// });

// newNote.save().then((doc) => {
//     console.log("Saved note", doc);
// }, (e) => {
//     console.log("Unable to save note", e);
// });