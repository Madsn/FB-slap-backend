var Sequelize = require('sequelize');
var sequelize = new Sequelize('slapdb_dev', 'root', '', {
  // sqlite! now!
  //dialect: 'sqlite',
  dialect: 'mysql'

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