'use strict';
var Class = require('../model/class'),
    redis  = require('redis').createClient();


class classes{

    static validate(req, res, call){
        req.check('name', 'Invalid name').notEmpty().isLength({max: 50});
        req.check('start_date', 'Invalid start_date').notEmpty();
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
        Class.forge().fetchAll().then(function (data) {
            res.json({err: false, data: data ? data.toJSON() : {}, status: 'success'});
        })

        .catch(function (err) {
            res.status(500).json({err: err, data:{}, status: err.message});
        });
    }

    create(req, res)
    {
        classes.validate(req, res, function(){
            // res.send(req.query);
            var fileds = {
                name: req.body.name,
                start_date: req.body.start_date
            };

            Class.forge(fileds).save().then(function (data) {
                fileds.id = data.get('id');
                redis.set('class:'+data.get('id'), JSON.stringify(fileds));
                res.json({err: {}, data: {id: data.get('id')}, status: 'success'});
            })
            
            .catch(function (err) {
                res.status(500).json({err: err, data:{}, status: 'error'});
            });
        });
    }

    show(req, res){
        redis.get('class:'+req.params.id, function(err, reply){
           if(reply){
               res.json({err: {}, data: reply != null ? JSON.parse(reply) : {}, status: reply ? 'success' : 'error'});
           }else{
                Class.forge().where({id: req.params.id}).fetch().then(function (data) {
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
        Class.forge({
            id: req.params.id,
        }).destroy().then(function (data) {
            redis.del('class:'+req.params.id, function(err, reply) {
                res.json({err: {}, data:{id: data.get('id')}, status: 'success'});
            });
        })
        
        .catch(function (err) {
            res.status(500).json({err: err, data:{}, status: 'error'});
        });
    }
}


module.exports = classes;