var express = require('express');
var router = express.Router();
var fs = require("fs")
util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.con;
  var songs = []

  db.query("SELECT * FROM indexMusic", function(err, rows){

    for (let i = 0; i < rows.length; i++){
      songs.push(rows[i].songName);
    }

    res.render('index', { title: "rhythms", searchIcon: "../public/images/search.png", settingsIcon: "../public/images/settings.png", songName: songs });
  })

});


module.exports = router;