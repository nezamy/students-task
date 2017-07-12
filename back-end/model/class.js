var db = require('../system/model');
var Class = db.Model.extend({
    tableName: 'class'
});
module.exports = Class;