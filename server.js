const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  let db = JSON.parse(fs.readFileSync("db/db.json"));
  return res.json(db);
});

app.post("/api/notes", function (req, res) {
  let db = JSON.parse(fs.readFileSync("db/db.json"));
  let newNote = req.body;
  db.push(newNote);
  console.log(req.body);
  fs.writeFileSync("db/db.json", JSON.stringify(db));
  res.json(db);
});

app.delete("/api/notes/:id", function (req, res) {
    const { id } = req.params;
  let db = JSON.parse(fs.readFileSync("db/db.json"));
  const dbNew = db.filter((element)=> (element.id !== id)
  )
  fs.writeFileSync("db/db.json", JSON.stringify(dbNew));
  
  return res.json(dbNew);
});

app.listen(port, function () {
  console.log(`Application server is listening on port: ${port}`);
});
