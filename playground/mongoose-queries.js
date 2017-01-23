const {ObjectId} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Note} = require("./../server/models/note");
const {User} = require("./../server/models/user");

var userId = "58847fa8b612cd27382a316b";
var noteId = "5884a7832a08752a88293021";
if (!ObjectId.isValid(userId)) {
    console.log("User Id is not valid");
}
if (!ObjectId.isValid(noteId)) {
    console.log("Note Id is not valid");
}

User.findById(userId).then((user) => {
    if (!user) {
        return console.log("User ID not found");
    }
    console.log("User with ID", user);
}, (e) => {
    console.log(e);
});

// find
Note.find({
    _id: noteId
}).then((notes) => {
    console.log("Notes", notes);
});

// findOne
Note.findOne({
    _id: noteId
}).then((note) => {
    if (!note) {
        return console.log("No note matches query");
    }
    console.log("Note", note);
});

// findById
Note.findById(noteId).then((note) => {
    if (!note) {
        return console.log("Id not found");
    }
    console.log("Note by Id", note);
}).catch((e) => console.log(e));