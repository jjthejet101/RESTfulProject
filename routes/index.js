var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* required dependencies */ 
const sqlite3 = require('sqlite3').verbose(); 
const Sequelize = require('Sequelize'); 

/* established connection with db */ 
const sequelize = new Sequelize('RESTful Project', 'justin', null, { 
  host: 'localhost', 
  dialect: 'sqlite', 
  storage: './Chinook_Sqlite_AutoIncrementPKs.sqlite' 
});

/* created model to interact with db */  
const Artist = sequelize.define( 
  'Artist', 
  { 
    ArtistId: { 
      type: Sequelize.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    }, 
    Name: Sequelize.STRING 
  }, 
  { 
    freezeTableName: true, 
    timestamps: false 
  } 
);

/* using model to query db */   
// Artist.find({ where: { ArtistId: 75 } }).then(artists => {   
//   console.log(JSON.stringify(artists));
// });  



// sequelize.query("SELECT Title FROM Album").then(myTableRows => {
//   console.log(myTableRows);
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  let queryAlbum = req.query.musicRequest;
  console.log('variable declared');
  if (queryAlbum == "albums") {
    console.log('true');
    sequelize.query("SELECT Title FROM Album").then(myTableRows => {
      res.send(myTableRows);
    });
  } else {
    res.render('error', { message: '404 - Not Found: Could not find the ' + queryAlbum + ' table in the database.' });
  };
});

module.exports = router;
