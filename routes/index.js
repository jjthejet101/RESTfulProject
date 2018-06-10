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

/* GET Albums and Album-Artist */
router.get('/', function(req, res, next) {
  const queryAlbum = req.query.musicRequest;
  if (queryAlbum == "albums") {
    sequelize.query("SELECT Title FROM Album").then(myTableRows => {
      res.send(myTableRows);
    });
  } else if (queryAlbum == "album-artist") {
    sequelize.query(`SELECT Artist.Name as Artist, Album.Title as Album FROM Artist JOIN Album WHERE Artist.ArtistId=Album.ArtistId LIMIT 1000`).then(myTableRows => {
      res.send(myTableRows);
    });
  } else {
    res.render('error', { message: '404 - Not Found: Could not find the ' + queryAlbum + ' table in the database.' });
  };
});

/* GET Albums and Album-Artist */
router.get('/tracks', function(req, res, next) {
  const queryMinutes = req.query.musicTrackMinutes;
  const querySeconds = req.query.musicTrackSeconds;
  const millisecs = (parseInt(queryMinutes) * 60 + parseInt(querySeconds)) * 1000;
  const query = `SELECT Name, Milliseconds FROM Track WHERE Milliseconds > ${millisecs} LIMIT 1000`;
  const tracksArray = [];
  console.log('variables added');
  sequelize.query(query).then(myTableRows => {
    tracksArray.push(myTableRows);
    console.log('sequelized');
    res.render('length', {results: myTableRows});
    console.log('rendered');
  });
});

module.exports = router;
