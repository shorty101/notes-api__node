const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/NotesApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");

    // findOneAndUpdate
    db.collection("Users").findOneAndUpdate({
        name: "Jim"
    }, {
        $set: {
            name: "Bill"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    }, (err) => {
        console.log("Object could not be updated", err);
    });

    // deleteMany
    // db.collection("Notes").deleteMany({text: "Eat lunch"}).then((dels) => {
    //     console.log(dels);
    // }, (err) => {
    //     console.log("Could not delete");
    // });

    // deleteOne
    // db.collection("Notes").deleteOne({text: "Eat lunch"}).then((dels) => {
    //     console.log(dels);
    // }, (err) => {
    //     console.log("Could not delete");
    // });

    // findOneAndDelete
    // db.collection("Notes").findOneAndDelete({text: "Eat lunch"}).then((dels) => {
    //     console.log(dels);
    // }, (err) => {
    //     console.log("Could not delete");
    // });

    // find and count
    // notes = db.collection("Notes").find().count().then((count) => {
    //     console.log(`Notes count: ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch notes", err);
    // });

    // find with query and toArray
    // notes = db.collection("Users").find({name: "Andrew"}).toArray().then((docs) => {
    //     console.log(`Users`);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch notes", err);
    // });

    //find with _id
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