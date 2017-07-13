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

    all(res) {

        connection.query('TRUNCATE TABLE student', function (error, results, fields) {
            if (error) throw error;
            console.log('Table student is empty now');
        });

        connection.query('TRUNCATE TABLE class', function (error, results, fields) {
            if (error) throw error;
            console.log('Table class is empty now');
        });

        connection.query('TRUNCATE TABLE class_students', function (error, results, fields) {
            if (error) throw error;
            console.log('Table class_students is empty now');
        });

        redis.flushdb( function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
        });

        res.send('All tables is Empty now');

    }

    redisOnly() {

        redis.flushdb( function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
        });

    }

   
}


module.exports = reset;