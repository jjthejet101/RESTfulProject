var express = require('express');
var router = express.Router();

/* required dependencies */ 
const sqlite3 = require('sqlite3').verbose(); 
const Sequelize = require('Sequelize'); 

/* established connection with db */ 
const sequelize = new Sequelize('Sqlize Project', 'justin', null, { 
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

// /* using model to query db */  
// Artist.findAll({}).then(artists => {  
//   console.log(JSON.stringify(artists));  
// }); 

// get all Artists
router.get('/api/v1/artists', (req, res) => {
  req.getConnection((err, connection) => {
    const query = connection.query('SELECT * FROM Artist', (err, rows) => {
      if (err) return res.send(500, 'Error occurred: database error.');
      res.json(
        rows.map(artist => {
          return {
            ArtistId: artist.ArtistId,
            Name: artist.Name
          };
        })
      );
    });
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
