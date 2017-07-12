var env = require('dotenv').config();
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    charset  : process.env.DB_CHARSET
  }
});

module.exports = require('bookshelf')(knex);