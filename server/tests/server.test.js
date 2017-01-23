const expect = require("expect");
const request = require("supertest");
const {ObjectId} = require("mongodb");

var {app} = require("./../server");
var {Note} = require("./../models/note");

const notes = [
    {
        _id: new ObjectId(),
        text: "First text todo"
    }, {
        _id: new ObjectId(),
        text: "Second text todo"
    }
];

beforeEach((done) => {
    Note.remove({}).then(() => {
        Note.insertMany(notes);
    }).then(() => done());
});

describe("POST /Notes", () => {
    it("Should create a new note", (done) => {
        var text = "Test note text";

        request(app)
            .post("/notes")
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Note.find({text}).then((notes) => {
                    expect(notes.length).toBe(1);
                    expect(notes[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it("Should not create a todo with invalid body data", (done) => {
        request(app)
            .post("/notes")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Note.find().then((notes) => {
                    expect(notes.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe("GET /notes", () => {
    it("Should get all notes", (done) => {
        request(app)
            .get("/notes")
            .expect(200)
            .expect((res) => {
                expect(res.body.notes.length).toBe(2);
            })
            .end(done);
    });
});

describe("GET /notes/:id", () => {
    it("Should get a note by Id", (done) => {
        request(app)
            .get(`/notes/${notes[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.note.text).toBe(notes[0].text);
            })
            .end(done);
    });

    it("Should return a 404 if note not found", (done) => {
        request(app)
            .get(`/notes/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done);
    });
    it("Should return a 404 if bad ObjectId sent", (done) => {
        request(app)
            .get("/notes/123")
            .expect(404)
            .end(done);
    });
});

describe("DELETE /notes/:id", () => {
    it("Should remove a note", (done) => {
        var hexId = notes[1]._id.toHexString();

        request(app)
            .delete(`/notes/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.note._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Note.findById(hexId).then((note) => {
                    expect(note).toNotExist();
                    return done();
                }).catch((e) => done(e));
            });
    });

    it("Should return a 404 if no note is deleted", (done) => {
        request(app)
            .delete(`/notes/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it("Should return a 404 if ObjectId is invalid", (done) => {
        request(app)
            .delete(`/notes/1234`)
            .expect(404)
            .end(done);
    });
});