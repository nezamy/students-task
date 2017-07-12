'use strict';
var Student = require('../model/student'),
    moment  = require('moment'),
    redis  = require('redis').createClient();

class student{

    static validate(req, res, call){
        req.check('email', 'Invalid Email').isEmail();
        req.check('full_name', 'Invalid full_name').notEmpty().isLength({max: 50});
        req.check('birthday', 'Invalid birthday').notEmpty();
        req.getValidationResult().then(function(result) {
            if (!result.isEmpty()) {
                res.status(400).json({err: result.array(), data:{}, status: 'error'});
                return;
            }
            call();
        });
    }
    
    index(req, res)
    {
        Student.forge().where('deleted', null).fetchAll().then(function (data) {
            res.json({err: false, data: data ? data.toJSON() : {}, status: 'success'});
        })

        .catch(function (err) {
            res.status(500).json({err: err, data:{}, status: err.message});
        });
    }

    create(req, res)
    {
        student.validate(req, res, function(){
            // res.send(req.query);
            var fileds = {
                email: req.body.email,
                full_name: req.body.full_name,
                birthday: req.body.birthday
            };

            Student.forge(fileds).save().then(function (data) {
                fileds.id = data.get('id');
                redis.set('student:'+data.get('id'), JSON.stringify(fileds));
                res.json({err: {}, data: {id: data.get('id')}, status: 'success'});
            })
            
            .catch(function (err) {
                res.status(500).json({err: err, data:{}, status: 'error'});
            });
        });
    }

    show(req, res){
        redis.get('student:'+req.params.id, function(err, reply){
           if(reply){
               console.log(reply);
               res.json({err: {}, data: reply != null ? JSON.parse(reply) : {}, status: reply ? 'success' : 'error'});
           }else{
                Student.forge().where({id: req.params.id, deleted: null}).fetch().then(function (data) {
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
        Student.forge({
            id: req.params.id,
            deleted: moment().valueOf()
        }).save().then(function (data) {
            redis.del('student:'+req.params.id, function(err, reply) {
                res.json({err: {}, data:{id: data.get('id')}, status: 'success'});
            });
        })
        
        .catch(function (err) {
            res.status(500).json({err: err, data:{}, status: 'error'});
        });
    }
}


module.exports = student;