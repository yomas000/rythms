var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.con;
    var query = "SELECT * FROM indexMusic";

    db.query(query, function(err, rows){
        var userlist = new Array;
       for (let i = 0; i < rows.length; i++){
        let user = {
            username: rows[i].songName,
            wscore: rows[i].filepath,
            };
            userlist.push(user)
        }
        console.log(userlist)
        res.render("crud", { title: "rythms", users: userlist });
    })
});

module.exports = router;