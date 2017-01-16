const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/NotesApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    // notes = db.collection("Notes").find().count().then((count) => {
    //     console.log(`Notes count: ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch notes", err);
    // });

    notes = db.collection("Users").find({name: "Andrew"}).toArray().then((docs) => {
        console.log(`Users`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch notes", err);
    });

    // notes = db.collection("Notes").find({
    //     _id: new ObjectID("587c39e101e12e25800a8901")
    // }).toArray().then((docs) => {
    //     console.log("Notes");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch notes", err);
    // });

    // db.close();
});