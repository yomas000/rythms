var express = require('express');
var router = express.Router();
var fs = require("fs");
util = require('util');
var url = require("url");


router.get('/', function(req, res, next){
    var db = req.con;
    var path = url.parse(req.url)
    var name = path.query.replace("songId=", "").replace("=", "").replace("%20", " "); //TODO: Sanatize Inputs
    var music = "";

    var query = "SELECT * FROM indexMusic";

    // music = `C:/Users/thoma/Music/${name}.mp3`;

    db.query(query, function(err, rows){
      for (let i = 0; i < rows.length; i++){
        // console.log(rows[i].songName.toLowerCase() + " : " + name.toLowerCase())
        if (rows[i].songName.toLowerCase() == name.toLowerCase()){
          music = rows[i].filepath;
        }  
      }

      // console.log("Music: " + music)

    var stat = fs.statSync(music);

    range = req.headers.range;
    var readStream;
    // if there is no request about range
    if (range !== undefined) {
      // remove 'bytes=' and split the string by '-'
      var parts = range.replace(/bytes=/, "").split("-");
  
      var partial_start = parts[0];
      var partial_end = parts[1];
  
      if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
        return res.sendStatus(500);
      }
      // convert string to integer (start)
      var start = parseInt(partial_start, 10);
      // convert string to integer (end)
      // if partial_end doesn't exist, end equals whole file size - 1
      var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
      // content length
      var content_length = (end - start) + 1;
  
      res.status(206).header({
        'Content-Type': 'audio/mpeg',
        'Content-Length': content_length,
        'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
      });
  
      // Read the stream of starting & ending part
      readStream = fs.createReadStream(music, { start: start, end: end });
    } else {
      res.header({
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
      });
      readStream = fs.createReadStream(music);
    }
    readStream.pipe(res);;

    }) 

  });
  
  module.exports = router;