var express = require('express');
var router = express.Router();

/* required dependencies */ 
const sqlite3 = require('sqlite3').verbose(); 
const Sequelize = require('Sequelize'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
