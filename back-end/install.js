var app = require('express')();
var env = require('dotenv').config();
var schema = require('./system/schema');
var migrations = require('./model/schema');
var reset = require('./controller/reset');

var migrate = new schema(migrations, {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    charset  : process.env.DB_CHARSET
});


app.get('/', function(req, res){
    res.send('<h1>Welcome to Student App</h1><p>To installing this app please click <a href="./install">here</a></p><p style="color:red">To Reset All tables and redis data please click <a href="./reset">here</a></p>');
});

app.get('/install', function(req, res){
    migrate.createTables()
    .then(function() {
        console.log('Tables created!!');
        res.send('<h1>Tables created!!<h1>');
        process.exit(0);
    })
    .catch(function (error) {
        throw error;
    });
});

app.get('/reset', function(req, res){
    var resetall = new reset;
    resetall.all(res);
});


app.listen(process.env.INSTALL_PORT);
console.log(`App is running on http://localhost:${process.env.INSTALL_PORT}`);