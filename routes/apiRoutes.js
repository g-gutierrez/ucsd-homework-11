/*

GET /api/notes - Should read the db.json file and return all saved notes as JSON.

POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

*/



// ===============================================================================
// LOAD DATA
// ===============================================================================

var db = require("../db/db.json");
var fs = require("fs");
var uuid = require("uiid/v4");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(db);
  });



  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    let noteId = uuid();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw
    });
  });

  // API DELETE Requests
  // ---------------------------------------------------------------------------

  app.delete("/api/notes/:id", function(req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};

