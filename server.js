const express = require('express');
const app = express();

app.use(express.static("./public"));

app.listen(5000, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("working!");
  }
})
