'use strict';
var Class_students  = require('../model/class_students'),
    search          = require('./search'),
    redis           = require('redis').createClient();

class class_students{

    static validate(req, res, call){
        var SearchApi = new search;
        var error = {};

        if(!SearchApi.checkStudent(req.body.student_id)){
            error.student = "Student not found";
        }

        if(!SearchApi.checkClasses(req.body.class_id)){
            error.class = "Class not found";
        }

        if(!error.length){
            call();
        }else{
            res.status(400).json({err: error, data:{}, status: 'error'});
        }
    }
    
    index(req, res)
    {
        Class_students.forge().fetchAll().then(function (data) {
            res.json({err: false, data: data ? data.toJSON() : {}, status: 'success'});
        })

        .catch(function (err) {
            res.status(500).json({err: err, data:{}, status: err.message});
        });
    }

    create(req, res)
    {
        class_students.validate(req, res, function(){
            // res.send(req.query);
            var fileds = {
                student_id: req.body.student_id,
                class_id: req.body.class_id
            };

            Class_students.forge(fileds).save().then(function (data) {
                redis.get('class:'+fileds.class_id+':students', function(err, reply) {
                    if(reply){
                        var old = JSON.parse(reply);
                        old.push(fileds);
                        redis.set('class:'+fileds.class_id+':students', JSON.stringify(old));
                    }else{
                        redis.set('class:'+fileds.class_id+':students', JSON.stringify(fileds));
                    }
                });
                res.json({err: {}, data: {id: data.get('id')}, status: 'success'});
            })
            
            .catch(function (err) {
                res.status(500).json({err: err, data:{}, status: 'error'});
            });
        });
    }

    show(req, res){
        redis.get('class:'+req.params.id+':students', function(err, reply){
           if(reply){
               res.json({err: {}, data: reply != null ? JSON.parse(reply) : {}, status: reply ? 'success' : 'error'});
           }else{
                Class_students.forge().where({id: req.params.id}).fetch().then(function (data) {
                    res.json({err: {}, data: data ? data.toJSON() : {}, status: data ? 'success' : 'error'});
                })

                .catch(function (err) {
                    res.status(500).json({err: {message: err.message}, data:{}, status: 'error'});
                });
           }
        });
    }

    update(req, res){

    }

    delete(req, res){
        var theID = req.params.id;
        var theData;

        Class_students.forge({id: theID}).fetch().then(function (data) {
            theData = data;
            Class_students.forge({
                id: theID,
            }).destroy().then(function (data) {
                
                redis.get('class:'+theData.class_id+':students', function(err, reply) {
                    
                    var old = JSON.parse(reply);
                    old.forEach(function(element, k) {
                        if(element.student_id == theData.student_id){
                            old.splice(k, 1);
                            redis.set('class:'+theData.class_id+':students', JSON.stringify(old));
                            return res.json({err: {}, data:{id: data.get('id')}, status: 'success'});
                        }
                    });
                    
                });

            })

        })

        .catch(function (err) {
            res.status(500).json({err: err, data:{}, status: err.message});
        });

    }
}


module.exports = class_students;