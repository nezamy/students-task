var db = require('../system/model');
var Class_students = db.Model.extend({
    tableName: 'class_students'
});
module.exports = Class_students;