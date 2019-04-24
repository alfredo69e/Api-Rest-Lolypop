'use strict'

var mysql      = require('mysql');

function connection() {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'lolypop'
  });

  return connection
}

function close() {
  return connection.end();
}


module.exports = {
  connection,
  close
}