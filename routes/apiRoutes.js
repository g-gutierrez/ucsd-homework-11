/*  FROM THE REQUIREMENTS 

GET /api/notes - Should read the db.json file and return all saved notes as JSON.

POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

*/



// ===============================================================================
// LOAD DATA
// ===============================================================================

var db = require("../data/db.json");
var fs = require("fs");
var util = require("util");
var {v4 : uuidv4} = require("uuid");

var readAsync = util.promisify(fs.readFile);
var writeAsync = util.promisify(fs.writeFile);



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", async function(req, res) {
    fs.readFile("./data/db.json", "utf8", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    })
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {

    let noteId = uuidv4();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./data/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const allNotes = JSON.parse(data);

      allNotes.push(newNote);

      fs.writeFile("./data/db.json", JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note created!")
      });
    });
  });

  // API DELETE Requests
  // ---------------------------------------------------------------------------

  app.delete("/api/notes/:id", function(req, res) {
    let noteId = req.params.id;
    fs.readFile("./data/db.json", (err, data) => {
      if (err) throw err;
      var allNotes = JSON.parse(data);
      var newAllNotes = allNotes.filter(note => note.id != noteId);
      fs.writeFile("./data/db.json", JSON.stringify(newAllNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
      });
    });
  });
};

