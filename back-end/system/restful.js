/*!
 * restful
 * Copyright(c) 2017 Mahmoud Elnezamy
 * Website http://nezamy.com
 * MIT Licensed
 */
'use strict';

var RESTful = restful.prototype;

function restful(app){
    this._app = app;
}

RESTful.resource = function(uri, controller){
    this._app.get('/'+uri+'/', controller.index);
    this._app.post('/'+uri+'/', controller.create);
    this._app.get('/'+uri+'/show/:id', controller.show);
    this._app.put('/'+uri+'/:id', controller.update);
    this._app.delete('/'+uri+'/:id', controller.delete);
};

module.exports = restful;