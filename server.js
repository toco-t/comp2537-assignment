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
  saveUninitialized: true,
  // cookie: { secure: true}
}));

app.use("/html", express.static("./public/html"));
app.use("/css", express.static("./public/css"));
app.use("/js", express.static("./public/js"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Toco:31hPJ6x0MUeJvCaj@cluster0.f0pqe.mongodb.net/usersDB")

const userSchema = new mongoose.Schema({
  user_id: Number,
  username: String,
  email: String,
  password: String,
  cart: [Object],
  past_orders: [[Object]]
});

const User = mongoose.model("User", userSchema);

function authenticate(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/sign-in");
  }
}

app.listen(process.env.PORT || 5000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on Port 5000...");
  }
})

app.get("/", authenticate, (req, res) => {
  let doc = fs.readFileSync("./public/html/index.html", "utf8");
  res.send(doc);
})

app.get("/sign-in", (req, res) => {
  if (req.session.authenticated) {
    res.redirect("/");
  } else {
    let doc = fs.readFileSync("./public/html/sign-in.html", "utf8");
    res.send(doc);
  }
})

app.get("/search.html", authenticate, (req, res) => {
  let doc = fs.readFileSync("./public/html/search.html", "utf8");
  res.send(doc);
})

app.get("/pokemon.html", authenticate, (req, res) => {
  let doc = fs.readFileSync("./public/html/pokemon.html", "utf8");
  res.send(doc);
})

app.get("/account.html", authenticate, (req, res) => {
  let doc = fs.readFileSync("./public/html/account.html", "utf8");
  res.send(doc);
})

app.get("/checkout.html", authenticate, (req, res) => {
  let doc = fs.readFileSync("./public/html/checkout.html", "utf8");
  res.send(doc);
})

app.post("/register", (req, res) => {
  User.find({
    username: req.body.username,
    email: req.body.email
  }, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      if (users.length == 0) {
        User.create({
          user_id: Math.floor(Math.random() * 100000),
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          cart: [],
          past_orders: []
        }, (err, users) => {
          if (err) {
            console.log(err);
          } else {
            res.send("REGISTRATION SUCCESSFUL...");
          }
        })
      } else {
        res.send("THIS USER ALREADY EXISTS...")
      }
    }
  })
})

app.post("/in", (req, res) => {
  User.find({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }, (err, users) => {
    if (err) {
      console.log(err);
    } else if (users.length == 0) {
      res.send("NO USER FOUND");
    } else {
      req.session.user = users[0].username;
      req.session.user_id = users[0].user_id;
      req.session.authenticated = true;
      res.send("SIGN IN SUCCESSFUL...");
    }
  })
})

app.get("/account", (req, res) => {
  res.send({
    username: req.session.user,
    user_id: req.session.user_id
  });
})

app.post("/add", (req, res) => {
  User.findOneAndUpdate({
    user_id: req.session.user_id
  }, {
    $push: {
      cart: {
        pokemon_id: req.body.pokemon_id,
        quantity: req.body.quantity,
        price: req.body.price
      }
    }
  }, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.send("ADDED TO THE BAG");
    }
  })
})

app.get("/bag", (req, res) => {
  User.findOne({
    user_id: req.session.user_id
  }, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.send(users);
    }
  })
})


// const timelineSchema = new mongoose.Schema({
//   content: String,
//   hits: Number,
//   time: String,
// });
//
// const Timeline = mongoose.model("Timeline", timelineSchema);
//
//
// app.get("/timeline.html", authenticate, (req, res) => {
//   let doc = fs.readFileSync("./public/html/timeline.html", "utf8");
//   res.send(doc);
// })
//
//
// app.get("/timeline/events", (req, res) => {
//
//   Timeline.find({}, (err, timelines) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(timelines);
//     }
//   });
// })
//
// app.put("/timeline/insert", (req, res) => {
//   Timeline.create({
//     content: req.body.content,
//     time: req.body.time,
//     hits: req.body.hits
//   }, (err, timelines) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(timelines);
//     }
//   });
// })
//
// app.put("/timeline/update/:id", (req, res) => {
//   // console.log(req.params);
//   Timeline.updateOne({
//     _id: req.params.id
//   }, {
//     $inc: {"hits": 1}
//   }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(data);
//     }
//   });
// })
//
// app.put("/timeline/delete/:id", (req, res) => {
//   Timeline.deleteOne({
//     _id: req.params.id
//   }, (err, timelines) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(timelines);
//     }
//   });
// })
