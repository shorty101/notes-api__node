require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectId} = require("mongodb");

var {mongoose} = require("./db/mongoose");
var {User} = require("./models/user");
var {Note} = require("./models/note");

var app = express();
const port = process.env.PORT;

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

// GET /notes
app.get("/notes", (req, res) => {
    Note.find().then((notes) => {
        res.send({notes});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /notes/123
app.get("/notes/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Note.findById(id).then((note) => {
        if (!note) {
            return res.status(404).send();
        }
        res.status(200).send({note});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete("/notes/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Note.findByIdAndRemove(id).then((note) => {
        if (!note) {
            return res.status(404).send();
        }
        res.status(200).send({note});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.patch("/notes/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Note.findByIdAndUpdate(id, {$set: body}, {new: true}).then((note) => {
        if (!note) {
            return res.status(404).send();
        }
        res.send({note});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

module.exports = {app};