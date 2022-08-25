var express = require('express');
var router = express.Router();
var fs = require("fs")
util = require('util');
var ip = require("ip");

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.con;
  var songs = []

  db.query("SELECT * FROM indexMusic", function(err, rows){

    for (let i = 0; i < rows.length; i++){
      song = {
        songName: rows[i].songName,
        url: "http://" + ip.address() + "/audio?=" + rows[i].songName
      }
      songs.push(song);
    }

    res.render('index', { title: "rhythms", searchIcon: "../public/images/search.png", settingsIcon: "../public/images/settings.png", playlistIcon: "../public/images/playlist.png", songName: songs });
  })

});


module.exports = router;