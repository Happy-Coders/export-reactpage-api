var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    MongoClient = require('mongodb').MongoClient;

var {Components} = require('./models/data')

var cors = require('cors')
require('dotenv').config()
console.log(process.env.DBUSERNAME)
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = require('bluebird');
var url = `mongodb://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@ds345028.mlab.com:45028/dnd-export`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) throw err;
    console.log("Database connected");
  });

app.get("/", (req, res) => {
    res.json("wlcm")
})

app.get("/get", (req, res) => {
    Components.find({}).populate().exec()
    .then(data => {
        // console.log(data[0].componentsArray)
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json(err)
    });
})

app.get('/add', async (req, res) => {
    var myobj = {
        componentsArray:[
            // { id: 1573551233636, top: 0, left: 0, type: "Navbar" },
            // { id: 1573551241882, top: 150, left: -475, type: "Piechart" },
            // { id: 1573551245343, top: 123, left: 792, type: "Card" },
            // { id: 1573551248120, top: 122, left: 1179, type: "Card" },
            { id: 1573551258573, top: 543, left: -16, type: "Areagraph" },
            { id: 1573551264280, top: 991, left: -86, type: "Timeline" },
            { id: 1573551274865, top: 1345, left: 407, type: "FacebookFrame" }
        ]
    };
    const newCompo = await new Components(myobj)
    newCompo.save((err, data) => {
        if (err) {
          res.status(500).json(err)
        }
        res.status(200).json(data)
      })
})

app.listen(8080, function () {
    console.log("Server has started at 8080");
});