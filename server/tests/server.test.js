const expect = require("expect");
const request = require("supertest");

var {app} = require("./../server");
var {Note} = require("./../models/note");

const notes = [
    {
        text: "First text todo"
    }, {
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
})