const express = require('express');
const app = express();
const session = require("express-session")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");

app.use(session({
  secret: "748748",
  name: "Session",
  resave: true,
  saveUninitialized: true
}));

app.use("/html", express.static("./public/html"));
app.use("/css", express.static("./public/css"));
app.use("/js", express.static("./public/js"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Toco:31hPJ6x0MUeJvCaj@cluster0.f0pqe.mongodb.net/timelineDB")

const timelineSchema = new mongoose.Schema({
  content: String,
  hits: Number,
  time: String,
});

const Timeline = mongoose.model("Timeline", timelineSchema);

const userSchema = new mongoose.Schema({
  user_id: Number,
  username: String,
  password: String,
  cart: [Object],
  past_orders: [[Object]]
});

const User = mongoose.model("User", timelineSchema);

app.listen(process.env.PORT || 5000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on Port 5000...");
  }
})

app.get("/", (req, res) => {
  let doc = fs.readFileSync("./public/html/index.html", "utf8");
  res.send(doc);
})

app.get("/sign-in", (req, res) => {
  let doc = fs.readFileSync("./public/html/sign-in.html", "utf8");
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

app.get("/timeline.html", (req, res) => {
  let doc = fs.readFileSync("./public/html/timeline.html", "utf8");
  res.send(doc);
})

app.get("/timeline/events", (req, res) => {

  Timeline.find({}, (err, timelines) => {
    if (err) {
      console.log(err);
    } else {
      res.send(timelines);
    }
  });
})

app.put("/timeline/insert", (req, res) => {
  Timeline.create({
    content: req.body.content,
    time: req.body.time,
    hits: req.body.hits
  }, (err, timelines) => {
    if (err) {
      console.log(err);
    } else {
      res.send(timelines);
    }
  });
})

app.put("/timeline/update/:id", (req, res) => {
  // console.log(req.params);
  Timeline.updateOne({
    _id: req.params.id
  }, {
    $inc: {"hits": 1}
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
})

app.put("/timeline/delete/:id", (req, res) => {
  Timeline.deleteOne({
    _id: req.params.id
  }, (err, timelines) => {
    if (err) {
      console.log(err);
    } else {
      res.send(timelines);
    }
  });
})
