var Sequelize = require('sequelize');

var db = process.env.DATABASE || 'slapdb_dev';
var dbUser = process.env.DATABASE_USER || 'root';
var dbPass = process.env.DATABASE_PASS || '';
var dbDialect = process.env.SEQUELIZE_DIALECT || 'mysql';
var dbHost = process.env.DATABASE_HOST || 'localhost';
var dbPort = process.env.DATABASE_PORT || '3306';

var sequelize = new Sequelize(db, dbUser, dbPass, {
  // sqlite! now!
  //dialect: 'sqlite',
  dialect: dbDialect,
  port: dbPort,
  host: dbHost

  // the storage engine for sqlite
  // - default ':memory:'
  // storage: 'database.sqlite'
});

var Slap = sequelize.define('Slap', {
  fb_id: {type: Sequelize.STRING, required: true},
  count: {type: Sequelize.INTEGER, required: true, default: 0}
}, {
  freezeTableName: true
});

module.exports = Slap;