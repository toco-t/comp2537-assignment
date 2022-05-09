const express = require('express');
const app = express();
const fs = require("fs");

app.use("/html", express.static("./public/html"));
app.use("/css", express.static("./public/css"));
app.use("/js", express.static("./public/js"));

app.listen(process.env.PORT || 5000, function(err){
  if (err) {
    console.log(err);
  }
})

app.get("/", (req, res) => {
  let doc = fs.readFileSync("./public/html/index.html", "utf8");
  res.send(doc);
})

app.get("/search.html", (req, res) => {
  let doc = fs.readFileSync("./public/html/search.html", "utf8");
  res.send(doc);
})

app.get("/pokemon.html", (req, res) => {
  let doc = fs.readFileSync("./public/html/pokemon.html", "utf8");
  res.send(doc);
})
