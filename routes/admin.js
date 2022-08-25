var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");

router.get('/', function (req, res, next) {
    var db = req.con;
    var query = "SELECT * FROM indexMusic";

    db.query(query, function(err, rows){
        var userlist = new Array;
       for (let i = 0; i < rows.length; i++){
        let user = {
            songName: rows[i].songName,
            filepath: rows[i].filepath,
            };
            userlist.push(user)
        }
        console.log(userlist)
        res.render("crud", { title: "rhythms", users: userlist });
    })
});


router.post('/upload', function(req, res, next){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
        var songName = fields.songName;
        var oldpath = files.filetoupload.filepath;
        var newpath = 'C:/Users/thomas/Music/' + files.filetoupload.originalFilename;

        var db = req.con;
        var query = `INSERT INTO indexmusic (songName, filepath) VALUES ('${songName}', '${newpath}')`

        db.query(query, function(err){
            if (err) throw err;
        });

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.writeHead(302, {
                'Location': '/admin'
                //add other headers here...
              });
            res.end();
        });
    });
});

module.exports = router;