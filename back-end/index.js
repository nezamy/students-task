var app         = require('express')(),
    bodyParser  = require('body-parser'),
    validator   = require('express-validator'),
    merge       = require('merge');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(validator());
app.use(function(req, res, next){
    req.body = merge(req.body, req.query);
    //Replace * to the domain name
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var env = require('dotenv').config();
var restful = require('./system/restful');
var api = new restful(app);

//Controllers
var student = require('./controller/student');
var classes = require('./controller/class');
var search = require('./controller/search');


app.get('/', function(req, res){
    res.send('<h1>Welcome to student app</h1>');
});

api.resource('student', new student);
api.resource('class', new classes);

var searchApi = new search;
app.get('/search/student/:id', searchApi.student);
app.get('/search/class/:id', searchApi.classes);


app.get('/*', function(req, res){
    res.send('404 page')
});

app.listen(process.env.APP_PORT);
console.log(`App is running on http://localhost:${process.env.APP_PORT}`);