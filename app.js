//jshint esversion:6

//requiring two packages we just installed
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


//app constant
const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

//get route when someone accesses the home route
app.get("/", function(req, res) {

let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});


app.post("/", function(req, res) {
  let item = req.body.newItem

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});



//app listening on port 3000, and it returns the console.log
app.listen(3000, function() {
  console.log("server started on port 3000");
});
