const {ObjectId} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Note} = require("./../server/models/note");
const {User} = require("./../server/models/user");

// // Remove all
// Note.remove({}).then((result) => {
//     console.log(result);
// });

// // findOneAndRemove
// Note.findOneAndRemove({}).then((note) => {
//     console.log(note);
// });

// findByIdAndRemove
Note.findByIdAndRemove("58855c7c15b6cd18d4678b7a").then((note) => {
    console.log(note);
});