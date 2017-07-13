'use strict';
var Student = require('../model/student'),
    Class = require('../model/class'),
    redis  = require('redis').createClient();

class search {

    student(req, res) {

        redis.exists('student:'+req.params.id, function(err, reply) {
            if (reply === 1) {
               res.json({status: true});
            } else {
               res.json({status: false});
            }
        });

    }

    studentByName(req, res) {

        Student.forge().query({where: {full_name: req.params.name, deleted: null}, orWhere: {email: req.params.name, deleted: null}}).fetch().then(function (data) {
            res.json({err: {}, data: data ? data.toJSON() : {}, status: data ? 'success' : 'error'});
        })

        .catch(function (err) {
            res.status(500).json({err: {message: err.message}, data:{}, status: 'error'});
        });

    }

    classes(req, res) {

        redis.exists('class:'+req.params.id, function(err, reply) {
            if (reply === 1) {
               res.json({status: true});
            } else {
               res.json({status: false});
            }
        });

    }

    classesByName(req, res) {

        Class.forge().where({name: req.params.name}).fetch().then(function (data) {
            res.json({err: {}, data: data ? data.toJSON() : {}, status: data ? 'success' : 'error'});
        })

        .catch(function (err) {
            res.status(500).json({err: {message: err.message}, data:{}, status: 'error'});
        });

    }

    checkStudent(id) {

        redis.exists('student:'+id, function(err, reply) {
            if (reply === 1) {
               return true;
            } else {
               return false;
            }
        });

    }

    checkClasses(id) {

        redis.exists('class:'+id, function(err, reply) {
            if (reply === 1) {
               return true;
            } else {
               return false;
            }
        });

    }
   
}


module.exports = search;