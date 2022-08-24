var express = require('express');
var router = express.Router();
var fs = require("fs")
util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "rhythms", searchIcon: "../public/images/search.png", settingsIcon: "../public/images/settings.png", songName: ["Gloom", "Embers", "Dozing-Off", "Rain", "life"]});
});


module.exports = router;
