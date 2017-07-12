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

    classes(req, res) {

        redis.exists('class:'+req.params.id, function(err, reply) {
            if (reply === 1) {
               res.json({status: true});
            } else {
               res.json({status: false});
            }
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