'use strict';
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    charset  : process.env.DB_CHARSET
});

connection.connect();

var redis  = require('redis').createClient();

class reset {

    all() {

        connection.query('TRUNCATE TABLE student;TRUNCATE TABLE class;TRUNCATE TABLE class_students;', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });

        connection.end();

        redis.flushdb( function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
        });

    }

    redisOnly() {

        redis.flushdb( function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
        });

    }

   
}


module.exports = search;